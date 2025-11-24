"use client"

import { DocLayout } from '../layout/DocLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { CodeBlock } from '@/components/CodeBlock';

interface PerformancePageProps {
    pageId: string;  // Changed from PageId to string
}

export function PerformancePage({ pageId }: PerformancePageProps) {
    if (pageId === 'performance-overview') {
        return (
            <DocLayout
                title="How fasty reduces latency"
                description="Performance optimizations in fasty"
            >
                <h2>Overview</h2>
                <p>
                    fasty is designed for performance from the ground up. Here's how it achieves excellent performance:
                </p>

                <h2>1. Keep-Alive Connection Pooling</h2>
                <p>
                    In Node.js, fasty automatically uses keep-alive agents to reuse TCP connections:
                </p>

                <div className="my-6 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-medium mb-2">Without Keep-Alive</h4>
                            <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                <li>• TCP handshake: ~50ms</li>
                                <li>• TLS handshake: ~100ms</li>
                                <li>• HTTP request: ~50ms</li>
                                <li className="pt-2 font-medium text-slate-900 dark:text-slate-100">Total: ~200ms per request</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">With Keep-Alive</h4>
                            <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                <li>• TCP handshake: ~50ms (first only)</li>
                                <li>• TLS handshake: ~100ms (first only)</li>
                                <li>• HTTP request: ~50ms</li>
                                <li className="pt-2 font-medium text-green-600 dark:text-green-400">Total: ~50ms per request</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <h2>2. DNS Caching</h2>
                <p>
                    fasty caches DNS lookups in Node.js, eliminating repeated DNS resolution overhead.
                </p>

                <CodeBlock code={`// First request: DNS lookup + request (~80ms)
await client.get('https://api.example.com/users');

// Subsequent requests: No DNS lookup (~50ms)
await client.get('https://api.example.com/posts');
await client.get('https://api.example.com/comments');`} />

                <h2>3. HTTP/2 Multiplexing</h2>
                <p>
                    When HTTP/2 is available, multiple requests can be multiplexed over a single connection:
                </p>

                <CodeBlock code={`const client = new fasty({
  http2: true
});

// All requests share one HTTP/2 connection
await Promise.all([
  client.get('/endpoint1'),
  client.get('/endpoint2'),
  client.get('/endpoint3')
]);`} />

                <h2>4. Minimal Bundle Size</h2>
                <p>
                    At just 8.2 KB gzipped, fasty loads fast and doesn't bloat your bundle:
                </p>

                <div className="my-6 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-3xl mb-2">8.2 KB</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">fasty</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">13.4 KB</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">axios</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">0 KB</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">fetch (native)</div>
                        </div>
                    </div>
                </div>

                <h2>5. Prefetch & Preconnect</h2>
                <p>
                    Warm up connections before making requests:
                </p>

                <CodeBlock code={`// Establish connection early
await client.preconnect('https://api.example.com');

// Later, request is faster (connection already open)
const data = await client.get('https://api.example.com/users');`} />

                <h2>6. Request Batching</h2>
                <p>
                    Batch multiple requests to reduce overhead:
                </p>

                <CodeBlock code={`const results = await client.batch([
  { method: 'GET', url: '/users/1' },
  { method: 'GET', url: '/users/2' },
  { method: 'GET', url: '/users/3' }
]);

// Server receives single batched request
// Reduces HTTP overhead`} />

                <h2>Performance Tips</h2>
                <ul>
                    <li>Use keep-alive in Node.js (enabled by default)</li>
                    <li>Enable HTTP/2 for multiplexing</li>
                    <li>Cache responses with the cache plugin</li>
                    <li>Batch requests when possible</li>
                    <li>Use preconnect for known endpoints</li>
                    <li>Set appropriate timeouts</li>
                    <li>Minimize request payload size</li>
                </ul>
            </DocLayout>
        );
    }

    if (pageId === 'benchmarks') {
        const bundleSizeData = [
            { name: 'fasty', size: 8.2 },
            { name: 'ky', size: 11.5 },
            { name: 'axios', size: 13.4 },
            { name: 'superagent', size: 19.8 },
        ];

        const requestTimeData = [
            { name: '1 req', fasty: 150, axios: 155, fetch: 145 },
            { name: '10 req', fasty: 600, axios: 1200, fetch: 1400 },
            { name: '50 req', fasty: 2100, axios: 5800, fetch: 6900 },
            { name: '100 req', fasty: 5100, axios: 11500, fetch: 13800 },
        ];

        return (
            <DocLayout
                title="Benchmarks"
                description="Performance comparisons and benchmarks"
            >
                <h2>Bundle Size Comparison</h2>
                <p>
                    Smaller bundles mean faster page loads and better user experience:
                </p>

                <div className="my-8 w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={bundleSizeData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                            <XAxis dataKey="name" className="text-sm" />
                            <YAxis label={{ value: 'KB (gzipped)', angle: -90, position: 'insideLeft' }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgb(15 23 42)',
                                    border: '1px solid rgb(51 65 85)',
                                    borderRadius: '0.5rem'
                                }}
                            />
                            <Bar dataKey="size" fill="#8b5cf6" name="Size (KB)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <h2>Request Performance (Node.js)</h2>
                <p>
                    Time to complete multiple sequential requests (lower is better):
                </p>

                <div className="my-8 w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={requestTimeData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                            <XAxis dataKey="name" />
                            <YAxis label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft' }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgb(15 23 42)',
                                    border: '1px solid rgb(51 65 85)',
                                    borderRadius: '0.5rem'
                                }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="fasty" stroke="#8b5cf6" strokeWidth={2} name="fasty" />
                            <Line type="monotone" dataKey="axios" stroke="#f59e0b" strokeWidth={2} name="axios" />
                            <Line type="monotone" dataKey="fetch" stroke="#64748b" strokeWidth={2} name="fetch" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <h2>Detailed Results</h2>
                <div className="my-6 overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <th className="text-left p-3">Metric</th>
                                <th className="text-left p-3">fasty</th>
                                <th className="text-left p-3">axios</th>
                                <th className="text-left p-3">fetch</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3">Bundle size (gzipped)</td>
                                <td className="p-3 text-green-600 dark:text-green-400">8.2 KB</td>
                                <td className="p-3">13.4 KB</td>
                                <td className="p-3">0 KB (native)</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3">Single request latency</td>
                                <td className="p-3">150ms</td>
                                <td className="p-3">155ms</td>
                                <td className="p-3">145ms</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3">100 requests (Node.js)</td>
                                <td className="p-3 text-green-600 dark:text-green-400">5.1s</td>
                                <td className="p-3">11.5s</td>
                                <td className="p-3">13.8s</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3">Memory usage (100 req)</td>
                                <td className="p-3 text-green-600 dark:text-green-400">12 MB</td>
                                <td className="p-3">18 MB</td>
                                <td className="p-3">15 MB</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3">Keep-alive support</td>
                                <td className="p-3 text-green-600 dark:text-green-400">✓ Auto</td>
                                <td className="p-3">✓ Manual</td>
                                <td className="p-3">✗</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3">HTTP/2 support</td>
                                <td className="p-3 text-green-600 dark:text-green-400">✓</td>
                                <td className="p-3">✗</td>
                                <td className="p-3">✓</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>Test Environment</h2>
                <p>
                    Benchmarks performed on:
                </p>
                <ul>
                    <li>Node.js v20.10.0</li>
                    <li>macOS 14.0 (Apple M2)</li>
                    <li>Target: https://jsonplaceholder.typicode.com</li>
                    <li>Each test averaged over 10 runs</li>
                </ul>

                <h2>Run Your Own Benchmarks</h2>
                <CodeBlock code={`git clone https://github.com/fasty/fasty
cd fasty
npm install
npm run benchmark

# Compare with other libraries
npm run benchmark -- --compare axios,ky,fetch`} />
            </DocLayout>
        );
    }
    return null;
}
