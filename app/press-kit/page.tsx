import { Button } from "@/components/landing-ui/button";

export default function PressPage() {
    return (
        <main className="min-h-screen bg-black text-white pt-32 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-6 tracking-tighter">Press</h1>
                    <p className="text-xl text-zinc-400">
                        Get in touch with our press team for media inquiries, interviews, and press releases.
                    </p>
                </div>

                <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 backdrop-blur-sm">
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-400">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="your.email@example.com"
                                className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white text-white placeholder:text-zinc-600 transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="block text-sm font-medium text-zinc-400">
                                Subject *
                            </label>
                            <input
                                type="text"
                                id="subject"
                                placeholder="Media inquiry subject"
                                className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white text-white placeholder:text-zinc-600 transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="block text-sm font-medium text-zinc-400">
                                Message *
                            </label>
                            <textarea
                                id="message"
                                rows={6}
                                placeholder="Please provide details about your media inquiry, including deadline, outlet information, and specific questions you'd like answered..."
                                className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white text-white placeholder:text-zinc-600 transition-all resize-none"
                                required
                            />
                        </div>

                        <Button className="w-full h-12 bg-white text-black hover:bg-zinc-200 font-semibold rounded-xl text-lg mt-4">
                            Send Press Inquiry
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    );
}
