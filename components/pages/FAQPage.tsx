"use client"

import { DocLayout } from '../layout/DocLayout';
import { CodeBlock } from '@/components/CodeBlock';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQPage() {
  return (
    <DocLayout
      title="FAQ"
      description="Frequently asked questions about fasty"
    >
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Why not axios?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">
              Axios is a great library, but fasty offers several advantages:
            </p>
            <ul className="space-y-2">
              <li><strong>Smaller bundle size</strong> - 8.2 KB vs 13.4 KB gzipped</li>
              <li><strong>Better Node.js performance</strong> - Automatic keep-alive with connection pooling</li>
              <li><strong>Edge runtime support</strong> - Works in Cloudflare Workers, Vercel Edge, etc.</li>
              <li><strong>Modern plugin system</strong> - More flexible than interceptors</li>
              <li><strong>TypeScript-first</strong> - Better type inference and no need for @types packages</li>
              <li><strong>HTTP/2 support</strong> - Native multiplexing in Node.js</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Is this just fetch?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">
              No, fasty is much more than a fetch wrapper:
            </p>
            <ul className="space-y-2">
              <li><strong>Plugin system</strong> - Retry, caching, auth, and custom plugins</li>
              <li><strong>Keep-alive in Node</strong> - Automatic connection pooling for better performance</li>
              <li><strong>Better error handling</strong> - Consistent error objects with status codes</li>
              <li><strong>Request/response interceptors</strong> - Via the plugin system</li>
              <li><strong>TypeScript integration</strong> - Full type safety for requests and responses</li>
              <li><strong>Convenient API</strong> - Simpler method signatures than raw fetch</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Is the core tree-shakeable?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">
              Yes! fasty is fully tree-shakeable. When using ES modules, your bundler will only include
              the parts you actually use.
            </p>
            <CodeBlock code={`// Only imports what you use
import { fasty } from 'fasty';
import { retryPlugin } from 'fasty/plugins';

// Unused plugins won't be in your bundle
const client = new fasty({
  plugins: [retryPlugin()]
});`} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Can I add interceptors?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">
              Yes! fasty uses a plugin system that's more powerful than traditional interceptors:
            </p>
            <CodeBlock code={`const interceptorPlugin = () => ({
  onRequest: (config) => {
    // Modify request before it's sent
    config.headers['X-Custom'] = 'value';
    return config;
  },
  
  onResponse: (response) => {
    // Process response before it's returned
    console.log('Response:', response.status);
    return response;
  },
  
  onError: (error) => {
    // Handle errors
    console.error('Request failed:', error);
    throw error;
  }
});

const client = new fasty({
  plugins: [interceptorPlugin()]
});`} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>Does it work with TypeScript?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">
              Yes! fasty is written in TypeScript and includes full type definitions.
              No @types package needed.
            </p>
            <CodeBlock code={`interface User {
  id: number;
  name: string;
  email: string;
}

// Fully typed response
const user = await client.get<User>('/users/123');

// TypeScript knows user.name is a string
console.log(user.name.toUpperCase());`} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>How do I handle authentication?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">
              Use the built-in auth plugin or create a custom one:
            </p>
            <CodeBlock code={`import { authPlugin } from 'fasty/plugins';

// Option 1: Built-in auth plugin
const client = new fasty({
  plugins: [
    authPlugin({
      getToken: async () => localStorage.getItem('token')
    })
  ]
});

// Option 2: Custom auth plugin
const customAuthPlugin = () => ({
  onRequest: async (config) => {
    const token = await getAuthToken();
    config.headers['Authorization'] = \`Bearer \${token}\`;
    return config;
  },
  
  onError: async (error) => {
    // Refresh token on 401
    if (error.status === 401) {
      const newToken = await refreshToken();
      error.config.headers['Authorization'] = \`Bearer \${newToken}\`;
      return client.request(error.config);
    }
    throw error;
  }
});`} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>What about CORS?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">
              fasty handles CORS the same way as fetch. Enable credentials if needed:
            </p>
            <CodeBlock code={`const client = new fasty({
  baseURL: 'https://api.example.com',
  withCredentials: true  // Include cookies in CORS requests
});

// Or per-request
await client.get('/data', {
  withCredentials: true
});`} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8">
          <AccordionTrigger>Can I cancel requests?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">
              Yes, use AbortController:
            </p>
            <CodeBlock code={`const controller = new AbortController();

// Start request
const promise = client.get('/slow-endpoint', {
  signal: controller.signal
});

// Cancel it
controller.abort();

try {
  await promise;
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request cancelled');
  }
}`} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-9">
          <AccordionTrigger>How do I mock responses for testing?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">
              Use a custom transport or mocking plugin:
            </p>
            <CodeBlock code={`// Option 1: Custom transport
const mockTransport = {
  async request(config) {
    return {
      data: { id: 123, name: 'Mock User' },
      status: 200,
      statusText: 'OK',
      headers: new Headers()
    };
  }
};

const client = new fasty({ transport: mockTransport });

// Option 2: Mocking plugin
const mockPlugin = (mocks) => ({
  onRequest: (config) => {
    const mock = mocks[config.url];
    if (mock) {
      return Promise.reject({
        response: mock,
        isMocked: true
      });
    }
    return config;
  }
});`} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-10">
          <AccordionTrigger>Does it support file uploads?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">
              Yes, use FormData:
            </p>
            <CodeBlock code={`const formData = new FormData();
formData.append('file', file);
formData.append('name', 'my-file.pdf');

const result = await client.post('/upload', formData);

// With progress tracking
const result = await client.post('/upload', formData, {
  onUploadProgress: (progress) => {
    console.log(\`Uploaded: \${progress.percent}%\`);
  }
});`} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </DocLayout>
  );
}
