"use client"

import { DocLayout } from '../layout/DocLayout';
import { CodeBlock } from '@/components/CodeBlock';

interface PluginSystemPageProps {
    pageId: string;  // Changed from PageId to string
}

export function PluginSystemPage({ pageId }: PluginSystemPageProps) {
    if (pageId === 'how-plugins-work') {
        return (
            <DocLayout
                title="How plugins work"
                description="Understanding FastClient's plugin architecture"
            >
                <h2>What are Plugins?</h2>
                <p>
                    Plugins extend FastClient's functionality by intercepting and modifying requests, responses, and errors.
                    They provide a clean way to add features like retry logic, caching, authentication, logging, and more
                    without modifying the core library.
                </p>

                <h2>Basic Plugin Usage</h2>
                <CodeBlock code={`import { FastClient, retryPlugin, cachePlugin } from 'fastclient';

const client = new FastClient({
  baseURL: 'https://api.example.com',
  plugins: [
    retryPlugin({ retries: 3 }),
    cachePlugin({ ttl: 60000 })
  ]
});`} />

                <h2>How Plugins Work</h2>
                <p>
                    Plugins are executed in a specific order during the request lifecycle:
                </p>

                <ol>
                    <li><strong>onRequest</strong> - Called before the request is sent (in order)</li>
                    <li><strong>Transport</strong> - The actual HTTP request is made</li>
                    <li><strong>onResponse</strong> - Called when a response is received (in reverse order)</li>
                    <li><strong>onError</strong> - Called if an error occurs (in reverse order)</li>
                </ol>

                <div className="my-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <CodeBlock code={`// Plugin execution order:
plugins: [pluginA, pluginB, pluginC]

// Request flow:
App
  → PluginA.onRequest
    → PluginB.onRequest
      → PluginC.onRequest
        → Transport (HTTP request)
      → PluginC.onResponse
    → PluginB.onResponse
  → PluginA.onResponse
→ App (response)`} />
                </div>

                <h2>Plugin Benefits</h2>
                <ul>
                    <li><strong>Composable</strong> - Combine multiple plugins for complex behavior</li>
                    <li><strong>Reusable</strong> - Share plugins across projects</li>
                    <li><strong>Testable</strong> - Test plugins in isolation</li>
                    <li><strong>Non-invasive</strong> - No need to modify core code</li>
                    <li><strong>Maintainable</strong> - Keep concerns separated</li>
                </ul>

                <h2>Common Plugin Use Cases</h2>
                <ul>
                    <li>Retry failed requests with exponential backoff</li>
                    <li>Cache responses to reduce network calls</li>
                    <li>Add authentication tokens automatically</li>
                    <li>Log all requests and responses</li>
                    <li>Transform request/response data</li>
                    <li>Implement circuit breaker patterns</li>
                    <li>Add request/response timing metrics</li>
                    <li>Mock responses for testing</li>
                </ul>
            </DocLayout>
        );
    }

    if (pageId === 'plugin-lifecycle') {
        return (
            <DocLayout
                title="Plugin lifecycle diagram"
                description="Visual representation of plugin execution"
            >
                <h2>Plugin Lifecycle</h2>
                <p>
                    Understanding the plugin lifecycle helps you write effective plugins. Here's how plugins interact
                    with the request flow:
                </p>

                <div className="my-8 p-8 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="space-y-4">
                        <LifecycleStep
                            number={1}
                            title="Request Initiated"
                            description="client.get('/users')"
                            color="violet"
                        />

                        <LifecycleStep
                            number={2}
                            title="Plugin A - onRequest"
                            description="Modify request, add headers, log"
                            color="violet"
                        />

                        <LifecycleStep
                            number={3}
                            title="Plugin B - onRequest"
                            description="Check cache, add auth token"
                            color="violet"
                        />

                        <LifecycleStep
                            number={4}
                            title="Transport Layer"
                            description="Execute HTTP request"
                            color="purple"
                        />

                        <LifecycleStep
                            number={5}
                            title="Plugin B - onResponse"
                            description="Store in cache, validate response"
                            color="fuchsia"
                        />

                        <LifecycleStep
                            number={6}
                            title="Plugin A - onResponse"
                            description="Transform data, log response"
                            color="fuchsia"
                        />

                        <LifecycleStep
                            number={7}
                            title="Response Returned"
                            description="Data returned to caller"
                            color="pink"
                        />
                    </div>
                </div>

                <h2>Error Flow</h2>
                <p>
                    When an error occurs, the flow changes to call onError hooks:
                </p>

                <div className="my-8 p-8 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="space-y-4">
                        <LifecycleStep
                            number={1}
                            title="Request Initiated"
                            description="client.get('/users')"
                            color="violet"
                        />

                        <LifecycleStep
                            number={2}
                            title="Plugins - onRequest"
                            description="All onRequest hooks execute"
                            color="violet"
                        />

                        <LifecycleStep
                            number={3}
                            title="Transport Layer"
                            description="HTTP request fails (500 error)"
                            color="red"
                        />

                        <LifecycleStep
                            number={4}
                            title="Plugin B - onError"
                            description="Retry logic, decide to retry"
                            color="red"
                        />

                        <LifecycleStep
                            number={5}
                            title="Plugin A - onError"
                            description="Log error, transform error object"
                            color="red"
                        />

                        <LifecycleStep
                            number={6}
                            title="Error Thrown"
                            description="Error thrown to caller"
                            color="red"
                        />
                    </div>
                </div>

                <h2>Hooks Execution Order</h2>
                <CodeBlock code={`const client = new FastClient({
  plugins: [
    pluginA(),  // Position 0
    pluginB(),  // Position 1
    pluginC()   // Position 2
  ]
});

// onRequest: Forward order (0 → 1 → 2)
// onResponse: Reverse order (2 → 1 → 0)
// onError: Reverse order (2 → 1 → 0)`} />
            </DocLayout>
        );
    }

    if (pageId === 'plugin-interface') {
        return (
            <DocLayout
                title="Plugin interface"
                description="The Plugin interface and available hooks"
            >
                <h2>Plugin Interface</h2>
                <p>
                    A plugin is a function that returns an object with hook methods:
                </p>

                <CodeBlock code={`interface Plugin {
  name?: string;
  onRequest?: (config: RequestConfig) => Promise<RequestConfig> | RequestConfig;
  onResponse?: (response: Response) => Promise<Response> | Response;
  onError?: (error: Error) => Promise<Error> | Error;
}`} />

                <h2>Hook Methods</h2>

                <h3>onRequest</h3>
                <p>
                    Called before the request is sent. Can modify the request configuration.
                </p>

                <CodeBlock code={`onRequest: async (config) => {
  // Add custom header
  config.headers['X-Custom'] = 'value';
  
  // Add timestamp
  config.metadata = { startTime: Date.now() };
  
  // Return modified config
  return config;
}`} />

                <h3>onResponse</h3>
                <p>
                    Called when a successful response is received. Can transform the response.
                </p>

                <CodeBlock code={`onResponse: async (response) => {
  // Log response time
  const duration = Date.now() - response.config.metadata.startTime;
  console.log(\`Request took \${duration}ms\`);
  
  // Transform response data
  if (response.data?.items) {
    response.data.items = response.data.items.map(item => ({
      ...item,
      processed: true
    }));
  }
  
  return response;
}`} />

                <h3>onError</h3>
                <p>
                    Called when an error occurs. Can retry, transform, or handle the error.
                </p>

                <CodeBlock code={`onError: async (error) => {
  // Log error
  console.error('Request failed:', error.message);
  
  // Retry on 5xx errors
  if (error.status >= 500 && error.config.retryCount < 3) {
    error.config.retryCount = (error.config.retryCount || 0) + 1;
    
    // Wait before retry
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Retry the request
    return client.request(error.config);
  }
  
  // Rethrow error
  throw error;
}`} />

                <h2>Plugin Metadata</h2>
                <p>
                    Plugins can store metadata in the config object:
                </p>

                <CodeBlock code={`const timingPlugin = () => ({
  name: 'timing',
  
  onRequest: (config) => {
    config.metadata = config.metadata || {};
    config.metadata.startTime = Date.now();
    return config;
  },
  
  onResponse: (response) => {
    const duration = Date.now() - response.config.metadata.startTime;
    console.log(\`\${response.config.method} \${response.config.url}: \${duration}ms\`);
    return response;
  },
  
  onError: (error) => {
    const duration = Date.now() - error.config.metadata.startTime;
    console.log(\`Failed after \${duration}ms\`);
    throw error;
  }
});`} />

                <h2>Async Hooks</h2>
                <p>
                    All hooks can be async and return Promises:
                </p>

                <CodeBlock code={`const authPlugin = (getToken) => ({
  name: 'auth',
  
  onRequest: async (config) => {
    // Async token fetch
    const token = await getToken();
    config.headers['Authorization'] = \`Bearer \${token}\`;
    return config;
  }
});`} />
            </DocLayout>
        );
    }

    if (pageId === 'writing-plugins') {
        return (
            <DocLayout
                title="Writing your own plugin"
                description="Step-by-step guide to creating custom plugins"
            >
                <h2>Basic Plugin Structure</h2>
                <p>
                    A plugin is a function that returns an object with hook methods:
                </p>

                <CodeBlock code={`function myPlugin(options = {}) {
  return {
    name: 'my-plugin',
    
    onRequest: async (config) => {
      // Modify request
      return config;
    },
    
    onResponse: async (response) => {
      // Process response
      return response;
    },
    
    onError: async (error) => {
      // Handle error
      throw error;
    }
  };
}`} />

                <h2>Example: Logging Plugin</h2>
                <CodeBlock code={`function loggingPlugin(options = {}) {
  const { logRequests = true, logResponses = true } = options;
  
  return {
    name: 'logging',
    
    onRequest: (config) => {
      if (logRequests) {
        console.log(\`→ \${config.method} \${config.url}\`);
      }
      return config;
    },
    
    onResponse: (response) => {
      if (logResponses) {
        console.log(\`← \${response.status} \${response.config.url}\`);
      }
      return response;
    },
    
    onError: (error) => {
      console.error(\`✗ \${error.config.url}: \${error.message}\`);
      throw error;
    }
  };
}

// Usage
const client = new FastClient({
  plugins: [loggingPlugin({ logRequests: true, logResponses: true })]
});`} />

                <h2>Example: Auth Token Plugin</h2>
                <CodeBlock code={`function authTokenPlugin(getToken) {
  return {
    name: 'auth-token',
    
    onRequest: async (config) => {
      // Get fresh token
      const token = await getToken();
      
      // Add to headers
      config.headers = config.headers || {};
      config.headers['Authorization'] = \`Bearer \${token}\`;
      
      return config;
    },
    
    onError: async (error) => {
      // Retry with new token on 401
      if (error.status === 401 && !error.config.retried) {
        error.config.retried = true;
        const newToken = await getToken(true); // Force refresh
        error.config.headers['Authorization'] = \`Bearer \${newToken}\`;
        return client.request(error.config);
      }
      
      throw error;
    }
  };
}

// Usage
const client = new FastClient({
  plugins: [
    authTokenPlugin(async (forceRefresh) => {
      // Your token logic here
      return localStorage.getItem('token');
    })
  ]
});`} />

                <h2>Example: Request Timing Plugin</h2>
                <CodeBlock code={`function timingPlugin() {
  return {
    name: 'timing',
    
    onRequest: (config) => {
      config.metadata = config.metadata || {};
      config.metadata.startTime = performance.now();
      return config;
    },
    
    onResponse: (response) => {
      const duration = performance.now() - response.config.metadata.startTime;
      console.log(\`Request completed in \${duration.toFixed(2)}ms\`);
      
      // Add to response
      response.timing = { duration };
      
      return response;
    },
    
    onError: (error) => {
      const duration = performance.now() - error.config.metadata.startTime;
      console.log(\`Request failed after \${duration.toFixed(2)}ms\`);
      throw error;
    }
  };
}`} />

                <h2>Best Practices</h2>
                <ul>
                    <li><strong>Keep plugins focused</strong> - Each plugin should do one thing well</li>
                    <li><strong>Make plugins configurable</strong> - Accept options for flexibility</li>
                    <li><strong>Handle errors gracefully</strong> - Don't swallow errors unless intentional</li>
                    <li><strong>Use metadata</strong> - Store plugin-specific data in config.metadata</li>
                    <li><strong>Name your plugins</strong> - Add a name property for debugging</li>
                    <li><strong>Document your plugins</strong> - Include TypeScript types and JSDoc comments</li>
                    <li><strong>Test thoroughly</strong> - Write unit tests for plugin logic</li>
                </ul>

                <h2>TypeScript Plugin Example</h2>
                <CodeBlock code={`import type { Plugin, RequestConfig, Response } from 'fastclient';

interface TimingPluginOptions {
  logToConsole?: boolean;
  threshold?: number;
}

export function timingPlugin(options: TimingPluginOptions = {}): Plugin {
  const { logToConsole = true, threshold = 1000 } = options;
  
  return {
    name: 'timing',
    
    onRequest: (config: RequestConfig): RequestConfig => {
      config.metadata = config.metadata || {};
      config.metadata.startTime = performance.now();
      return config;
    },
    
    onResponse: (response: Response): Response => {
      const duration = performance.now() - response.config.metadata.startTime;
      
      if (logToConsole && duration > threshold) {
        console.warn(\`Slow request: \${response.config.url} took \${duration}ms\`);
      }
      
      response.timing = { duration };
      return response;
    }
  };
}`} />
            </DocLayout>
        );
    }

    return null;
}

function LifecycleStep({ number, title, description, color }: { number: number; title: string; description: string; color: string }) {
    const colorClasses = {
        violet: 'bg-violet-100 dark:bg-violet-900/30 border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-300',
        purple: 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300',
        fuchsia: 'bg-fuchsia-100 dark:bg-fuchsia-900/30 border-fuchsia-300 dark:border-fuchsia-700 text-fuchsia-700 dark:text-fuchsia-300',
        pink: 'bg-pink-100 dark:bg-pink-900/30 border-pink-300 dark:border-pink-700 text-pink-700 dark:text-pink-300',
        red: 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300',
    }[color];

    return (
        <div className="flex items-center gap-4">
            <div className={`shrink-0 w-8 h-8 rounded-full border-2 ${colorClasses} flex items-center justify-center font-medium`}>
                {number}
            </div>
            <div className={`flex-1 p-4 rounded-lg border ${colorClasses}`}>
                <div className="font-medium mb-1">{title}</div>
                <div className="text-sm opacity-80">{description}</div>
            </div>
        </div>
    );
}
