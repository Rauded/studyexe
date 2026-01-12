export default function ContactPage() {
    return (
        <main className="min-h-screen bg-black text-white pt-32 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-bold mb-8 tracking-tighter">Contact</h1>
                <p className="text-xl text-zinc-400 mb-12">
                    Get in touch with the team.
                </p>
                <div className="p-12 border border-zinc-800 rounded-2xl bg-zinc-900/20">
                    <p className="text-zinc-300">
                        For support and inquiries: <a href="mailto:hello@studyexe.com" className="text-white hover:text-emerald-400 transition-colors">hello@studyexe.com</a>
                    </p>
                </div>
            </div>
        </main>
    );
}
