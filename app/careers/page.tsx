export default function CareersPage() {
    return (
        <main className="min-h-screen bg-black text-white pt-32 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-bold mb-8 tracking-tighter">Careers</h1>
                <p className="text-xl text-zinc-400 mb-12">
                    Join us in building the ultimate focus tools.
                </p>
                <div className="grid gap-6 text-left max-w-2xl mx-auto mb-16">
                    <div className="p-6 border border-zinc-800 rounded-xl bg-zinc-900/20 hover:border-zinc-700 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold">Sales Representative</h3>
                            <span className="text-sm px-3 py-1 bg-zinc-800 rounded-full text-zinc-400">2 openings</span>
                        </div>
                        <p className="text-zinc-400 text-sm">Remote • Full-time</p>
                    </div>

                    <div className="p-6 border border-zinc-800 rounded-xl bg-zinc-900/20 hover:border-zinc-700 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold">Customer Support Specialist</h3>
                            <span className="text-sm px-3 py-1 bg-zinc-800 rounded-full text-zinc-400">1 opening</span>
                        </div>
                        <p className="text-zinc-400 text-sm">Remote • Full-time</p>
                    </div>

                    <div className="p-6 border border-zinc-800 rounded-xl bg-zinc-900/20 hover:border-zinc-700 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold">Software Engineer</h3>
                            <span className="text-sm px-3 py-1 bg-zinc-800 rounded-full text-zinc-400">1 opening</span>
                        </div>
                        <p className="text-zinc-400 text-sm">Remote • Full-time</p>
                    </div>
                </div>

                <div className="p-8 border border-zinc-800 rounded-2xl bg-zinc-900/50 backdrop-blur-sm">
                    <p className="text-zinc-300 text-lg">
                        To apply for any of these positions, please send your resume and cover letter to <a href="mailto:careers@studyexe.com" className="text-white font-semibold hover:underline">careers@studyexe.com</a>
                    </p>
                </div>
            </div>
        </main>
    );
}
