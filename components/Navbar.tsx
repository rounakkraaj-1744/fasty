'use client'

import React, { useState, useEffect } from 'react';
import { Menu, Moon, Sun, Search, Github, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
    onMenuClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
    const [isDark, setIsDark] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Check system preference or localStorage
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (saved === 'dark' || (!saved && prefersDark)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newMode = !isDark;
        setIsDark(newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const isDocs = pathname.startsWith('/docs');

    return (
        <header className="sticky top-0 z-40 w-full backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {isDocs && (
                        <button
                            onClick={onMenuClick}
                            className="lg:hidden p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                        >
                            <Menu size={24} />
                        </button>
                    )}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
                            <Zap size={18} fill="currentColor" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">fasty</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6 ml-8 text-sm font-medium text-slate-600 dark:text-slate-400">
                        <Link href="/docs/intro" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Documentation</Link>
                        <Link href="/docs/benchmarks" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Benchmarks</Link>
                        <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Blog</a>
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <div className="hidden sm:flex relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={14} className="text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search docs..."
                            className="py-1.5 pl-9 pr-4 text-sm rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-40 lg:w-64 transition-all"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-xs text-slate-400 font-mono border border-slate-300 dark:border-slate-700 rounded px-1.5 py-0.5">Ctrl K</span>
                        </div>
                    </div>

                    <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1"></div>

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
                        aria-label="Toggle Theme"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <a
                        href="https://github.com/rounakkraaj-1744/fasty"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
                    >
                        <Github size={20} />
                    </a>
                </div>
            </div>
        </header>
    );
};
