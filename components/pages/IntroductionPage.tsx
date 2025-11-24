"use client"

import { DocLayout } from '../layout/DocLayout';
import { CodeBlock } from '@/components/CodeBlock';

interface IntroductionPageProps {
    pageId: string;
}

export function IntroductionPage({ pageId }: IntroductionPageProps) {
    if (pageId === 'what-is-fasty') {
        return (
            <DocLayout
                title="What is fasty?"
                description="Learn about fasty and its core features"
            >
                <div className="space-y-8">
                    <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                        fasty is a modern, lightweight HTTP client library built for JavaScript and TypeScript. It provides a simple,
                        intuitive API for making HTTP requests while maintaining excellent performance and a tiny bundle size.
                    </p>

                    <section>
                        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Core Principles</h2>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <span className="text-violet-600 dark:text-violet-400 font-bold">•</span>
                                <div>
                                    <strong className="text-slate-900 dark:text-white">Performance First</strong>
                                    <span className="text-slate-700 dark:text-slate-300"> - Optimized for speed with automatic keep-alive pooling and HTTP/2 support</span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-violet-600 dark:text-violet-400 font-bold">•</span>
                                <div>
                                    <strong className="text-slate-900 dark:text-white">Minimal Bundle Size</strong>
                                    <span className="text-slate-700 dark:text-slate-300"> - Just 8.2 KB gzipped with zero runtime dependencies</span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-violet-600 dark:text-violet-400 font-bold">•</span>
                                <div>
                                    <strong className="text-slate-900 dark:text-white">Developer Experience</strong>
                                    <span className="text-slate-700 dark:text-slate-300"> - TypeScript-first API with excellent type inference</span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-violet-600 dark:text-violet-400 font-bold">•</span>
                                <div>
                                    <strong className="text-slate-900 dark:text-white">Extensibility</strong>
                                    <span className="text-slate-700 dark:text-slate-300"> - Powerful plugin system for customization</span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-violet-600 dark:text-violet-400 font-bold">•</span>
                                <div>
                                    <strong className="text-slate-900 dark:text-white">Universal</strong>
                                    <span className="text-slate-700 dark:text-slate-300"> - Works in Node, browsers, Deno, Bun, and edge runtimes</span>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Key Features</h2>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">Tiny Bundle Size</h3>
                                <p className="text-base leading-7 text-slate-700 dark:text-slate-300">
                                    At just 8.2 KB gzipped, fasty is one of the smallest full-featured HTTP clients available.
                                    The core is tree-shakeable, so you only bundle what you use.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">Plugin Architecture</h3>
                                <p className="text-base leading-7 mb-4 text-slate-700 dark:text-slate-300">
                                    fasty's plugin system allows you to extend functionality without bloating the core.
                                    Built-in plugins include retry logic, caching, authentication, and more.
                                </p>

                                <CodeBlock code={`import { fasty, retryPlugin, cachePlugin } from 'fasty';

const client = new fasty({
  baseURL: 'https://api.example.com',
  plugins: [
    retryPlugin({ retries: 3 }),
    cachePlugin({ ttl: 60000 })
  ]
});`} />
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">TypeScript-First</h3>
                                <p className="text-base leading-7 mb-4 text-slate-700 dark:text-slate-300">
                                    Built with TypeScript from the ground up, fasty provides excellent type safety and IntelliSense support.
                                </p>

                                <CodeBlock code={`interface User {
  id: number;
  name: string;
  email: string;
}

// Fully typed response
const user = await client.get<User>('/users/123');
console.log(user.name); // TypeScript knows this is a string`} />
                            </div>
                        </div>
                    </section>
                </div>
            </DocLayout>
        );
    }

    if (pageId === 'why-fasty') {
        return (
            <DocLayout
                title="Why fasty exists"
                description="Understanding the motivation behind fasty"
            >
                <div className="space-y-8">
                    <section>
                        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">The Problem</h2>
                        <p className="text-base leading-7 mb-4 text-slate-700 dark:text-slate-300">
                            The JavaScript ecosystem has several HTTP client options, but each comes with trade-offs:
                        </p>

                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <span className="text-violet-600 dark:text-violet-400 font-bold">•</span>
                                <div>
                                    <strong className="text-slate-900 dark:text-white">fetch</strong>
                                    <span className="text-slate-700 dark:text-slate-300"> - Native and lightweight, but lacks features like interceptors, retries, and keep-alive in Node</span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-violet-600 dark:text-violet-400 font-bold">•</span>
                                <div>
                                    <strong className="text-slate-900 dark:text-white">axios</strong>
                                    <span className="text-slate-700 dark:text-slate-300"> - Feature-rich but relatively large (13+ KB) and doesn't work in edge runtimes</span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-violet-600 dark:text-violet-400 font-bold">•</span>
                                <div>
                                    <strong className="text-slate-900 dark:text-white">node-fetch</strong>
                                    <span className="text-slate-700 dark:text-slate-300"> - Good for Node but not universal and lacks advanced features</span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-violet-600 dark:text-violet-400 font-bold">•</span>
                                <div>
                                    <strong className="text-slate-900 dark:text-white">ky</strong>
                                    <span className="text-slate-700 dark:text-slate-300"> - Modern but focused on browsers, less optimized for Node</span>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">The Solution</h2>
                        <p className="text-base leading-7 mb-4 text-slate-700 dark:text-slate-300">
                            fasty was built to provide the best of all worlds:
                        </p>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="p-4 rounded-lg bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-800">
                                <p className="text-slate-900 dark:text-white">Small bundle size like fetch</p>
                            </div>
                            <div className="p-4 rounded-lg bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-800">
                                <p className="text-slate-900 dark:text-white">Feature-rich like axios</p>
                            </div>
                            <div className="p-4 rounded-lg bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-800">
                                <p className="text-slate-900 dark:text-white">Universal runtime support</p>
                            </div>
                            <div className="p-4 rounded-lg bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-800">
                                <p className="text-slate-900 dark:text-white">Performance optimizations for Node</p>
                            </div>
                            <div className="p-4 rounded-lg bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-800">
                                <p className="text-slate-900 dark:text-white">Modern plugin architecture</p>
                            </div>
                            <div className="p-4 rounded-lg bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-800">
                                <p className="text-slate-900 dark:text-white">TypeScript-first design</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Real-World Benefits</h2>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">Reduced Bundle Size</h3>
                                <p className="text-base leading-7 text-slate-700 dark:text-slate-300">
                                    Every kilobyte matters for web performance. By switching from axios to fasty, you can save ~5 KB in your bundle,
                                    leading to faster page loads and better user experience.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">Better Performance in Node</h3>
                                <p className="text-base leading-7 text-slate-700 dark:text-slate-300">
                                    fasty automatically uses keep-alive agents in Node.js, reducing connection overhead and improving throughput
                                    for applications making many HTTP requests.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">Edge Runtime Compatible</h3>
                                <p className="text-base leading-7 text-slate-700 dark:text-slate-300">
                                    Works seamlessly in Cloudflare Workers, Vercel Edge Functions, and other edge runtimes where traditional
                                    Node-based libraries fail.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">Easier to Extend</h3>
                                <p className="text-base leading-7 text-slate-700 dark:text-slate-300">
                                    The plugin system makes it simple to add custom behavior without modifying core code or relying on fragile monkey-patching.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </DocLayout>
        );
    }

    if (pageId === 'key-concepts') {
        return (
            <DocLayout
                title="Key concepts"
                description="Understanding fasty's core concepts"
            >
                <div className="space-y-8">
                    <section>
                        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Client Instance</h2>
                        <p className="text-base leading-7 mb-4 text-slate-700 dark:text-slate-300">
                            A fasty instance is the main object you use to make HTTP requests. You create one with configuration options
                            and then use it to make multiple requests.
                        </p>

                        <CodeBlock code={`const client = new fasty({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Authorization': 'Bearer token'
  }
});`} />
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Request Methods</h2>
                        <p className="text-base leading-7 mb-4 text-slate-700 dark:text-slate-300">
                            fasty provides methods for all standard HTTP verbs: GET, POST, PUT, DELETE, PATCH, HEAD, and OPTIONS.
                        </p>

                        <CodeBlock code={`// GET request
const user = await client.get('/users/123');

// POST request with body
const newUser = await client.post('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// PUT request
const updated = await client.put('/users/123', { name: 'Jane Doe' });

// DELETE request
await client.delete('/users/123');`} />
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Plugins</h2>
                        <p className="text-base leading-7 mb-4 text-slate-700 dark:text-slate-300">
                            Plugins extend fasty's functionality by intercepting requests and responses. They can modify requests,
                            handle errors, cache responses, and more.
                        </p>

                        <CodeBlock code={`import { retryPlugin, cachePlugin, authPlugin } from 'fasty/plugins';

const client = new fasty({
  plugins: [
    retryPlugin({ retries: 3, backoff: 'exponential' }),
    cachePlugin({ ttl: 60000 }),
    authPlugin({ token: 'your-token' })
  ]
});`} />
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Transports</h2>
                        <p className="text-base leading-7 text-slate-700 dark:text-slate-300">
                            Transports are the underlying mechanism for making HTTP requests. fasty automatically selects the best
                            transport for your runtime (browser fetch, Node http/https, etc.).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Error Handling</h2>
                        <p className="text-base leading-7 mb-4 text-slate-700 dark:text-slate-300">
                            fasty throws errors for failed requests, making it easy to handle errors with try/catch blocks.
                        </p>

                        <CodeBlock code={`try {
  const data = await client.get('/users/123');
} catch (error) {
  if (error.status === 404) {
    console.log('User not found');
  } else if (error.status >= 500) {
    console.log('Server error');
  } else {
    console.log('Request failed:', error.message);
  }
}`} />
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Type Safety</h2>
                        <p className="text-base leading-7 mb-4 text-slate-700 dark:text-slate-300">
                            fasty is built with TypeScript and provides full type safety for requests and responses.
                        </p>

                        <CodeBlock code={`interface User {
  id: number;
  name: string;
  email: string;
}

// Response is automatically typed as User
const user = await client.get<User>('/users/123');

// TypeScript error: Property 'invalid' does not exist on type 'User'
console.log(user.invalid);`} />
                    </section>
                </div>
            </DocLayout>
        );
    }

    if (pageId === 'architecture') {
        return (
            <DocLayout
                title="Architecture diagram"
                description="Understanding fasty's internal architecture"
            >
                <div className="space-y-8">
                    <section>
                        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">High-Level Architecture</h2>
                        <p className="text-base leading-7 mb-6 text-slate-700 dark:text-slate-300">
                            fasty is designed with a layered architecture that separates concerns and allows for maximum flexibility.
                        </p>

                        <div className="my-8 p-8 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                            <div className="space-y-4">
                                <ArchitectureLayer
                                    title="Application Layer"
                                    description="Your application code"
                                    color="violet"
                                />
                                <div className="flex justify-center">
                                    <div className="w-px h-8 bg-slate-300 dark:bg-slate-700" />
                                </div>
                                <ArchitectureLayer
                                    title="fasty API"
                                    description="get(), post(), put(), delete(), etc."
                                    color="purple"
                                />
                                <div className="flex justify-center">
                                    <div className="w-px h-8 bg-slate-300 dark:bg-slate-700" />
                                </div>
                                <ArchitectureLayer
                                    title="Plugin System"
                                    description="onRequest, onResponse, onError hooks"
                                    color="fuchsia"
                                />
                                <div className="flex justify-center">
                                    <div className="w-px h-8 bg-slate-300 dark:bg-slate-700" />
                                </div>
                                <ArchitectureLayer
                                    title="Transport Layer"
                                    description="Browser fetch, Node http/https, Deno, Bun"
                                    color="pink"
                                />
                                <div className="flex justify-center">
                                    <div className="w-px h-8 bg-slate-300 dark:bg-slate-700" />
                                </div>
                                <ArchitectureLayer
                                    title="Network"
                                    description="HTTP/HTTPS requests"
                                    color="rose"
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Request Flow</h2>
                        <p className="text-base leading-7 mb-4 text-slate-700 dark:text-slate-300">
                            When you make a request, it flows through several stages:
                        </p>

                        <ol className="space-y-3 ml-6">
                            <li className="text-slate-700 dark:text-slate-300">
                                <strong className="text-slate-900 dark:text-white">Request Creation</strong> - Your call to <code className="text-violet-600 dark:text-violet-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm">client.get()</code> creates a request object
                            </li>
                            <li className="text-slate-700 dark:text-slate-300">
                                <strong className="text-slate-900 dark:text-white">Plugin onRequest</strong> - Each plugin's <code className="text-violet-600 dark:text-violet-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm">onRequest</code> hook is called in order
                            </li>
                            <li className="text-slate-700 dark:text-slate-300">
                                <strong className="text-slate-900 dark:text-white">Transport Execution</strong> - The appropriate transport sends the HTTP request
                            </li>
                            <li className="text-slate-700 dark:text-slate-300">
                                <strong className="text-slate-900 dark:text-white">Plugin onResponse</strong> - Each plugin's <code className="text-violet-600 dark:text-violet-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm">onResponse</code> hook is called in reverse order
                            </li>
                            <li className="text-slate-700 dark:text-slate-300">
                                <strong className="text-slate-900 dark:text-white">Response Return</strong> - The final response is returned to your application
                            </li>
                        </ol>

                        <p className="text-base leading-7 mt-6 text-slate-700 dark:text-slate-300">
                            If an error occurs at any stage, the plugin <code className="text-violet-600 dark:text-violet-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm">onError</code> hooks are called, allowing plugins to
                            retry requests, log errors, or transform error responses.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Plugin Execution Order</h2>
                        <CodeBlock code={`plugins: [
  pluginA(),  // onRequest: 1st, onResponse: 3rd
  pluginB(),  // onRequest: 2nd, onResponse: 2nd
  pluginC()   // onRequest: 3rd, onResponse: 1st
]

// Request flow:
// App → PluginA.onRequest → PluginB.onRequest → PluginC.onRequest
//     → Transport → Network
//     → PluginC.onResponse → PluginB.onResponse → PluginA.onResponse → App`} />
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Transport Selection</h2>
                        <p className="text-base leading-7 mb-4 text-slate-700 dark:text-slate-300">
                            fasty automatically detects the runtime environment and selects the appropriate transport:
                        </p>

                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <span className="text-violet-600 dark:text-violet-400 font-bold">•</span>
                                <div>
                                    <strong className="text-slate-900 dark:text-white">Browser</strong>
                                    <span className="text-slate-700 dark:text-slate-300"> - Uses native <code className="text-violet-600 dark:text-violet-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm">fetch()</code> API</span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-violet-600 dark:text-violet-400 font-bold">•</span>
                                <div>
                                    <strong className="text-slate-900 dark:text-white">Node.js</strong>
                                    <span className="text-slate-700 dark:text-slate-300"> - Uses <code className="text-violet-600 dark:text-violet-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm">http</code>/<code className="text-violet-600 dark:text-violet-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm">https</code> modules with keep-alive agent</span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-violet-600 dark:text-violet-400 font-bold">•</span>
                                <div>
                                    <strong className="text-slate-900 dark:text-white">Deno</strong>
                                    <span className="text-slate-700 dark:text-slate-300"> - Uses Deno's native <code className="text-violet-600 dark:text-violet-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm">fetch()</code></span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-violet-600 dark:text-violet-400 font-bold">•</span>
                                <div>
                                    <strong className="text-slate-900 dark:text-white">Bun</strong>
                                    <span className="text-slate-700 dark:text-slate-300"> - Uses Bun's optimized <code className="text-violet-600 dark:text-violet-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm">fetch()</code></span>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-violet-600 dark:text-violet-400 font-bold">•</span>
                                <div>
                                    <strong className="text-slate-900 dark:text-white">Edge Runtimes</strong>
                                    <span className="text-slate-700 dark:text-slate-300"> - Uses standard <code className="text-violet-600 dark:text-violet-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm">fetch()</code> API</span>
                                </div>
                            </li>
                        </ul>
                    </section>
                </div>
            </DocLayout>
        );
    }

    return null;
}

function ArchitectureLayer({ title, description, color }: { title: string; description: string; color: string }) {
    const colorClasses = {
        violet: 'bg-violet-100 dark:bg-violet-900/30 border-violet-300 dark:border-violet-700',
        purple: 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700',
        fuchsia: 'bg-fuchsia-100 dark:bg-fuchsia-900/30 border-fuchsia-300 dark:border-fuchsia-700',
        pink: 'bg-pink-100 dark:bg-pink-900/30 border-pink-300 dark:border-pink-700',
        rose: 'bg-rose-100 dark:bg-rose-900/30 border-rose-300 dark:border-rose-700',
    }[color];

    return (
        <div className={`p-4 rounded-lg border-2 ${colorClasses}`}>
            <div className="font-semibold mb-1 text-slate-900 dark:text-white">{title}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">{description}</div>
        </div>
    );
}