"use client"

import { DocLayout } from '../layout/DocLayout';
import { CodeBlock } from '@/components/CodeBlock';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function InstallationPage() {
    return (
        <DocLayout
            title="Installation"
            description="Get started with fasty in your project"
        >
            <h2>Package Manager</h2>
            <p>
                Install fasty using your preferred package manager:
            </p>

            <Tabs defaultValue="npm" className="my-6">
                <TabsList>
                    <TabsTrigger value="npm">npm</TabsTrigger>
                    <TabsTrigger value="yarn">yarn</TabsTrigger>
                    <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                    <TabsTrigger value="bun">bun</TabsTrigger>
                </TabsList>

                <TabsContent value="npm">
                    <CodeBlock code="npm install fasty" language="bash" />
                </TabsContent>

                <TabsContent value="yarn">
                    <CodeBlock code="yarn add fasty" language="bash" />
                </TabsContent>

                <TabsContent value="pnpm">
                    <CodeBlock code="pnpm add fasty" language="bash" />
                </TabsContent>

                <TabsContent value="bun">
                    <CodeBlock code="bun add fasty" language="bash" />
                </TabsContent>
            </Tabs>

            <h2>CDN</h2>
            <p>
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

            <h2>Deno</h2>
            <p>
                Import fasty directly from npm or a CDN in Deno:
            </p>

            <CodeBlock code={`// From npm:
import { fasty } from "npm:fasty@2.0.0";

// From esm.sh:
import { fasty } from "https://esm.sh/fasty@2.0.0";

const client = new fasty({
  baseURL: "https://api.example.com"
});`} language="typescript" />

            <h2>Requirements</h2>
            <p>
                fasty works in the following environments:
            </p>

            <ul>
                <li><strong>Node.js</strong> - v16.0.0 or higher</li>
                <li><strong>Browsers</strong> - All modern browsers with fetch support (Chrome 42+, Firefox 39+, Safari 10.1+, Edge 14+)</li>
                <li><strong>Deno</strong> - v1.25.0 or higher</li>
                <li><strong>Bun</strong> - v0.5.0 or higher</li>
                <li><strong>Edge Runtimes</strong> - Cloudflare Workers, Vercel Edge Functions, etc.</li>
            </ul>

            <h2>TypeScript</h2>
            <p>
                fasty is written in TypeScript and includes type definitions. No additional <code>@types</code> package is needed.
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

            <h2>Bundle Size</h2>
            <p>
                fasty is optimized for minimal bundle size:
            </p>

            <div className="my-6 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <div className="text-2xl mb-1">8.2 KB</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Minified + Gzipped</div>
                    </div>
                    <div>
                        <div className="text-2xl mb-1">23.1 KB</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Minified</div>
                    </div>
                    <div>
                        <div className="text-2xl mb-1">0</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Dependencies</div>
                    </div>
                </div>
            </div>

            <h2>Next Steps</h2>
            <p>
                Now that you have fasty installed, check out the <a href="#" className="text-violet-600 dark:text-violet-400 hover:underline">Quick Start guide</a> to learn how to make your first request.
            </p>
        </DocLayout>
    );
}
