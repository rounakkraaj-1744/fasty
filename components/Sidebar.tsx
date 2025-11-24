"use client"

import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

interface NavSection {
    title: string;
    items: {
        slug: string;
        label: string;
    }[];
}

const navSections: NavSection[] = [
    {
        title: 'Introduction',
        items: [
            { slug: 'what-is-fasty', label: 'What is fasty?' },
            { slug: 'why-fasty', label: 'Why fasty exists' },
            { slug: 'key-concepts', label: 'Key concepts' },
            { slug: 'architecture', label: 'Architecture diagram' },
        ]
    },
    {
        title: 'Installation',
        items: [
            { slug: 'installation', label: 'Installation' },
        ]
    },
    {
        title: 'Getting Started',
        items: [
            { slug: 'quick-start', label: 'Quick start' },
            { slug: 'basic-requests', label: 'Basic GET/POST requests' },
            { slug: 'error-handling', label: 'Error handling' },
            { slug: 'timeouts', label: 'Timeouts' },
            { slug: 'json-parsing', label: 'JSON parsing behavior' },
        ]
    },
    {
        title: 'Core API',
        items: [
            { slug: 'constructor', label: 'fasty constructor' },
            { slug: 'get-method', label: 'client.get()' },
            { slug: 'post-method', label: 'client.post()' },
            { slug: 'put-method', label: 'client.put()' },
            { slug: 'delete-method', label: 'client.delete()' },
            { slug: 'request-options', label: 'RequestOptions table' },
            { slug: 'response-structure', label: 'Response structure' },
        ]
    },
    {
        title: 'Plugin System',
        items: [
            { slug: 'how-plugins-work', label: 'How plugins work' },
            { slug: 'plugin-lifecycle', label: 'Plugin lifecycle diagram' },
            { slug: 'plugin-interface', label: 'Plugin interface' },
            { slug: 'writing-plugins', label: 'Writing your own plugin' },
        ]
    },
    {
        title: 'Built-in Plugins',
        items: [
            { slug: 'retry-plugin', label: 'Retry plugin' },
            { slug: 'cache-plugin', label: 'Memory cache plugin' },
        ]
    },
    {
        title: 'Transports',
        items: [
            { slug: 'browser-transport', label: 'Browser transport' },
            { slug: 'node-transport', label: 'Node transport with keep-alive' },
            { slug: 'transport-swap', label: 'How to swap transports' },
            { slug: 'deno-bun', label: 'Deno / Bun compatibility' },
        ]
    },
    {
        title: 'Performance',
        items: [
            { slug: 'performance-overview', label: 'How fasty reduces latency' },
            { slug: 'benchmarks', label: 'Benchmarks' },
        ]
    },
    {
        title: 'Advanced Usage',
        items: [
            { slug: 'custom-transports', label: 'Custom transports' },
            { slug: 'interceptors', label: 'Request interceptors' },
            { slug: 'streaming', label: 'Response streaming' },
            { slug: 'batching', label: 'Batching & parallel requests' },
            { slug: 'circuit-breaker', label: 'Circuit breaker pattern' },
            { slug: 'react-usage', label: 'Using with React' },
            { slug: 'node-usage', label: 'Using with Node server frameworks' },
        ]
    },
    {
        title: 'Examples',
        items: [
            { slug: 'examples-rest', label: 'Basic REST client' },
            { slug: 'examples-github', label: 'GitHub API wrapper' },
            { slug: 'examples-nextjs', label: 'Using in Next.js' },
            { slug: 'examples-workers', label: 'Using in Cloudflare Workers' },
            { slug: 'examples-node', label: 'Using in Node with keep-alive' },
        ]
    },
    {
        title: 'FAQ',
        items: [
            { slug: 'faq', label: 'FAQ' },
        ]
    },
    {
        title: 'Contributing',
        items: [
            { slug: 'contributing', label: 'Contributing' },
        ]
    },
    {
        title: 'Changelog',
        items: [
            { slug: 'changelog', label: 'Changelog' },
        ]
    },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const [expandedSections, setExpandedSections] = useState<string[]>(
        navSections.map(section => section.title)
    );

    const toggleSection = (title: string) => {
        setExpandedSections(prev =>
            prev.includes(title)
                ? prev.filter(t => t !== title)
                : [...prev, title]
        );
    };

    const isActive = (slug: string) => pathname === `/docs/${slug}`;
    const isDocsPage = pathname.startsWith('/docs');

    // Don't show sidebar on home page
    if (!isDocsPage) {
        return null;
    }

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:sticky top-16 left-0 bottom-0 z-40
                w-72 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800
                overflow-y-auto transition-transform duration-300
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden absolute top-4 right-4"
                        onClick={onClose}
                    >
                        <X className="w-5 h-5" />
                    </Button>

                    <nav className="space-y-1">
                        {navSections.map(section => {
                            const isExpanded = expandedSections.includes(section.title);

                            return (
                                <div key={section.title}>
                                    <button
                                        onClick={() => toggleSection(section.title)}
                                        className="w-full flex items-center justify-between px-2 py-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors"
                                    >
                                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                            {section.title}
                                        </span>
                                        {isExpanded ? (
                                            <ChevronDown className="w-4 h-4 text-slate-400" />
                                        ) : (
                                            <ChevronRight className="w-4 h-4 text-slate-400" />
                                        )}
                                    </button>

                                    {isExpanded && (
                                        <div className="ml-2 mt-1 space-y-0.5">
                                            {section.items.map(item => {
                                                const active = isActive(item.slug);
                                                return (
                                                    <Link
                                                        key={item.slug}
                                                        href={`/docs/${item.slug}`}
                                                        onClick={onClose}
                                                        className={`
                                                            block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors
                                                            ${active
                                                                ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 font-medium'
                                                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                                                            }
                                                        `}
                                                    >
                                                        {item.label}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                </div>
            </aside>
        </>
    );
}
