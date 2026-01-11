"use client";

import React from "react";

export const BrandingControl = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="mb-6">
        <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-3 block">
            {label}
        </label>
        {children}
    </div>
);

export const BrandingSlider = ({
    min,
    max,
    value,
    onChange
}: {
    min: number;
    max: number;
    value: number;
    onChange: (val: number) => void;
}) => (
    <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-zinc-300 transition-all"
    />
);

export const BrandingToggle = ({
    active,
    onClick,
    label
}: {
    active: boolean;
    onClick: () => void;
    label: string;
}) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${active
                ? "bg-white text-black shadow-lg shadow-white/10"
                : "bg-zinc-900 text-muted-foreground border border-white/5 hover:border-white/10"
            }`}
    >
        {label}
    </button>
);
