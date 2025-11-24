"use client"

import { DocLayout } from '../layout/DocLayout';
import { CodeBlock } from '@/components/CodeBlock';

interface TransportsPageProps {
    pageId: string;  // Changed from PageId to string
}

export function TransportsPage({ pageId }: TransportsPageProps) {
    if (pageId === 'browser-transport') {
        return (
            <DocLayout
                title="Browser transport"
                description="How fasty works in browsers"
            >
                <h2>Overview</h2>
                <p>
                    In browser environments, fasty uses the native <code>fetch()</code> API for making HTTP requests.
                </p>

                <h2>Automatic Detection</h2>
                <p>
                    fasty automatically detects when it's running in a browser and uses the appropriate transport:
                </p>

                <CodeBlock code={`import { fasty } from 'fasty';

const client = new fasty({
  baseURL: 'https://api.example.com'
});

// Uses native fetch() in browsers
const data = await client.get('/users');`} />

                <h2>Browser Features</h2>
                <ul>
                    <li>Native fetch() API - No polyfills needed</li>
                    <li>Automatic JSON parsing</li>
                    <li>CORS support</li>
                    <li>Credentials handling</li>
                    <li>Abort signals for cancellation</li>
                    <li>Streaming responses</li>
                </ul>

                <h2>CORS Requests</h2>
                <CodeBlock code={`const client = new fasty({
  baseURL: 'https://api.example.com',
  withCredentials: true  // Include cookies in CORS requests
});

// Or per-request:
await client.get('/data', {
  withCredentials: true
});`} />

                <h2>Request Cancellation</h2>
                <CodeBlock code={`const controller = new AbortController();

// Start request
const promise = client.get('/slow-endpoint', {
  signal: controller.signal
});

// Cancel the request
setTimeout(() => controller.abort(), 5000);

try {
  const data = await promise;
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request cancelled');
  }
}`} />

                <h2>Browser Compatibility</h2>
                <p>
                    fasty works in all modern browsers:
                </p>
                <ul>
                    <li>Chrome 42+</li>
                    <li>Firefox 39+</li>
                    <li>Safari 10.1+</li>
                    <li>Edge 14+</li>
                </ul>
            </DocLayout>
        );
    }

    if (pageId === 'node-transport') {
        return (
            <DocLayout
                title="Node transport with keep-alive"
                description="Optimized transport for Node.js"
            >
                <h2>Overview</h2>
                <p>
                    In Node.js, fasty uses a custom transport built on the native <code>http</code> and <code>https</code>
                    modules with automatic keep-alive connection pooling.
                </p>

                <h2>Keep-Alive Benefits</h2>
                <p>
                    Keep-alive connections are automatically reused, providing significant performance improvements:
                </p>

                <ul>
                    <li><strong>Reduced Latency</strong> - No TCP handshake or TLS negotiation for subsequent requests</li>
                    <li><strong>Better Throughput</strong> - Connection pooling enables parallel requests</li>
                    <li><strong>Lower Resource Usage</strong> - Fewer socket connections</li>
                    <li><strong>HTTP/2 Support</strong> - Multiplexing multiple requests over single connection</li>
                </ul>

                <h2>Automatic Configuration</h2>
                <p>
                    fasty automatically configures keep-alive in Node.js:
                </p>

                <CodeBlock code={`import { fasty } from 'fasty';

const client = new fasty({
  baseURL: 'https://api.example.com'
});

// Keep-alive is automatically enabled in Node
// Connections are reused across requests
for (let i = 0; i < 100; i++) {
  await client.get(\`/users/\${i}\`);
}
// All requests use pooled connections`} />

                <h2>Keep-Alive Agent Diagram</h2>
                <div className="my-8 p-8 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <CodeBlock code={`Without Keep-Alive:
Request 1: TCP handshake → TLS handshake → HTTP Request → Close
Request 2: TCP handshake → TLS handshake → HTTP Request → Close
Request 3: TCP handshake → TLS handshake → HTTP Request → Close

With Keep-Alive (fasty):
Request 1: TCP handshake → TLS handshake → HTTP Request
Request 2: ─────────────────────────────────→ HTTP Request (reuse)
Request 3: ─────────────────────────────────→ HTTP Request (reuse)

Time saved: ~100-200ms per request`} />
                </div>

                <h2>Custom Agent Configuration</h2>
                <CodeBlock code={`import { fasty } from 'fasty';
import https from 'https';

const agent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 30000,  // Send keep-alive probes every 30s
  maxSockets: 100,        // Max concurrent connections per host
  maxFreeSockets: 10,     // Max idle sockets to keep open
  timeout: 60000          // Socket timeout
});

const client = new fasty({
  baseURL: 'https://api.example.com',
  httpAgent: agent
});`} />

                <h2>Connection Pooling</h2>
                <p>
                    fasty maintains a pool of connections per host:
                </p>

                <CodeBlock code={`const client = new fasty();

// Parallel requests to same host use connection pool
await Promise.all([
  client.get('https://api.example.com/users'),
  client.get('https://api.example.com/posts'),
  client.get('https://api.example.com/comments')
]);
// Uses 1-3 pooled connections (depending on availability)`} />

                <h2>HTTP/2 Support</h2>
                <CodeBlock code={`import { fasty } from 'fasty';

const client = new fasty({
  baseURL: 'https://api.example.com',
  http2: true  // Enable HTTP/2
});

// HTTP/2 multiplexes multiple requests over single connection
await Promise.all([
  client.get('/endpoint1'),
  client.get('/endpoint2'),
  client.get('/endpoint3')
]);
// All three requests share one HTTP/2 connection`} />

                <h2>Performance Comparison</h2>
                <div className="my-6 overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <th className="text-left p-3">Scenario</th>
                                <th className="text-left p-3">Without Keep-Alive</th>
                                <th className="text-left p-3">With Keep-Alive</th>
                                <th className="text-left p-3">Improvement</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3">Single request</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">150ms</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">150ms</td>
                                <td className="p-3 text-green-600 dark:text-green-400">0%</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3">10 requests</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">1500ms</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">600ms</td>
                                <td className="p-3 text-green-600 dark:text-green-400">60%</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3">100 requests</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">15000ms</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">5100ms</td>
                                <td className="p-3 text-green-600 dark:text-green-400">66%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </DocLayout>
        );
    }

    if (pageId === 'transport-swap') {
        return (
            <DocLayout
                title="How to swap transports"
                description="Use custom transports"
            >
                <h2>Custom Transport</h2>
                <p>
                    You can provide a custom transport implementation:
                </p>

                <CodeBlock code={`import { fasty } from 'fasty';

const customTransport = {
  async request(config) {
    // Your custom request logic
    const response = await yourHttpLibrary(config);
    
    return {
      data: response.body,
      status: response.statusCode,
      statusText: response.statusMessage,
      headers: response.headers
    };
  }
};

const client = new fasty({
  transport: customTransport
});`} />

                <h2>Mocking for Tests</h2>
                <CodeBlock code={`const mockTransport = {
  async request(config) {
    // Return mock data
    return {
      data: { id: 123, name: 'John Doe' },
      status: 200,
      statusText: 'OK',
      headers: new Headers()
    };
  }
};

const client = new fasty({
  transport: mockTransport
});

const data = await client.get('/users/123');
// Returns mock data without network request`} />
            </DocLayout>
        );
    }

    if (pageId === 'deno-bun') {
        return (
            <DocLayout
                title="Deno / Bun compatibility"
                description="Using fasty in alternative runtimes"
            >
                <h2>Deno</h2>
                <p>
                    fasty works seamlessly in Deno using native fetch:
                </p>

                <CodeBlock code={`// Import from npm or CDN
import { fasty } from "npm:fasty@2.0.0";
// or
import { fasty } from "https://esm.sh/fasty@2.0.0";

const client = new fasty({
  baseURL: "https://api.example.com"
});

const data = await client.get("/users");`} />

                <h2>Bun</h2>
                <p>
                    Bun's optimized fetch implementation works great with fasty:
                </p>

                <CodeBlock code={`import { fasty } from "fasty";

const client = new fasty({
  baseURL: "https://api.example.com"
});

// Bun's native fetch is extremely fast
const data = await client.get("/users");`} />

                <h2>Cloudflare Workers</h2>
                <CodeBlock code={`import { fasty } from "fasty";

export default {
  async fetch(request, env) {
    const client = new fasty({
      baseURL: "https://api.example.com"
    });
    
    const data = await client.get("/users");
    
    return new Response(JSON.stringify(data), {
      headers: { "content-type": "application/json" }
    });
  }
};`} />
            </DocLayout>
        );
    }
    return null;
}
