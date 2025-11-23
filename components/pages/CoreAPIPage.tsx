"use client"

import { DocLayout } from '../layout/DocLayout';
import { CodeBlock } from '@/components/CodeBlock';

interface CoreAPIPageProps {
    pageId: string;  // Changed from PageId to string
}

export function CoreAPIPage({ pageId }: CoreAPIPageProps) {
    if (pageId === 'constructor') {
        return (
            <DocLayout
                title="FastClient constructor"
                description="Create and configure a FastClient instance"
            >
                <h2>Basic Usage</h2>
                <CodeBlock code={`import { FastClient } from 'fastclient';

const client = new FastClient();`} />

                <h2>With Configuration</h2>
                <CodeBlock code={`const client = new FastClient({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  plugins: [retryPlugin(), cachePlugin()]
});`} />

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
                                <td className="p-3"><code>baseURL</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">string</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">''</td>
                                <td className="p-3">Base URL for all requests</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>timeout</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">number</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">0</td>
                                <td className="p-3">Request timeout in milliseconds</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>headers</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">object</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">{ }</td>
                                <td className="p-3">Default headers for all requests</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>plugins</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">Plugin[]</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">[]</td>
                                <td className="p-3">Array of plugins to use</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>transport</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">Transport</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">auto</td>
                                <td className="p-3">Custom transport layer</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>Multiple Instances</h2>
                <p>
                    Create multiple clients for different APIs:
                </p>

                <CodeBlock code={`const apiClient = new FastClient({
  baseURL: 'https://api.example.com',
  headers: { 'Authorization': 'Bearer token1' }
});

const authClient = new FastClient({
  baseURL: 'https://auth.example.com',
  timeout: 10000
});`} />
            </DocLayout>
        );
    }

    if (pageId === 'get-method') {
        return (
            <DocLayout
                title="client.get()"
                description="Make GET requests"
            >
                <h2>Syntax</h2>
                <CodeBlock code={`client.get<T>(url: string, options?: RequestOptions): Promise<T>`} />

                <h2>Basic Usage</h2>
                <CodeBlock code={`const data = await client.get('/users');`} />

                <h2>With Query Parameters</h2>
                <CodeBlock code={`const users = await client.get('/users', {
  params: {
    role: 'admin',
    status: 'active',
    page: 1,
    limit: 20
  }
});
// Requests: /users?role=admin&status=active&page=1&limit=20`} />

                <h2>With Type Safety</h2>
                <CodeBlock code={`interface User {
  id: number;
  name: string;
  email: string;
}

const user = await client.get<User>('/users/123');
console.log(user.name); // TypeScript knows this is a string`} />

                <h2>With Custom Headers</h2>
                <CodeBlock code={`const data = await client.get('/protected', {
  headers: {
    'Authorization': 'Bearer token123',
    'X-API-Key': 'key123'
  }
});`} />

                <h2>With Timeout</h2>
                <CodeBlock code={`const data = await client.get('/slow-endpoint', {
  timeout: 10000 // 10 seconds
});`} />
            </DocLayout>
        );
    }

    if (pageId === 'post-method') {
        return (
            <DocLayout
                title="client.post()"
                description="Make POST requests"
            >
                <h2>Syntax</h2>
                <CodeBlock code={`client.post<T>(url: string, data?: any, options?: RequestOptions): Promise<T>`} />

                <h2>Basic Usage</h2>
                <CodeBlock code={`const newUser = await client.post('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});`} />

                <h2>With Type Safety</h2>
                <CodeBlock code={`interface CreateUserRequest {
  name: string;
  email: string;
  role?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const userData: CreateUserRequest = {
  name: 'John Doe',
  email: 'john@example.com'
};

const newUser = await client.post<User>('/users', userData);`} />

                <h2>With FormData</h2>
                <CodeBlock code={`const formData = new FormData();
formData.append('file', file);
formData.append('name', 'document.pdf');

const upload = await client.post('/upload', formData);`} />

                <h2>With Custom Headers</h2>
                <CodeBlock code={`const result = await client.post('/api/data', 
  { key: 'value' },
  {
    headers: {
      'X-Custom-Header': 'custom-value'
    }
  }
);`} />
            </DocLayout>
        );
    }

    if (pageId === 'put-method') {
        return (
            <DocLayout
                title="client.put()"
                description="Make PUT requests"
            >
                <h2>Syntax</h2>
                <CodeBlock code={`client.put<T>(url: string, data?: any, options?: RequestOptions): Promise<T>`} />

                <h2>Basic Usage</h2>
                <CodeBlock code={`const updated = await client.put('/users/123', {
  name: 'Jane Doe',
  email: 'jane@example.com',
  role: 'admin'
});`} />

                <h2>Complete Resource Update</h2>
                <p>
                    PUT is typically used to replace an entire resource:
                </p>

                <CodeBlock code={`// Replace the entire user object
const user = await client.put('/users/123', {
  name: 'Jane Doe',
  email: 'jane@example.com',
  role: 'admin',
  status: 'active'
});`} />
            </DocLayout>
        );
    }

    if (pageId === 'delete-method') {
        return (
            <DocLayout
                title="client.delete()"
                description="Make DELETE requests"
            >
                <h2>Syntax</h2>
                <CodeBlock code={`client.delete<T>(url: string, options?: RequestOptions): Promise<T>`} />

                <h2>Basic Usage</h2>
                <CodeBlock code={`await client.delete('/users/123');`} />

                <h2>With Query Parameters</h2>
                <CodeBlock code={`await client.delete('/posts', {
  params: {
    olderThan: '2023-01-01',
    status: 'draft'
  }
});`} />

                <h2>With Response Data</h2>
                <CodeBlock code={`const result = await client.delete<{ deleted: boolean }>('/users/123');
console.log(result.deleted); // true`} />
            </DocLayout>
        );
    }

    if (pageId === 'request-options') {
        return (
            <DocLayout
                title="RequestOptions table"
                description="All available request options"
            >
                <p>
                    Request options can be passed to any request method to customize behavior:
                </p>

                <div className="my-6 overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <th className="text-left p-3">Property</th>
                                <th className="text-left p-3">Type</th>
                                <th className="text-left p-3">Default</th>
                                <th className="text-left p-3">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>params</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">object</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">-</td>
                                <td className="p-3">URL query parameters</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>headers</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">object</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">-</td>
                                <td className="p-3">Custom request headers</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>timeout</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">number</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">0</td>
                                <td className="p-3">Timeout in milliseconds</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>signal</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">AbortSignal</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">-</td>
                                <td className="p-3">AbortSignal for cancellation</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>responseType</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">string</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">'json'</td>
                                <td className="p-3">Expected response type</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>validateStatus</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">function</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">-</td>
                                <td className="p-3">Custom status validation</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>maxRedirects</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">number</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">5</td>
                                <td className="p-3">Max redirect follows</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>withCredentials</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">boolean</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">false</td>
                                <td className="p-3">Include credentials in CORS</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>Examples</h2>
                <CodeBlock code={`// Query parameters
await client.get('/users', {
  params: { role: 'admin', page: 1 }
});

// Custom headers
await client.post('/api/data', data, {
  headers: { 'X-API-Key': 'key123' }
});

// Timeout
await client.get('/slow', {
  timeout: 10000
});

// Abort signal
const controller = new AbortController();
await client.get('/endpoint', {
  signal: controller.signal
});

// Response type
await client.get('/image', {
  responseType: 'blob'
});

// Validate status
await client.get('/endpoint', {
  validateStatus: (status) => status < 500
});`} />
            </DocLayout>
        );
    }

    if (pageId === 'response-structure') {
        return (
            <DocLayout
                title="Response structure"
                description="Understanding the response object"
            >
                <h2>Response Object</h2>
                <p>
                    By default, FastClient returns the parsed response data directly:
                </p>

                <CodeBlock code={`const user = await client.get('/users/123');
console.log(user); // { id: 123, name: 'John', email: '...' }`} />

                <h2>Full Response</h2>
                <p>
                    Access the full response object including metadata:
                </p>

                <CodeBlock code={`const response = await client.get('/users/123', {
  fullResponse: true
});

console.log(response.data);       // Response body
console.log(response.status);     // 200
console.log(response.statusText); // "OK"
console.log(response.headers);    // Headers object
console.log(response.config);     // Request configuration`} />

                <h2>Response Properties</h2>
                <div className="my-6 overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <th className="text-left p-3">Property</th>
                                <th className="text-left p-3">Type</th>
                                <th className="text-left p-3">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>data</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">any</td>
                                <td className="p-3">Response body (parsed)</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>status</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">number</td>
                                <td className="p-3">HTTP status code</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>statusText</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">string</td>
                                <td className="p-3">HTTP status text</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>headers</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">Headers</td>
                                <td className="p-3">Response headers</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>config</code></td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">object</td>
                                <td className="p-3">Request configuration</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>Headers</h2>
                <CodeBlock code={`const response = await client.get('/api/data', {
  fullResponse: true
});

// Get specific header
const contentType = response.headers.get('content-type');

// Check if header exists
const hasAuth = response.headers.has('authorization');

// Iterate headers
response.headers.forEach((value, key) => {
  console.log(\`\${key}: \${value}\`);
});`} />
            </DocLayout>
        );
    }

    return null;
}