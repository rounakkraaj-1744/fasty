"use client"

import { ArrowRight, Github, Zap, Package, Plug, Globe, Code, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CodeBlock } from '@/components/CodeBlock';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export function HomePage() {
    const exampleCode = `import { fasty } from 'fasty';

                        // Create a client instance
                        const client = new fasty({
                        baseURL: 'https://api.example.com',
                        timeout: 5000,
                        plugins: [retryPlugin(), cachePlugin()]
                        });

                        // Make requests
                        const user = await client.get('/users/123');
                        const newPost = await client.post('/posts', {
                        title: 'Hello World',
                        content: 'My first post!'
                        });`;

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="container mx-auto px-4 pt-20 pb-16">
                <div className="max-w-4xl mx-auto text-center">
                    <Badge variant="secondary" className="mb-6">
                        <Zap className="w-3 h-3 mr-1" />
                        v2.0 Now Available
                    </Badge>

                    <h1 className="text-6xl md:text-7xl mb-6 bg-linear-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                        fasty
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
                        A tiny, blazing-fast, plugin-powered HTTP client for modern JavaScript runtimes.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                        <Button size="lg" asChild>
                            <Link href="/docs/quick-start">
                                Get Started
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <a href="https://github.com/fasty/fasty" target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 mr-2" />
                                GitHub
                            </a>
                        </Button>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            <span>8.2 KB gzipped</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            <span>TypeScript-first</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            <span>Zero dependencies</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Code Example */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto">
                    <CodeBlock code={exampleCode} language="typescript" />
                </div>
            </section>

            {/* Features Grid */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl mb-4">Why fasty?</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Built for performance and developer experience
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <FeatureCard
                        icon={<Package className="w-6 h-6" />}
                        title="Tiny core bundle"
                        description="Just 8.2 KB gzipped. Tree-shakeable with zero runtime dependencies."
                    />
                    <FeatureCard
                        icon={<Plug className="w-6 h-6" />}
                        title="Plugin system"
                        description="Extensible architecture with built-in retry, cache, and auth plugins."
                    />
                    <FeatureCard
                        icon={<Globe className="w-6 h-6" />}
                        title="Universal runtime support"
                        description="Works in Node, browsers, Deno, Bun, Cloudflare Workers, and edge."
                    />
                    <FeatureCard
                        icon={<Zap className="w-6 h-6" />}
                        title="Keep-alive optimization"
                        description="Automatic connection pooling and HTTP/2 multiplexing in Node."
                    />
                    <FeatureCard
                        icon={<Code className="w-6 h-6" />}
                        title="TypeScript-first API"
                        description="Fully typed with excellent IntelliSense and type inference."
                    />
                    <FeatureCard
                        icon={<Shield className="w-6 h-6" />}
                        title="Zero-dependency core"
                        description="No third-party dependencies. Built on native fetch APIs."
                    />
                </div>
            </section>

            {/* Comparison Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl mb-4">How does it compare?</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        fasty vs popular alternatives
                    </p>
                </div>

                <div className="max-w-4xl mx-auto overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <th className="text-left p-4">Feature</th>
                                <th className="text-center p-4">fasty</th>
                                <th className="text-center p-4">axios</th>
                                <th className="text-center p-4">fetch</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ComparisonRow feature="Bundle size (gzipped)"
                                fasty="8.2 KB"
                                axios="13.4 KB"
                                fetch="0 KB (native)"
                            />
                            <ComparisonRow
                                feature="Plugin system"
                                fasty="✓"
                                axios="Interceptors"
                                fetch="✗"
                            />
                            <ComparisonRow
                                feature="Keep-alive in Node"
                                fasty="✓ Auto"
                                axios="✓ Manual"
                                fetch="✗"
                            />
                            <ComparisonRow
                                feature="TypeScript support"
                                fasty="✓ Native"
                                axios="✓ @types"
                                fetch="✓ Native"
                            />
                            <ComparisonRow
                                feature="Tree-shakeable"
                                fasty="✓"
                                axios="Partial"
                                fetch="N/A"
                            />
                            <ComparisonRow
                                feature="Edge runtime support"
                                fasty="✓"
                                axios="✗"
                                fetch="✓"
                            />
                            <ComparisonRow
                                feature="Built-in retry"
                                fasty="✓ Plugin"
                                axios="3rd party"
                                fetch="✗"
                            />
                            <ComparisonRow
                                feature="Built-in cache"
                                fasty="✓ Plugin"
                                axios="3rd party"
                                fetch="✗"
                            />
                        </tbody>
                    </table>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto text-center bg-linear-to-r from-violet-500 to-purple-600 rounded-2xl p-12 text-white">
                    <h2 className="text-4xl mb-4">Ready to get started?</h2>
                    <p className="text-lg mb-8 opacity-90">
                        Install fasty and start building faster apps today.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Button size="lg" variant="secondary" asChild>
                            <Link href="/docs/quick-start">
                                Read the docs
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                            <a href="https://github.com/fasty/fasty" target="_blank" rel="noopener noreferrer">
                                View on GitHub
                            </a>
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-violet-500 dark:hover:border-violet-500 transition-colors">
            <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center text-violet-600 dark:text-violet-400 mb-4">
                {icon}
            </div>
            <h3 className="font-medium mb-2">{title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
        </div>
    );
}

function ComparisonRow({ feature, fasty, axios, fetch }: { feature: string; fasty: string; axios: string; fetch: string }) {
    return (
        <tr className="border-b border-slate-200 dark:border-slate-800">
            <td className="p-4 text-slate-600 dark:text-slate-400">{feature}</td>
            <td className="p-4 text-center text-violet-600 dark:text-violet-400">{fasty}</td>
            <td className="p-4 text-center text-slate-600 dark:text-slate-400">{axios}</td>
            <td className="p-4 text-center text-slate-600 dark:text-slate-400">{fetch}</td>
        </tr>
    );
}
