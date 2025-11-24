"use client"

import { DocLayout } from '../layout/DocLayout';
import { CodeBlock } from '@/components/CodeBlock';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

export function InstallationPage() {
    return (
        <DocLayout
            title="Installation"
            description="Get started with fasty in your project"
        >
            <div className="space-y-8">
                <section>
                    <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Package Manager</h2>
                    <p className="text-base leading-7 mb-6 text-slate-700 dark:text-slate-300">
                        Install fasty using your preferred package manager:
                    </p>

                    <Tabs defaultValue="npm" className="my-6">
                        <TabsList className="grid w-full max-w-md grid-cols-4">
                            <TabsTrigger value="npm">npm</TabsTrigger>
                            <TabsTrigger value="yarn">yarn</TabsTrigger>
                            <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                            <TabsTrigger value="bun">bun</TabsTrigger>
                        </TabsList>

                        <TabsContent value="npm" className="mt-4">
                            <CodeBlock code="npm install fasty" language="bash" />
                        </TabsContent>

                        <TabsContent value="yarn" className="mt-4">
                            <CodeBlock code="yarn add fasty" language="bash" />
                        </TabsContent>

                        <TabsContent value="pnpm" className="mt-4">
                            <CodeBlock code="pnpm add fasty" language="bash" />
                        </TabsContent>

                        <TabsContent value="bun" className="mt-4">
                            <CodeBlock code="bun add fasty" language="bash" />
                        </TabsContent>
                    </Tabs>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">CDN</h2>
                    <p className="text-base leading-7 mb-4 text-slate-700 dark:text-slate-300">
                        For quick prototyping or simple projects, you can use fasty directly from a CDN:
                    </p>

                    <CodeBlock code={`<!-- ESM -->
<script type="module">
  import { fasty } from 'https://esm.sh/fasty@2.0.0';
  
  const client = new fasty({
    baseURL: 'https://api.example.com'
  });
</script>

<!-- UMD -->
<script src="https://unpkg.com/fasty@2.0.0/dist/fasty.umd.js"></script>
<script>
  const client = new fasty.fasty({
    baseURL: 'https://api.example.com'
  });
</script>`} language="html" />
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Deno</h2>
                    <p className="text-base leading-7 mb-4 text-slate-700 dark:text-slate-300">
                        Import fasty directly from npm or a CDN in Deno:
                    </p>

                    <CodeBlock code={`// From npm:
import { fasty } from "npm:fasty@2.0.0";

// From esm.sh:
import { fasty } from "https://esm.sh/fasty@2.0.0";

const client = new fasty({
  baseURL: "https://api.example.com"
});`} language="typescript" />
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Requirements</h2>
                    <p className="text-base leading-7 mb-4 text-slate-700 dark:text-slate-300">
                        fasty works in the following environments:
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="p-4 rounded-lg bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-800">
                            <div className="font-semibold text-slate-900 dark:text-white mb-1">Node.js</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">v16.0.0 or higher</div>
                        </div>
                        <div className="p-4 rounded-lg bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-800">
                            <div className="font-semibold text-slate-900 dark:text-white mb-1">Browsers</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Chrome 42+, Firefox 39+, Safari 10.1+, Edge 14+</div>
                        </div>
                        <div className="p-4 rounded-lg bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-800">
                            <div className="font-semibold text-slate-900 dark:text-white mb-1">Deno</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">v1.25.0 or higher</div>
                        </div>
                        <div className="p-4 rounded-lg bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-800">
                            <div className="font-semibold text-slate-900 dark:text-white mb-1">Bun</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">v0.5.0 or higher</div>
                        </div>
                        <div className="p-4 rounded-lg bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-800 sm:col-span-2">
                            <div className="font-semibold text-slate-900 dark:text-white mb-1">Edge Runtimes</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Cloudflare Workers, Vercel Edge Functions, and more</div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">TypeScript</h2>
                    <p className="text-base leading-7 mb-4 text-slate-700 dark:text-slate-300">
                        fasty is written in TypeScript and includes type definitions. No additional <code className="text-violet-600 dark:text-violet-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm">@types</code> package is needed.
                    </p>

                    <CodeBlock code={`import { fasty, type RequestOptions } from 'fasty';

const client = new fasty({
  baseURL: 'https://api.example.com'
});

// Full TypeScript support
interface User {
  id: number;
  name: string;
  email: string;
}

const user = await client.get<User>('/users/123');`} language="typescript" />
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Bundle Size</h2>
                    <p className="text-base leading-7 mb-6 text-slate-700 dark:text-slate-300">
                        fasty is optimized for minimal bundle size:
                    </p>

                    <div className="p-8 bg-linear-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl border border-violet-200 dark:border-violet-800">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-violet-600 dark:text-violet-400 mb-2">8.2 KB</div>
                                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Minified + Gzipped</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">23.1 KB</div>
                                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Minified</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-fuchsia-600 dark:text-fuchsia-400 mb-2">0</div>
                                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Dependencies</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <p className="text-sm text-blue-900 dark:text-blue-300">
                            <strong className="font-semibold">💡 Pro tip:</strong> The core library is tree-shakeable, so you only bundle what you actually use!
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Next Steps</h2>
                    <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                        <p className="text-base leading-7 text-slate-700 dark:text-slate-300">
                            Now that you have fasty installed, check out the{' '}
                            <Link 
                                href="/docs/quick-start" 
                                className="text-violet-600 dark:text-violet-400 hover:underline font-medium"
                            >
                                Quick Start guide
                            </Link>
                            {' '}to learn how to make your first request.
                        </p>
                    </div>
                </section>
            </div>
        </DocLayout>
    );
}
