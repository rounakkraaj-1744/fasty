"use client"

import { DocLayout } from '../layout/DocLayout';
import { CodeBlock } from '@/components/CodeBlock';

interface IntroductionPageProps {
    pageId: string;  // Changed from PageId to string
}

export function IntroductionPage({ pageId }: IntroductionPageProps) {
    if (pageId === 'what-is-fasty') {
        return (
            <DocLayout
                title="What is fasty?"
                description="Learn about fasty and its core features"
            >
                <p>
                    fasty is a modern, lightweight HTTP client library built for JavaScript and TypeScript. It provides a simple,
                    intuitive API for making HTTP requests while maintaining excellent performance and a tiny bundle size.
                </p>

                <h2>Core Principles</h2>
                <ul>
                    <li><strong>Performance First</strong> - Optimized for speed with automatic keep-alive pooling and HTTP/2 support</li>
                    <li><strong>Minimal Bundle Size</strong> - Just 8.2 KB gzipped with zero runtime dependencies</li>
                    <li><strong>Developer Experience</strong> - TypeScript-first API with excellent type inference</li>
                    <li><strong>Extensibility</strong> - Powerful plugin system for customization</li>
                    <li><strong>Universal</strong> - Works in Node, browsers, Deno, Bun, and edge runtimes</li>
                </ul>

                <h2>Key Features</h2>

                <h3>Tiny Bundle Size</h3>
                <p>
                    At just 8.2 KB gzipped, fasty is one of the smallest full-featured HTTP clients available.
                    The core is tree-shakeable, so you only bundle what you use.
                </p>

                <h3>Plugin Architecture</h3>
                <p>
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

                <h3>TypeScript-First</h3>
                <p>
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
            </DocLayout>
        );
    }

    if (pageId === 'why-fasty') {
        return (
            <DocLayout
                title="Why fasty exists"
                description="Understanding the motivation behind fasty"
            >
                <h2>The Problem</h2>
                <p>
                    The JavaScript ecosystem has several HTTP client options, but each comes with trade-offs:
                </p>

                <ul>
                    <li><strong>fetch</strong> - Native and lightweight, but lacks features like interceptors, retries, and keep-alive in Node</li>
                    <li><strong>axios</strong> - Feature-rich but relatively large (13+ KB) and doesn't work in edge runtimes</li>
                    <li><strong>node-fetch</strong> - Good for Node but not universal and lacks advanced features</li>
                    <li><strong>ky</strong> - Modern but focused on browsers, less optimized for Node</li>
                </ul>

                <h2>The Solution</h2>
                <p>
                    fasty was built to provide the best of all worlds:
                </p>

                <ul>
                    <li>Small bundle size like fetch</li>
                    <li>Feature-rich like axios</li>
                    <li>Universal runtime support</li>
                    <li>Performance optimizations for Node (keep-alive, HTTP/2)</li>
                    <li>Modern plugin architecture</li>
                    <li>TypeScript-first design</li>
                </ul>

                <h2>Real-World Benefits</h2>

                <h3>Reduced Bundle Size</h3>
                <p>
                    Every kilobyte matters for web performance. By switching from axios to fasty, you can save ~5 KB in your bundle,
                    leading to faster page loads and better user experience.
                </p>

                <h3>Better Performance in Node</h3>
                <p>
                    fasty automatically uses keep-alive agents in Node.js, reducing connection overhead and improving throughput
                    for applications making many HTTP requests.
                </p>

                <h3>Edge Runtime Compatible</h3>
                <p>
                    Works seamlessly in Cloudflare Workers, Vercel Edge Functions, and other edge runtimes where traditional
                    Node-based libraries fail.
                </p>

                <h3>Easier to Extend</h3>
                <p>
                    The plugin system makes it simple to add custom behavior without modifying core code or relying on fragile monkey-patching.
                </p>
            </DocLayout>
        );
    }

    if (pageId === 'key-concepts') {
        return (
            <DocLayout
                title="Key concepts"
                description="Understanding fasty's core concepts"
            >
                <h2>Client Instance</h2>
                <p>
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

                <h2>Request Methods</h2>
                <p>
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

                <h2>Plugins</h2>
                <p>
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

                <h2>Transports</h2>
                <p>
                    Transports are the underlying mechanism for making HTTP requests. fasty automatically selects the best
                    transport for your runtime (browser fetch, Node http/https, etc.).
                </p>

                <h2>Error Handling</h2>
                <p>
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

                <h2>Type Safety</h2>
                <p>
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
            </DocLayout>
        );
    }

    if (pageId === 'architecture') {
        return (
            <DocLayout
                title="Architecture diagram"
                description="Understanding fasty's internal architecture"
            >
                <h2>High-Level Architecture</h2>
                <p>
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

                <h2>Request Flow</h2>
                <p>
                    When you make a request, it flows through several stages:
                </p>

                <ol>
                    <li><strong>Request Creation</strong> - Your call to <code>client.get()</code> creates a request object</li>
                    <li><strong>Plugin onRequest</strong> - Each plugin's <code>onRequest</code> hook is called in order</li>
                    <li><strong>Transport Execution</strong> - The appropriate transport sends the HTTP request</li>
                    <li><strong>Plugin onResponse</strong> - Each plugin's <code>onResponse</code> hook is called in reverse order</li>
                    <li><strong>Response Return</strong> - The final response is returned to your application</li>
                </ol>

                <p>
                    If an error occurs at any stage, the plugin <code>onError</code> hooks are called, allowing plugins to
                    retry requests, log errors, or transform error responses.
                </p>

                <h2>Plugin Execution Order</h2>
                <div className="my-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <CodeBlock code={`plugins: [
  pluginA(),  // onRequest: 1st, onResponse: 3rd
  pluginB(),  // onRequest: 2nd, onResponse: 2nd
  pluginC()   // onRequest: 3rd, onResponse: 1st
]

// Request flow:
// App → PluginA.onRequest → PluginB.onRequest → PluginC.onRequest
//     → Transport → Network
//     → PluginC.onResponse → PluginB.onResponse → PluginA.onResponse → App`} />
                </div>

                <h2>Transport Selection</h2>
                <p>
                    fasty automatically detects the runtime environment and selects the appropriate transport:
                </p>

                <ul>
                    <li><strong>Browser</strong> - Uses native <code>fetch()</code> API</li>
                    <li><strong>Node.js</strong> - Uses <code>http</code>/<code>https</code> modules with keep-alive agent</li>
                    <li><strong>Deno</strong> - Uses Deno's native <code>fetch()</code></li>
                    <li><strong>Bun</strong> - Uses Bun's optimized <code>fetch()</code></li>
                    <li><strong>Edge Runtimes</strong> - Uses standard <code>fetch()</code> API</li>
                </ul>
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
            <div className="font-medium mb-1">{title}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">{description}</div>
        </div>
    );
}
