"use client"

import Link from 'next/link';
import { ArrowRight, Box, Zap, Layers, Shield, Cpu, Code2 } from 'lucide-react';
import { CodeBlock } from '@/components/CodeBlock';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-xl">
    <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
      <Icon className="text-indigo-600 dark:text-indigo-400" size={24} />
    </div>
    <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

function ComparisonRow({ feature, fastclient, axios, fetch }: { feature: string; fastclient: string; axios: string; fetch: string }) {
  return (
    <tr className="border-b border-slate-200 dark:border-slate-800">
      <td className="p-4 text-slate-600 dark:text-slate-400">{feature}</td>
      <td className="p-4 text-center text-violet-600 dark:text-violet-400">{fastclient}</td>
      <td className="p-4 text-center text-slate-600 dark:text-slate-400">{axios}</td>
      <td className="p-4 text-center text-slate-600 dark:text-slate-400">{fetch}</td>
    </tr>
  );
}

export default function Home() {
  return (
    <>
      <Navbar onMenuClick={() => {}} />
      <div className="min-h-screen bg-slate-50 dark:bg-black">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Abstract Background Shapes */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-200/40 via-slate-100/0 to-transparent dark:from-indigo-900/40 dark:via-slate-950/0 pointer-events-none opacity-50 blur-3xl"></div>

          <div className="container mx-auto px-4 pt-24 pb-32 relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-8 uppercase tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                v1.0.0 Released
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">HTTP Client</span> <br />
                for modern times.
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl leading-relaxed">
                FastClient is a tiny, blazing-fast, plugin-powered HTTP client designed for TypeScript. Zero dependencies. 2KB gzipped.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/docs/quick-start"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30"
                >
                  Get Started
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="https://github.com"
                  target="_blank"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  GitHub
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Code Demo Section */}
        <div className="container mx-auto px-4 -mt-20 relative z-20 mb-24">
          <div className="max-w-3xl mx-auto bg-slate-950 rounded-2xl shadow-2xl border border-slate-800 p-2">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
              </div>
            </div>
            <CodeBlock
              language="typescript"
              code={`import { FastClient, retry, cache } from 'fast-client';

const client = new FastClient({
  baseUrl: 'https://api.startup.com',
  plugins: [
    retry({ maxRetries: 3 }), 
    cache({ ttl: 5000 })
  ]
});

// Fully typed response
const { data } = await client.get<User>('/users/123');
console.log(data.username);`}
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-4 py-24 border-t border-slate-200 dark:border-slate-900">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Everything you need, nothing you don't.</h2>
            <p className="text-slate-600 dark:text-slate-400">Built for the modern stack. FastClient gives you the primitives to build robust API layers without the bloat.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Box}
              title="Tiny Footprint"
              description="Weighing in at under 2KB gzipped, it's 10x smaller than Axios. Perfect for performance-critical apps."
            />
            <FeatureCard
              icon={Layers}
              title="Plugin System"
              description="Compose your client logic. Add Retries, Auth, Logging, or Caching with a simple middleware pipeline."
            />
            <FeatureCard
              icon={Shield}
              title="Type-Safe"
              description="Written in TypeScript for TypeScript. Generics ensure your API responses are strictly typed throughout your app."
            />
            <FeatureCard
              icon={Cpu}
              title="Runtime Agnostic"
              description="Use the same client in Node.js, the Browser, Cloudflare Workers, Deno, and Bun."
            />
            <FeatureCard
              icon={Zap}
              title="Blazing Fast"
              description="Optimized JSON parsing and keep-alive agent pooling in Node.js ensure maximum throughput."
            />
            <FeatureCard
              icon={Code2}
              title="Zero Dependencies"
              description="No dependency hell. Just one focused package that does one thing extremely well."
            />
          </div>
        </div>

        {/* Comparison Table */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-slate-900 dark:text-white">How does it compare?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              FastClient vs popular alternatives
            </p>
          </div>

          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="text-left p-4 text-slate-900 dark:text-white">Feature</th>
                  <th className="text-center p-4 text-slate-900 dark:text-white">FastClient</th>
                  <th className="text-center p-4 text-slate-900 dark:text-white">axios</th>
                  <th className="text-center p-4 text-slate-900 dark:text-white">fetch</th>
                </tr>
              </thead>
              <tbody>
                <ComparisonRow
                  feature="Bundle size (gzipped)"
                  fastclient="8.2 KB"
                  axios="13.4 KB"
                  fetch="0 KB (native)"
                />
                <ComparisonRow
                  feature="Plugin system"
                  fastclient="✓"
                  axios="Interceptors"
                  fetch="✗"
                />
                <ComparisonRow
                  feature="Keep-alive in Node"
                  fastclient="✓ Auto"
                  axios="✓ Manual"
                  fetch="✗"
                />
                <ComparisonRow
                  feature="TypeScript support"
                  fastclient="✓ Native"
                  axios="✓ @types"
                  fetch="✓ Native"
                />
                <ComparisonRow
                  feature="Tree-shakeable"
                  fastclient="✓"
                  axios="Partial"
                  fetch="N/A"
                />
                <ComparisonRow
                  feature="Edge runtime support"
                  fastclient="✓"
                  axios="✗"
                  fetch="✓"
                />
                <ComparisonRow
                  feature="Built-in retry"
                  fastclient="✓ Plugin"
                  axios="3rd party"
                  fetch="✗"
                />
                <ComparisonRow
                  feature="Built-in cache"
                  fastclient="✓ Plugin"
                  axios="3rd party"
                  fetch="✗"
                />
              </tbody>
            </table>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}