"use client"

import { DocLayout } from '../layout/DocLayout';
import { Badge } from '@/components/ui/badge';

export function ChangelogPage() {
    return (
        <DocLayout
            title="Changelog"
            description="All notable changes to fasty"
        >
            <p>
                All notable changes to this project will be documented here. The format is based on{' '}
                <a href="https://keepachangelog.com/en/1.0.0/" className="text-violet-600 dark:text-violet-400 hover:underline">
                    Keep a Changelog
                </a>
                , and this project adheres to{' '}
                <a href="https://semver.org/spec/v2.0.0.html" className="text-violet-600 dark:text-violet-400 hover:underline">
                    Semantic Versioning
                </a>
                .
            </p>

            <div className="space-y-8 mt-8">
                <VersionSection
                    version="2.0.0"
                    date="2024-11-15"
                    type="major"
                >
                    <h3>Added</h3>
                    <ul>
                        <li>HTTP/2 support in Node.js with multiplexing</li>
                        <li>New <code>batchPlugin()</code> for request batching</li>
                        <li>Request/response streaming support</li>
                        <li>Circuit breaker plugin for fault tolerance</li>
                        <li>Concurrency limiting plugin</li>
                        <li>TypeScript 5.0 support with improved type inference</li>
                        <li>Cloudflare Workers and Vercel Edge runtime support</li>
                    </ul>

                    <h3>Changed</h3>
                    <ul>
                        <li>🔄 <strong>BREAKING:</strong> Plugin API updated for better composability</li>
                        <li>🔄 <strong>BREAKING:</strong> Error objects now include <code>config</code> property</li>
                        <li>Improved keep-alive agent performance in Node.js</li>
                        <li>Cache plugin now supports SWR (stale-while-revalidate)</li>
                        <li>Better error messages with suggestions</li>
                    </ul>

                    <h3>Fixed</h3>
                    <ul>
                        <li>Memory leak in long-lived Node.js processes</li>
                        <li>Race condition in retry plugin</li>
                        <li>TypeScript errors with strictNullChecks</li>
                    </ul>
                </VersionSection>

                <VersionSection
                    version="1.8.0"
                    date="2024-09-20"
                    type="minor"
                >
                    <h3>Added</h3>
                    <ul>
                        <li>Upload/download progress callbacks</li>
                        <li>Request preconnect for warming up connections</li>
                        <li>DNS caching in Node.js transport</li>
                        <li>Custom status code validation</li>
                    </ul>

                    <h3>Changed</h3>
                    <ul>
                        <li>Improved bundle size by 15%</li>
                        <li>Better tree-shaking support</li>
                        <li>Optimized JSON parsing</li>
                    </ul>

                    <h3>Fixed</h3>
                    <ul>
                        <li>AbortController compatibility in Node.js 14</li>
                        <li>FormData boundary detection</li>
                    </ul>
                </VersionSection>

                <VersionSection
                    version="1.7.0"
                    date="2024-07-10"
                    type="minor"
                >
                    <h3>Added</h3>
                    <ul>
                        <li>Memory cache plugin with TTL support</li>
                        <li>Auth plugin for automatic token management</li>
                        <li>Request deduplication</li>
                        <li>Bun runtime support</li>
                    </ul>

                    <h3>Changed</h3>
                    <ul>
                        <li>Retry plugin now supports jitter</li>
                        <li>Improved error stack traces</li>
                    </ul>
                </VersionSection>

                <VersionSection
                    version="1.6.0"
                    date="2024-05-15"
                    type="minor"
                >
                    <h3>Added</h3>
                    <ul>
                        <li>Retry plugin with exponential backoff</li>
                        <li>Custom transport support</li>
                        <li>Request/response type transformers</li>
                        <li>Deno compatibility</li>
                    </ul>

                    <h3>Fixed</h3>
                    <ul>
                        <li>CORS credentials handling</li>
                        <li>Query parameter encoding edge cases</li>
                    </ul>
                </VersionSection>

                <VersionSection
                    version="1.5.0"
                    date="2024-03-20"
                    type="minor"
                >
                    <h3>Added</h3>
                    <ul>
                        <li>Plugin system architecture</li>
                        <li>Automatic keep-alive in Node.js</li>
                        <li>Request timeout support</li>
                        <li>AbortController integration</li>
                    </ul>

                    <h3>Changed</h3>
                    <ul>
                        <li>Migrated to TypeScript</li>
                        <li>Improved documentation</li>
                    </ul>
                </VersionSection>

                <VersionSection
                    version="1.0.0"
                    date="2024-01-10"
                    type="major"
                >
                    <h3>Added</h3>
                    <ul>
                        <li>Initial release</li>
                        <li>Core HTTP methods (GET, POST, PUT, DELETE, PATCH)</li>
                        <li>Configurable base URL and headers</li>
                        <li>Automatic JSON parsing</li>
                        <li>Error handling</li>
                        <li>Browser and Node.js support</li>
                    </ul>
                </VersionSection>
            </div>

            <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <h2 className="text-lg mb-4">Migration Guides</h2>
                <ul className="space-y-2">
                    <li>
                        <a href="#" className="text-violet-600 dark:text-violet-400 hover:underline">
                            Migrating from v1.x to v2.0
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-violet-600 dark:text-violet-400 hover:underline">
                            Migrating from axios to fasty
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-violet-600 dark:text-violet-400 hover:underline">
                            Upgrading plugins to v2.0 API
                        </a>
                    </li>
                </ul>
            </div>
        </DocLayout>
    );
}

function VersionSection({
    version,
    date,
    type,
    children
}: {
    version: string;
    date: string;
    type: 'major' | 'minor' | 'patch';
    children: React.ReactNode;
}) {
    const badgeColors = {
        major: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
        minor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
        patch: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    };

    return (
        <div className="border-l-4 border-violet-500 pl-6">
            <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl">v{version}</h2>
                <Badge className={badgeColors[type]}>
                    {type}
                </Badge>
                <span className="text-sm text-slate-500 dark:text-slate-400">{date}</span>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none">
                {children}
            </div>
        </div>
    );
}
