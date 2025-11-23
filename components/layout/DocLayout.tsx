"use client"

import React from 'react';

interface DocLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function DocLayout({ title, description, children }: DocLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <header className="mb-12 pb-8 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white tracking-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </header>

      {/* Content with improved typography */}
      <article className="prose prose-slate dark:prose-invert max-w-none
        prose-headings:scroll-mt-20
        prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-12 prose-h2:text-slate-900 prose-h2:dark:text-white
        prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-slate-900 prose-h3:dark:text-white
        prose-p:text-base prose-p:leading-7 prose-p:mb-6 prose-p:text-slate-700 prose-p:dark:text-slate-300
        prose-ul:my-6 prose-ul:space-y-2
        prose-li:text-slate-700 prose-li:dark:text-slate-300 prose-li:leading-7
        prose-strong:text-slate-900 prose-strong:dark:text-white prose-strong:font-semibold
        prose-code:text-violet-600 prose-code:dark:text-violet-400 prose-code:bg-slate-100 prose-code:dark:bg-slate-800 
        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800
        prose-a:text-violet-600 prose-a:dark:text-violet-400 prose-a:no-underline hover:prose-a:underline
        prose-table:border-collapse prose-table:w-full
        prose-thead:border-b prose-thead:border-slate-200 prose-thead:dark:border-slate-800
        prose-th:text-left prose-th:p-3 prose-th:font-semibold prose-th:text-slate-900 prose-th:dark:text-white
        prose-td:p-3 prose-td:text-slate-700 prose-td:dark:text-slate-300 prose-td:border-b prose-td:border-slate-200 prose-td:dark:border-slate-800
        prose-ol:my-6 prose-ol:space-y-2
      ">
        {children}
      </article>
    </div>
  );
}
