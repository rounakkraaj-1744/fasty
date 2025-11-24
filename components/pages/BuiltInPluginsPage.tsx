"use client"

import { DocLayout } from '../layout/DocLayout';
import { CodeBlock } from '@/components/CodeBlock';

interface BuiltInPluginsPageProps {
    pageId: string;  // Changed from PageId to string
}

export function BuiltInPluginsPage({ pageId }: BuiltInPluginsPageProps) {
    if (pageId === 'retry-plugin') {
        return (
            <DocLayout
                title="Retry plugin"
                description="Automatically retry failed requests"
            >
                <h2>Overview</h2>
                <p>
                    The retry plugin automatically retries failed requests with configurable backoff strategies.
                </p>

                <h2>Basic Usage</h2>
                <CodeBlock code={`import { fasty, retryPlugin } from 'fasty';

const client = new fasty({
  baseURL: 'https://api.example.com',
  plugins: [
    retryPlugin({
      retries: 3,
      backoff: 'exponential'
    })
  ]
});

// Automatically retries up to 3 times on failure
const data = await client.get('/unstable-endpoint');`} />

                <h2>Configuration Options</h2>
                <div className="my-6 overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <th className="text-left p-3">Option</th>
                                <th className="text-left p-3">Type</th>
                                <th className="text-left p-3">Default</th>
                                <th className="text-left p-3">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>retries</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">number</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">3</td>
                                <td className="p-3">Maximum number of retry attempts</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>backoff</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">string</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">'exponential'</td>
                                <td className="p-3">Backoff strategy: 'linear', 'exponential', 'constant'</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>delay</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">number</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">1000</td>
                                <td className="p-3">Initial delay in milliseconds</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>maxDelay</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">number</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">30000</td>
                                <td className="p-3">Maximum delay in milliseconds</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>jitter</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">boolean</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">true</td>
                                <td className="p-3">Add random jitter to delays</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>retryOnStatus</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">number[]</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">[408, 429, 500, 502, 503, 504]</td>
                                <td className="p-3">HTTP status codes to retry on</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>shouldRetry</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">function</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">-</td>
                                <td className="p-3">Custom retry logic</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>Backoff Strategies</h2>

                <h3>Exponential Backoff</h3>
                <p>
                    Delay doubles with each retry: 1s, 2s, 4s, 8s...
                </p>
                <CodeBlock code={`retryPlugin({
  retries: 3,
  backoff: 'exponential',
  delay: 1000  // 1s, 2s, 4s
})`} />

                <h3>Linear Backoff</h3>
                <p>
                    Delay increases linearly: 1s, 2s, 3s, 4s...
                </p>
                <CodeBlock code={`retryPlugin({
  retries: 3,
  backoff: 'linear',
  delay: 1000  // 1s, 2s, 3s
})`} />

                <h3>Constant Backoff</h3>
                <p>
                    Same delay for each retry: 1s, 1s, 1s...
                </p>
                <CodeBlock code={`retryPlugin({
  retries: 3,
  backoff: 'constant',
  delay: 1000  // 1s, 1s, 1s
})`} />

                <h2>Jitter</h2>
                <p>
                    Jitter adds randomness to prevent thundering herd problems:
                </p>
                <CodeBlock code={`retryPlugin({
  retries: 3,
  backoff: 'exponential',
  delay: 1000,
  jitter: true  // Adds ±25% randomness to delays
})`} />

                <h2>Custom Retry Logic</h2>
                <CodeBlock code={`retryPlugin({
  retries: 5,
  shouldRetry: (error, attempt) => {
    // Only retry on network errors or 5xx
    if (!error.status || error.status >= 500) {
      return true;
    }
    
    // Retry 429 (rate limit) with longer delay
    if (error.status === 429) {
      return true;
    }
    
    return false;
  }
})`} />

                <h2>Retry with Rate Limiting</h2>
                <CodeBlock code={`retryPlugin({
  retries: 3,
  shouldRetry: (error, attempt) => {
    // Respect Retry-After header
    if (error.status === 429) {
      const retryAfter = error.headers.get('Retry-After');
      if (retryAfter) {
        const delay = parseInt(retryAfter) * 1000;
        // Wait for the specified time
        return new Promise(resolve => setTimeout(() => resolve(true), delay));
      }
    }
    return error.status >= 500;
  }
})`} />

                <h2>Timing Diagram</h2>
                <div className="my-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <CodeBlock code={`// Exponential backoff with jitter:
Attempt 1: Request → Fail (500) → Wait ~1000ms
Attempt 2: Request → Fail (500) → Wait ~2000ms  
Attempt 3: Request → Fail (500) → Wait ~4000ms
Attempt 4: Request → Success ✓

// Total retries: 3
// Total time: ~7 seconds`} />
                </div>
            </DocLayout>
        );
    }

    if (pageId === 'cache-plugin') {
        return (
            <DocLayout
                title="Memory cache plugin"
                description="Cache responses to reduce network calls"
            >
                <h2>Overview</h2>
                <p>
                    The cache plugin stores responses in memory and serves them on subsequent requests, reducing
                    network calls and improving performance.
                </p>

                <h2>Basic Usage</h2>
                <CodeBlock code={`import { fasty, cachePlugin } from 'fasty';

const client = new fasty({
  baseURL: 'https://api.example.com',
  plugins: [
    cachePlugin({
      ttl: 60000,  // Cache for 60 seconds
      maxSize: 100 // Maximum 100 cached entries
    })
  ]
});

// First request - hits network
const user1 = await client.get('/users/123');

// Second request - served from cache
const user2 = await client.get('/users/123');`} />

                <h2>Configuration Options</h2>
                <div className="my-6 overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <th className="text-left p-3">Option</th>
                                <th className="text-left p-3">Type</th>
                                <th className="text-left p-3">Default</th>
                                <th className="text-left p-3">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>ttl</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">number</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">60000</td>
                                <td className="p-3">Time to live in milliseconds</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>maxSize</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">number</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">100</td>
                                <td className="p-3">Maximum cache entries</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>methods</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">string[]</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">['GET']</td>
                                <td className="p-3">HTTP methods to cache</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>keyGenerator</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">function</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">-</td>
                                <td className="p-3">Custom cache key function</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>shouldCache</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">function</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">-</td>
                                <td className="p-3">Custom caching logic</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>SWR (Stale-While-Revalidate)</h2>
                <p>
                    Serve stale data immediately while fetching fresh data in the background:
                </p>

                <CodeBlock code={`cachePlugin({
  ttl: 60000,
  swr: true,  // Enable SWR
  swrTtl: 300000  // Serve stale data for up to 5 minutes
})`} />

                <h2>SWR Behavior</h2>
                <div className="my-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <CodeBlock code={`// Time 0s: First request
const data1 = await client.get('/users');
// → Network request → Cache stored

// Time 30s: Cache is fresh
const data2 = await client.get('/users');
// → Served from cache instantly

// Time 90s: Cache is stale but within SWR window
const data3 = await client.get('/users');
// → Served from cache instantly
// → Background request to refresh cache

// Time 400s: Cache expired
const data4 = await client.get('/users');
// → Network request → Cache updated`} />
                </div>

                <h2>Custom Cache Keys</h2>
                <CodeBlock code={`cachePlugin({
  keyGenerator: (config) => {
    // Include user ID in cache key
    const userId = config.headers['X-User-ID'];
    return \`\${config.method}:\${config.url}:user-\${userId}\`;
  }
})`} />

                <h2>Selective Caching</h2>
                <CodeBlock code={`cachePlugin({
  shouldCache: (response) => {
    // Only cache successful responses
    if (response.status !== 200) {
      return false;
    }
    
    // Don't cache responses with no-cache header
    if (response.headers.get('Cache-Control')?.includes('no-cache')) {
      return false;
    }
    
    return true;
  }
})`} />

                <h2>Cache Invalidation</h2>
                <CodeBlock code={`const cache = cachePlugin({ ttl: 60000 });

const client = new fasty({
  plugins: [cache]
});

// Make requests
await client.get('/users/123');

// Clear specific entry
cache.clear('/users/123');

// Clear all cache
cache.clearAll();

// Clear by pattern
cache.clearPattern(/^\/users\//);`} />

                <h2>Per-Request Cache Override</h2>
                <CodeBlock code={`// Disable cache for specific request
const freshData = await client.get('/users/123', {
  cache: false
});

// Force refresh cache
const refreshed = await client.get('/users/123', {
  cache: { refresh: true }
});

// Custom TTL for request
const shortLived = await client.get('/status', {
  cache: { ttl: 5000 }  // Only cache for 5 seconds
});`} />

                <h2>Short-Circuiting Diagram</h2>
                <div className="my-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="space-y-4">
                        <div className="p-4 bg-violet-100 dark:bg-violet-900/30 rounded-lg border border-violet-300 dark:border-violet-700">
                            <div className="font-medium mb-1">Request → Cache Plugin</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Check if response exists in cache</div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg border border-green-300 dark:border-green-700">
                                <div className="font-medium mb-1">✓ Cache Hit</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Return cached response immediately</div>
                            </div>

                            <div className="flex-1 p-4 bg-orange-100 dark:bg-orange-900/30 rounded-lg border border-orange-300 dark:border-orange-700">
                                <div className="font-medium mb-1">✗ Cache Miss</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Proceed to network request</div>
                            </div>
                        </div>
                    </div>
                </div>
            </DocLayout>
        );
    }

    return null;
}