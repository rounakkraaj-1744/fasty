"use client"

import { DocLayout } from '../layout/DocLayout';
import { CodeBlock } from '@/components/CodeBlock';

interface ExamplesPageProps {
  pageId: string;  // Changed from PageId to string
}

export function ExamplesPage({ pageId }: ExamplesPageProps) {
  if (pageId === 'examples-rest') {
    return (
      <DocLayout
        title="Basic REST client"
        description="Complete REST API client example"
      >
        <h2>REST Client Class</h2>
        <CodeBlock code={`import { FastClient } from 'fastclient';
import { retryPlugin, cachePlugin } from 'fastclient/plugins';

export class UserAPI {
  private client: FastClient;

  constructor(baseURL: string, apiKey: string) {
    this.client = new FastClient({
      baseURL,
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      },
      plugins: [
        retryPlugin({ retries: 3 }),
        cachePlugin({ ttl: 60000 })
      ]
    });
  }

  async getUsers(params?: { page?: number; limit?: number }) {
    return this.client.get('/users', { params });
  }

  async getUser(id: number) {
    return this.client.get(\`/users/\${id}\`);
  }

  async createUser(data: { name: string; email: string }) {
    return this.client.post('/users', data);
  }

  async updateUser(id: number, data: Partial<{ name: string; email: string }>) {
    return this.client.patch(\`/users/\${id}\`, data);
  }

  async deleteUser(id: number) {
    return this.client.delete(\`/users/\${id}\`);
  }
}

// Usage
const api = new UserAPI('https://api.example.com', 'your-api-key');

const users = await api.getUsers({ page: 1, limit: 10 });
const user = await api.getUser(123);
const newUser = await api.createUser({ name: 'John', email: 'john@example.com' });`} />
      </DocLayout>
    );
  }

  if (pageId === 'examples-github') {
    return (
      <DocLayout
        title="GitHub API wrapper"
        description="Type-safe GitHub API client"
      >
        <h2>GitHub Client</h2>
        <CodeBlock code={`import { FastClient } from 'fastclient';

interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  bio: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
}

export class GitHubClient {
  private client: FastClient;

  constructor(token?: string) {
    this.client = new FastClient({
      baseURL: 'https://api.github.com',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        ...(token && { 'Authorization': \`Bearer \${token}\` })
      }
    });
  }

  async getUser(username: string): Promise<GitHubUser> {
    return this.client.get(\`/users/\${username}\`);
  }

  async getUserRepos(username: string): Promise<GitHubRepo[]> {
    return this.client.get(\`/users/\${username}/repos\`, {
      params: { sort: 'updated', per_page: 100 }
    });
  }

  async searchRepos(query: string, page = 1): Promise<{ items: GitHubRepo[] }> {
    return this.client.get('/search/repositories', {
      params: { q: query, page, per_page: 30 }
    });
  }

  async getRepo(owner: string, repo: string): Promise<GitHubRepo> {
    return this.client.get(\`/repos/\${owner}/\${repo}\`);
  }

  async starRepo(owner: string, repo: string): Promise<void> {
    await this.client.put(\`/user/starred/\${owner}/\${repo}\`);
  }
}

// Usage
const github = new GitHubClient('your-github-token');

const user = await github.getUser('octocat');
const repos = await github.getUserRepos('octocat');
const results = await github.searchRepos('fastclient');`} />
      </DocLayout>
    );
  }

  if (pageId === 'examples-nextjs') {
    return (
      <DocLayout
        title="Using in Next.js"
        description="Next.js integration examples"
      >
        <h2>API Client Setup</h2>
        <CodeBlock code={`// lib/api.ts
import { FastClient } from 'fastclient';
import { cachePlugin } from 'fastclient/plugins';

export const apiClient = new FastClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  plugins: [
    cachePlugin({ ttl: 60000 })
  ]
});`} />

        <h2>Server Component (App Router)</h2>
        <CodeBlock code={`// app/users/page.tsx
import { apiClient } from '@/lib/api';

interface User {
  id: number;
  name: string;
  email: string;
}

export default async function UsersPage() {
  const users = await apiClient.get<User[]>('/users');

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}`} />

        <h2>Client Component</h2>
        <CodeBlock code={`// app/users/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';

export default function UserPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get(\`/users/\${params.id}\`)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not found</div>;

  return <div>{user.name}</div>;
}`} />

        <h2>API Route</h2>
        <CodeBlock code={`// app/api/users/route.ts
import { FastClient } from 'fastclient';
import { NextResponse } from 'next/server';

const client = new FastClient({
  baseURL: process.env.API_URL
});

export async function GET() {
  try {
    const users = await client.get('/users');
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}`} />
      </DocLayout>
    );
  }

  if (pageId === 'examples-workers') {
    return (
      <DocLayout
        title="Using in Cloudflare Workers"
        description="Edge runtime examples"
      >
        <h2>Cloudflare Worker</h2>
        <CodeBlock code={`import { FastClient } from 'fastclient';

const apiClient = new FastClient({
  baseURL: 'https://api.example.com'
});

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    if (url.pathname === '/users') {
      try {
        const users = await apiClient.get('/users');
        return new Response(JSON.stringify(users), {
          headers: { 'content-type': 'application/json' }
        });
      } catch (error) {
        return new Response(error.message, { status: 500 });
      }
    }
    
    return new Response('Not found', { status: 404 });
  }
};`} />

        <h2>With Environment Variables</h2>
        <CodeBlock code={`export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const client = new FastClient({
      baseURL: env.API_URL,
      headers: {
        'Authorization': \`Bearer \${env.API_TOKEN}\`
      }
    });

    const data = await client.get('/data');
    return Response.json(data);
  }
};`} />

        <h2>Vercel Edge Function</h2>
        <CodeBlock code={`import { FastClient } from 'fastclient';

export const config = {
  runtime: 'edge'
};

const client = new FastClient({
  baseURL: process.env.API_URL
});

export default async function handler(request: Request) {
  const data = await client.get('/users');
  
  return new Response(JSON.stringify(data), {
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, max-age=60'
    }
  });
}`} />
      </DocLayout>
    );
  }

  if (pageId === 'examples-node') {
    return (
      <DocLayout
        title="Using in Node with keep-alive"
        description="Optimized Node.js usage"
      >
        <h2>Basic Setup</h2>
        <CodeBlock code={`import { FastClient } from 'fastclient';

const client = new FastClient({
  baseURL: 'https://api.example.com',
  // Keep-alive is enabled by default in Node
});

// Make many requests efficiently
async function fetchUsers() {
  const userIds = Array.from({ length: 100 }, (_, i) => i + 1);
  
  const users = await Promise.all(
    userIds.map(id => client.get(\`/users/\${id}\`))
  );
  
  return users;
}

// All requests reuse connections
const users = await fetchUsers();`} />

        <h2>Custom Agent Configuration</h2>
        <CodeBlock code={`import { FastClient } from 'fastclient';
import https from 'https';

const httpsAgent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 30000,
  maxSockets: 100,
  maxFreeSockets: 10,
  timeout: 60000
});

const client = new FastClient({
  baseURL: 'https://api.example.com',
  httpsAgent
});`} />

        <h2>Bulk Data Fetching</h2>
        <CodeBlock code={`import { FastClient } from 'fastclient';
import { concurrencyPlugin } from 'fastclient/plugins';

const client = new FastClient({
  baseURL: 'https://api.example.com',
  plugins: [
    concurrencyPlugin({ maxConcurrent: 10 })
  ]
});

async function fetchAllData() {
  const requests = [];
  
  // Generate 1000 requests
  for (let i = 0; i < 1000; i++) {
    requests.push(client.get(\`/items/\${i}\`));
  }
  
  // Execute with connection pooling and concurrency limit
  const results = await Promise.all(requests);
  
  return results;
}

const data = await fetchAllData();
console.log(\`Fetched \${data.length} items\`);`} />
      </DocLayout>
    );
  }

  return null;
}
