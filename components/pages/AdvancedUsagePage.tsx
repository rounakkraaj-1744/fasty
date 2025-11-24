"use client"

import { DocLayout } from '../layout/DocLayout';
import { CodeBlock } from '@/components/CodeBlock';

interface AdvancedUsagePageProps {
  pageId: string;  // Changed from PageId type to string
}

export function AdvancedUsagePage({ pageId }: AdvancedUsagePageProps) {
  if (pageId === 'custom-transports') {
    return (
      <DocLayout 
        title="Custom transports"
        description="Implement your own transport layer"
      >
        <h2>Transport Interface</h2>
        <CodeBlock code={`interface Transport {
  request(config: RequestConfig): Promise<Response>;
}`} />

        <h2>Custom Transport Example</h2>
        <CodeBlock code={`const customTransport = {
  async request(config) {
    const url = new URL(config.url, config.baseURL);
    
    // Your custom HTTP logic
    const response = await yourHttpClient({
      method: config.method,
      url: url.toString(),
      headers: config.headers,
      body: config.data
    });
    
    return {
      data: response.body,
      status: response.statusCode,
      statusText: response.statusMessage,
      headers: response.headers,
      config
    };
  }
};

const client = new fasty({
  transport: customTransport
});`} />
      </DocLayout>
    );
  }

  if (pageId === 'interceptors') {
    return (
      <DocLayout 
        title="Request interceptors"
        description="Intercept and modify requests"
      >
        <h2>Using Plugins as Interceptors</h2>
        <p>
          fasty uses plugins for interceptor functionality:
        </p>

        <CodeBlock code={`const interceptorPlugin = () => ({
  name: 'interceptor',
  
  // Request interceptor
  onRequest: (config) => {
    console.log('Request:', config.method, config.url);
    config.headers['X-Request-Time'] = Date.now();
    return config;
  },
  
  // Response interceptor
  onResponse: (response) => {
    console.log('Response:', response.status);
    return response;
  },
  
  // Error interceptor
  onError: (error) => {
    console.error('Error:', error.message);
    throw error;
  }
});

const client = new fasty({
  plugins: [interceptorPlugin()]
});`} />

        <h2>Request Transformation</h2>
        <CodeBlock code={`const transformPlugin = () => ({
  onRequest: (config) => {
    // Transform all POST data to snake_case
    if (config.method === 'POST' && config.data) {
      config.data = toSnakeCase(config.data);
    }
    return config;
  },
  
  onResponse: (response) => {
    // Transform all responses to camelCase
    if (response.data) {
      response.data = toCamelCase(response.data);
    }
    return response;
  }
});`} />
      </DocLayout>
    );
  }

  if (pageId === 'streaming') {
    return (
      <DocLayout 
        title="Response streaming"
        description="Handle streaming responses"
      >
        <h2>Stream Response</h2>
        <CodeBlock code={`const response = await client.get('/large-file', {
  responseType: 'stream'
});

// response.data is a ReadableStream
const reader = response.data.getReader();

while (true) {
  const { done, value } = await reader.read();
  
  if (done) break;
  
  // Process chunk
  console.log('Received chunk:', value);
}`} />

        <h2>Download with Progress</h2>
        <CodeBlock code={`const response = await client.get('/file.zip', {
  responseType: 'stream',
  onDownloadProgress: (progress) => {
    console.log(\`Downloaded: \${progress.loaded} / \${progress.total}\`);
    console.log(\`Progress: \${progress.percent}%\`);
  }
});`} />
      </DocLayout>
    );
  }

  if (pageId === 'batching') {
    return (
      <DocLayout 
        title="Batching & parallel requests"
        description="Optimize multiple requests"
      >
        <h2>Parallel Requests</h2>
        <CodeBlock code={`// Execute requests in parallel
const [users, posts, comments] = await Promise.all([
  client.get('/users'),
  client.get('/posts'),
  client.get('/comments')
]);`} />

        <h2>Batch Requests</h2>
        <CodeBlock code={`// Send multiple requests in a single batch
const results = await client.batch([
  { method: 'GET', url: '/users/1' },
  { method: 'GET', url: '/users/2' },
  { method: 'POST', url: '/posts', data: { title: 'New Post' } }
]);`} />

        <h2>Concurrency Limiting</h2>
        <CodeBlock code={`import { concurrencyPlugin } from 'fasty/plugins';

const client = new fasty({
  plugins: [
    concurrencyPlugin({ maxConcurrent: 5 })
  ]
});

// Only 5 requests execute simultaneously
const requests = Array.from({ length: 100 }, (_, i) =>
  client.get(\`/users/\${i}\`)
);

await Promise.all(requests);`} />
      </DocLayout>
    );
  }

  if (pageId === 'circuit-breaker') {
    return (
      <DocLayout 
        title="Circuit breaker pattern"
        description="Protect your app from cascading failures"
      >
        <h2>Circuit Breaker Plugin</h2>
        <CodeBlock code={`import { circuitBreakerPlugin } from 'fasty/plugins';

const client = new fasty({
  plugins: [
    circuitBreakerPlugin({
      threshold: 5,        // Open after 5 failures
      timeout: 60000,      // Try again after 60s
      monitoringPeriod: 10000  // Track failures in 10s window
    })
  ]
});

// Circuit automatically opens after threshold
// Subsequent requests fail fast without hitting server
// Circuit closes after timeout period`} />

        <h2>States</h2>
        <ul>
          <li><strong>Closed</strong> - Normal operation, requests go through</li>
          <li><strong>Open</strong> - Too many failures, requests fail immediately</li>
          <li><strong>Half-Open</strong> - Testing if service recovered</li>
        </ul>
      </DocLayout>
    );
  }

  if (pageId === 'react-usage') {
    return (
      <DocLayout 
        title="Using with React"
        description="Best practices for React integration"
      >
        <h2>Create a Client Instance</h2>
        <CodeBlock code={`// src/lib/api.ts
import { fasty } from 'fasty';
import { retryPlugin, cachePlugin } from 'fasty/plugins';

export const apiClient = new fasty({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  plugins: [
    retryPlugin({ retries: 3 }),
    cachePlugin({ ttl: 60000 })
  ]
});`} />

        <h2>Custom Hook</h2>
        <CodeBlock code={`// src/hooks/useApi.ts
import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api';

export function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        const result = await apiClient.get<T>(url);
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}`} />

        <h2>Usage in Component</h2>
        <CodeBlock code={`import { useApi } from './hooks/useApi';

interface User {
  id: number;
  name: string;
  email: string;
}

function UserProfile({ userId }: { userId: number }) {
  const { data, loading, error } = useApi<User>(\`/users/\${userId}\`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  );
}`} />

        <h2>With TanStack Query</h2>
        <CodeBlock code={`import { useQuery } from '@tanstack/react-query';
import { apiClient } from './lib/api';

function useUser(userId: number) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => apiClient.get<User>(\`/users/\${userId}\`)
  });
}

function UserProfile({ userId }: { userId: number }) {
  const { data, isLoading, error } = useUser(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data.name}</div>;
}`} />
      </DocLayout>
    );
  }

  if (pageId === 'node-usage') {
    return (
      <DocLayout 
        title="Using with Node server frameworks"
        description="Server-side fasty usage"
      >
        <h2>Express</h2>
        <CodeBlock code={`import express from 'express';
import { fasty } from 'fasty';

const app = express();
const apiClient = new fasty({
  baseURL: 'https://api.external.com',
  timeout: 5000
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await apiClient.get(\`/users/\${req.params.id}\`);
    res.json(user);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

app.listen(3000);`} />

        <h2>Next.js API Route</h2>
        <CodeBlock code={`// pages/api/users/[id].ts
import { fasty } from 'fasty';
import type { NextApiRequest, NextApiResponse } from 'next';

const client = new fasty({
  baseURL: process.env.API_URL
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await client.get(\`/users/\${req.query.id}\`);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}`} />

        <h2>Fastify</h2>
        <CodeBlock code={`import Fastify from 'fastify';
import { fasty } from 'fasty';

const fastify = Fastify();
const apiClient = new fasty({
  baseURL: 'https://api.external.com'
});

fastify.get('/users/:id', async (request, reply) => {
  const user = await apiClient.get(\`/users/\${request.params.id}\`);
  return user;
});

fastify.listen({ port: 3000 });`} />
      </DocLayout>
    );
  }

  return null;
}
