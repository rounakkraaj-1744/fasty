import { Github, Twitter, Mail, Heart } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 mt-16">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-linear-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">FC</span>
                            </div>
                            <span className="font-semibold">fasty</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            A tiny, blazing-fast, plugin-powered HTTP client for modern JavaScript runtimes.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium mb-4">Documentation</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400">Getting Started</a></li>
                            <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400">API Reference</a></li>
                            <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400">Examples</a></li>
                            <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400">Guides</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium mb-4">Community</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400">GitHub</a></li>
                            <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400">Discord</a></li>
                            <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400">Twitter</a></li>
                            <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400">Contributing</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium mb-4">More</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400">Blog</a></li>
                            <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400">Changelog</a></li>
                            <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400">License</a></li>
                            <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400">FAQ</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        © 2024 fasty. Released under the MIT License.
                    </p>

                    <div className="flex items-center gap-4">
                        <a href="https://github.com/rounakkraaj-1744/fasty" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-500 flex items-center justify-center gap-1">
                        Made with <Heart className="w-4 h-4 fill-red-500 text-red-500" /> by the fasty team
                    </p>
                </div>
            </div>
        </footer>
    );
}