'use client';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

interface Props {
    settings: {
        strict_mode: boolean;
        eye_tracking: boolean;
        session_length: number;
    } | null;
}

export default function AppSettingsForm({ settings }: Props) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [strictMode, setStrictMode] = useState(settings?.strict_mode ?? false);
    const [eyeTracking, setEyeTracking] = useState(settings?.eye_tracking ?? true);
    const [sessionLength, setSessionLength] = useState(settings?.session_length ?? 50);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            alert('You must be logged in to update settings.');
            setIsSubmitting(false);
            return;
        }

        const { error } = await supabase
            .from('app_settings')
            .update({
                strict_mode: strictMode,
                eye_tracking: eyeTracking,
                session_length: sessionLength
            } as any)
            .eq('user_id', user.id);

        if (error) {
            alert('Error updating settings: ' + error.message);
        } else {
            router.refresh();
        }
        setIsSubmitting(false);
    };

    return (
        <Card
            title="App Settings"
            description="Configure your StudyEXE experience."
            footer={
                <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                    <p className="pb-4 sm:pb-0 text-zinc-400 text-sm">Strict mode enforces no escape.</p>
                    <Button
                        variant="slim"
                        type="submit"
                        form="settingsForm"
                        loading={isSubmitting}
                    >
                        Save Settings
                    </Button>
                </div>
            }
        >
            <div className="mt-8 mb-4">
                <form id="settingsForm" onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="text-zinc-200">Strict Mode</span>
                        <input
                            type="checkbox"
                            checked={strictMode}
                            onChange={(e) => setStrictMode(e.target.checked)}
                            className="h-5 w-5 rounded border-zinc-700 bg-zinc-800 text-pink-500 focus:ring-pink-500"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-zinc-200">Eye Tracking Focus</span>
                        <input
                            type="checkbox"
                            checked={eyeTracking}
                            onChange={(e) => setEyeTracking(e.target.checked)}
                            className="h-5 w-5 rounded border-zinc-700 bg-zinc-800 text-pink-500 focus:ring-pink-500"
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <div className="flex justify-between">
                            <span className="text-zinc-200">Default Session Length (min)</span>
                            <span className="text-pink-500 font-bold">{sessionLength}</span>
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="120"
                            step="5"
                            value={sessionLength}
                            onChange={(e) => setSessionLength(parseInt(e.target.value))}
                            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                        />
                    </div>
                </form>
            </div>
        </Card>
    );
}
