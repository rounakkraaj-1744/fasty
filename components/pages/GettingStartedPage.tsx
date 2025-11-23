"use client"

import { DocLayout } from '../layout/DocLayout';
import { CodeBlock } from '@/components/CodeBlock';

interface GettingStartedPageProps {
    pageId: string;  // Changed from PageId to string
}

export function GettingStartedPage({ pageId }: GettingStartedPageProps) {
    if (pageId === 'quick-start') {
        return (
            <DocLayout
                title="Quick start"
                description="Make your first request with FastClient"
            >
                <h2>Create a client</h2>
                <p>
                    First, import and create a FastClient instance:
                </p>

                <CodeBlock code={`import { FastClient } from 'fastclient';

const client = new FastClient({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});`} />

                <h2>Make a GET request</h2>
                <CodeBlock code={`// Simple GET request
const users = await client.get('/users');

// GET with query parameters
const filteredUsers = await client.get('/users', {
  params: {
    role: 'admin',
    limit: 10
  }
});

// GET with type safety
interface User {
  id: number;
  name: string;
  email: string;
}

const user = await client.get<User>('/users/123');
console.log(user.name); // TypeScript knows this is a string`} />

                <h2>Make a POST request</h2>
                <CodeBlock code={`// POST with JSON body
const newUser = await client.post('/users', {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin'
});

// POST with custom headers
const result = await client.post('/api/data', 
  { key: 'value' },
  {
    headers: {
      'X-Custom-Header': 'custom-value'
    }
  }
);`} />

                <h2>Handle responses</h2>
                <CodeBlock code={`const response = await client.get('/users/123');

// Response is automatically parsed based on Content-Type
console.log(response); // { id: 123, name: 'John Doe', email: '...' }

// Access response metadata
console.log(response.status);      // 200
console.log(response.statusText);  // "OK"
console.log(response.headers);     // Headers object`} />

                <h2>That's it!</h2>
                <p>
                    You've made your first requests with FastClient. Continue reading to learn about error handling,
                    timeouts, and more advanced features.
                </p>
            </DocLayout>
        );
    }

    if (pageId === 'basic-requests') {
        return (
            <DocLayout
                title="Basic GET/POST requests"
                description="Learn how to make different types of HTTP requests"
            >
                <h2>GET Requests</h2>
                <p>
                    GET requests are used to retrieve data from a server.
                </p>

                <CodeBlock code={`// Basic GET
const data = await client.get('/endpoint');

// GET with query parameters
const filtered = await client.get('/users', {
  params: {
    role: 'admin',
    status: 'active',
    page: 1,
    limit: 20
  }
});
// Requests: /users?role=admin&status=active&page=1&limit=20

// GET with custom headers
const data = await client.get('/protected', {
  headers: {
    'Authorization': 'Bearer token123',
    'X-API-Key': 'key123'
  }
});`} />

                <h2>POST Requests</h2>
                <p>
                    POST requests are used to send data to a server.
                </p>

                <CodeBlock code={`// POST with JSON body (default)
const user = await client.post('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// POST with form data
const formData = new FormData();
formData.append('file', file);
formData.append('name', 'document.pdf');

const upload = await client.post('/upload', formData);

// POST with URL-encoded data
const result = await client.post('/form', 
  'name=John&email=john@example.com',
  {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
);`} />

                <h2>PUT Requests</h2>
                <p>
                    PUT requests are used to update existing resources.
                </p>

                <CodeBlock code={`// Update entire resource
const updated = await client.put('/users/123', {
  name: 'Jane Doe',
  email: 'jane@example.com',
  role: 'admin'
});`} />

                <h2>PATCH Requests</h2>
                <p>
                    PATCH requests are used to partially update resources.
                </p>

                <CodeBlock code={`// Update only specific fields
const patched = await client.patch('/users/123', {
  name: 'Jane Doe'  // Only update name
});`} />

                <h2>DELETE Requests</h2>
                <p>
                    DELETE requests are used to remove resources.
                </p>

                <CodeBlock code={`// Delete a resource
await client.delete('/users/123');

// Delete with query params
await client.delete('/posts', {
  params: {
    olderThan: '2023-01-01'
  }
});`} />

                <h2>Request Configuration</h2>
                <p>
                    All request methods accept an optional configuration object:
                </p>

                <CodeBlock code={`await client.get('/endpoint', {
  params: { key: 'value' },        // Query parameters
  headers: { 'X-Custom': 'value' }, // Custom headers
  timeout: 10000,                   // Request timeout in ms
  signal: abortController.signal,   // AbortSignal for cancellation
  responseType: 'json'              // Expected response type
});`} />
            </DocLayout>
        );
    }

    if (pageId === 'error-handling') {
        return (
            <DocLayout
                title="Error handling"
                description="Learn how to handle errors in FastClient"
            >
                <h2>Basic Error Handling</h2>
                <p>
                    FastClient throws errors for failed requests. Use try/catch to handle them:
                </p>

                <CodeBlock code={`try {
  const user = await client.get('/users/123');
  console.log(user);
} catch (error) {
  console.error('Request failed:', error.message);
}`} />

                <h2>HTTP Status Errors</h2>
                <p>
                    Check the error status code to handle different types of errors:
                </p>

                <CodeBlock code={`try {
  const data = await client.get('/api/data');
} catch (error) {
  if (error.status === 404) {
    console.log('Resource not found');
  } else if (error.status === 401) {
    console.log('Unauthorized - please log in');
  } else if (error.status === 403) {
    console.log('Forbidden - insufficient permissions');
  } else if (error.status >= 500) {
    console.log('Server error - please try again later');
  } else {
    console.log('Request failed:', error.message);
  }
}`} />

                <h2>Error Object Properties</h2>
                <p>
                    FastClient errors include useful properties:
                </p>

                <CodeBlock code={`try {
  await client.post('/api/create', data);
} catch (error) {
  console.log(error.message);     // Error message
  console.log(error.status);      // HTTP status code (404, 500, etc.)
  console.log(error.statusText);  // Status text ("Not Found", etc.)
  console.log(error.data);        // Response body (if available)
  console.log(error.headers);     // Response headers
  console.log(error.config);      // Original request config
}`} />

                <h2>Network Errors</h2>
                <p>
                    Network errors (no internet, DNS failure, etc.) can be detected:
                </p>

                <CodeBlock code={`try {
  await client.get('/endpoint');
} catch (error) {
  if (!error.status) {
    // Network error - no response received
    console.log('Network error:', error.message);
  }
}`} />

                <h2>Timeout Errors</h2>
                <p>
                    Timeout errors occur when a request takes too long:
                </p>

                <CodeBlock code={`try {
  await client.get('/slow-endpoint', { timeout: 5000 });
} catch (error) {
  if (error.message.includes('timeout')) {
    console.log('Request timed out');
  }
}`} />

                <h2>Global Error Handler</h2>
                <p>
                    You can create a global error handler using a plugin:
                </p>

                <CodeBlock code={`import { FastClient } from 'fastclient';

const errorHandlerPlugin = () => ({
  onError: async (error) => {
    // Log all errors
    console.error('API Error:', error);
    
    // Send to error tracking service
    // trackError(error);
    
    // Transform error or rethrow
    throw error;
  }
});

const client = new FastClient({
  baseURL: 'https://api.example.com',
  plugins: [errorHandlerPlugin()]
});`} />

                <h2>Retry on Error</h2>
                <p>
                    Use the retry plugin to automatically retry failed requests:
                </p>

                <CodeBlock code={`import { retryPlugin } from 'fastclient/plugins';

const client = new FastClient({
  plugins: [
    retryPlugin({
      retries: 3,
      retryOnStatus: [500, 502, 503, 504],
      backoff: 'exponential'
    })
  ]
});

// Automatically retries up to 3 times on 5xx errors
const data = await client.get('/unstable-endpoint');`} />
            </DocLayout>
        );
    }

    if (pageId === 'timeouts') {
        return (
            <DocLayout
                title="Timeouts"
                description="Configure request timeouts"
            >
                <h2>Global Timeout</h2>
                <p>
                    Set a default timeout for all requests when creating the client:
                </p>

                <CodeBlock code={`const client = new FastClient({
  baseURL: 'https://api.example.com',
  timeout: 5000  // 5 seconds for all requests
});`} />

                <h2>Per-Request Timeout</h2>
                <p>
                    Override the global timeout for specific requests:
                </p>

                <CodeBlock code={`// This request has a 10 second timeout
const data = await client.get('/slow-endpoint', {
  timeout: 10000
});

// This request has a 1 second timeout
const fast = await client.get('/fast-endpoint', {
  timeout: 1000
});`} />

                <h2>No Timeout</h2>
                <p>
                    Set timeout to 0 or Infinity to disable timeouts:
                </p>

                <CodeBlock code={`// Never timeout
const data = await client.get('/long-running', {
  timeout: 0
});`} />

                <h2>Handling Timeout Errors</h2>
                <CodeBlock code={`try {
  const data = await client.get('/endpoint', { timeout: 3000 });
} catch (error) {
  if (error.message.includes('timeout')) {
    console.log('Request took longer than 3 seconds');
    // Retry with longer timeout or handle gracefully
  }
}`} />

                <h2>Manual Cancellation</h2>
                <p>
                    Use AbortController for manual request cancellation:
                </p>

                <CodeBlock code={`const controller = new AbortController();

// Start request
const promise = client.get('/endpoint', {
  signal: controller.signal
});

// Cancel after 2 seconds
setTimeout(() => {
  controller.abort();
}, 2000);

try {
  const data = await promise;
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request was cancelled');
  }
}`} />

                <h2>Best Practices</h2>
                <ul>
                    <li>Set reasonable timeouts based on expected response times</li>
                    <li>Use shorter timeouts for user-facing requests (2-5 seconds)</li>
                    <li>Use longer timeouts for background operations (10-30 seconds)</li>
                    <li>Always handle timeout errors gracefully</li>
                    <li>Consider using retry plugins for critical requests</li>
                </ul>
            </DocLayout>
        );
    }

    if (pageId === 'json-parsing') {
        return (
            <DocLayout
                title="JSON parsing behavior"
                description="How FastClient handles JSON responses"
            >
                <h2>Automatic JSON Parsing</h2>
                <p>
                    FastClient automatically parses JSON responses based on the <code>Content-Type</code> header:
                </p>

                <CodeBlock code={`// Response has Content-Type: application/json
const data = await client.get('/api/users');
console.log(data); // Already parsed as JavaScript object`} />

                <h2>Type Safety with JSON</h2>
                <p>
                    Use TypeScript generics for type-safe JSON parsing:
                </p>

                <CodeBlock code={`interface User {
  id: number;
  name: string;
  email: string;
}

// Response is typed as User
const user = await client.get<User>('/users/123');

// TypeScript knows these properties exist
console.log(user.name);   // ✓ OK
console.log(user.invalid); // ✗ TypeScript error`} />

                <h2>Handling Non-JSON Responses</h2>
                <p>
                    For non-JSON responses, FastClient returns the raw response:
                </p>

                <CodeBlock code={`// Get plain text
const text = await client.get('/api/text', {
  responseType: 'text'
});

// Get binary data
const buffer = await client.get('/api/file', {
  responseType: 'arraybuffer'
});

// Get blob (for files)
const blob = await client.get('/api/image', {
  responseType: 'blob'
});`} />

                <h2>Custom JSON Parsing</h2>
                <p>
                    Transform JSON responses using a plugin:
                </p>

                <CodeBlock code={`const jsonTransformPlugin = () => ({
  onResponse: async (response) => {
    if (response.data && typeof response.data === 'object') {
      // Transform dates from strings to Date objects
      for (const key in response.data) {
        if (key.endsWith('At') && typeof response.data[key] === 'string') {
          response.data[key] = new Date(response.data[key]);
        }
      }
    }
    return response;
  }
});

const client = new FastClient({
  plugins: [jsonTransformPlugin()]
});

const user = await client.get('/users/123');
console.log(user.createdAt instanceof Date); // true`} />

                <h2>Handling Invalid JSON</h2>
                <CodeBlock code={`try {
  const data = await client.get('/api/endpoint');
} catch (error) {
  if (error.message.includes('JSON')) {
    console.log('Server returned invalid JSON');
    // Handle invalid JSON response
  }
}`} />

                <h2>Response Type Options</h2>
                <div className="my-6 overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <th className="text-left p-3">Type</th>
                                <th className="text-left p-3">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>json</code></td>
                                <td className="p-3">Parse as JSON (default)</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>text</code></td>
                                <td className="p-3">Return as plain text string</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>arraybuffer</code></td>
                                <td className="p-3">Return as ArrayBuffer</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>blob</code></td>
                                <td className="p-3">Return as Blob</td>
                            </tr>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <td className="p-3"><code>stream</code></td>
                                <td className="p-3">Return as ReadableStream</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </DocLayout>
        );
    }
    return null;
}
