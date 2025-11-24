import React from 'react';

export const ArchDiagram: React.FC = () => (
    <div className="w-full h-64 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center p-6 my-6">
        <svg viewBox="0 0 600 200" className="w-full h-full max-w-2xl">
            <defs>
                <marker id="head" orient="auto" markerWidth="6" markerHeight="6" refX="5" refY="3">
                    <path d="M0,0 L0,6 L6,3 z" fill="currentColor" className="text-slate-400" />
                </marker>
            </defs>

            {/* Core */}
            <rect x="220" y="20" width="160" height="160" rx="8" fill="none" stroke="currentColor" className="text-primary-500" strokeWidth="2" strokeDasharray="4 4" />
            <text x="300" y="165" textAnchor="middle" className="text-xs fill-slate-500 uppercase tracking-widest font-semibold">fasty Core</text>

            {/* Components */}
            <rect x="50" y="75" width="100" height="50" rx="6" className="fill-white dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600" strokeWidth="2" />
            <text x="100" y="105" textAnchor="middle" className="text-sm font-semibold fill-slate-700 dark:fill-slate-200">App Code</text>

            <rect x="250" y="50" width="100" height="40" rx="6" className="fill-indigo-100 dark:fill-indigo-900/30 stroke-indigo-400" strokeWidth="2" />
            <text x="300" y="75" textAnchor="middle" className="text-sm font-semibold fill-indigo-700 dark:fill-indigo-300">Plugins</text>

            <rect x="250" y="105" width="100" height="40" rx="6" className="fill-emerald-100 dark:fill-emerald-900/30 stroke-emerald-400" strokeWidth="2" />
            <text x="300" y="130" textAnchor="middle" className="text-sm font-semibold fill-emerald-700 dark:fill-emerald-300">Transport</text>

            <rect x="450" y="75" width="100" height="50" rx="6" className="fill-white dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600" strokeWidth="2" />
            <text x="500" y="105" textAnchor="middle" className="text-sm font-semibold fill-slate-700 dark:fill-slate-200">Network</text>

            {/* Arrows */}
            <path d="M150 100 L240 100" stroke="currentColor" className="text-slate-400" strokeWidth="2" markerEnd="url(#head)" />
            <path d="M360 100 L440 100" stroke="currentColor" className="text-slate-400" strokeWidth="2" markerEnd="url(#head)" />
        </svg>
    </div>
);

export const PluginPipelineDiagram: React.FC = () => (
    <div className="w-full bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 p-8 my-6 flex flex-col md:flex-row items-center justify-between gap-4 overflow-x-auto">
        <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">req</div>
            <span className="text-xs font-mono text-slate-500">Init</span>
        </div>

        <div className="h-0.5 w-8 bg-slate-300 dark:bg-slate-700"></div>

        <div className="flex flex-col gap-2 p-3 border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-center">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Pre-Request</span>
            <div className="flex gap-2">
                <div className="px-3 py-1 bg-white dark:bg-slate-800 shadow-sm rounded border border-indigo-100 dark:border-indigo-900 text-xs">Auth</div>
                <div className="px-3 py-1 bg-white dark:bg-slate-800 shadow-sm rounded border border-indigo-100 dark:border-indigo-900 text-xs">Cache (Get)</div>
            </div>
        </div>

        <div className="h-0.5 w-8 bg-slate-300 dark:bg-slate-700"></div>

        <div className="flex flex-col items-center gap-2 p-3 border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Transport</span>
            <span className="text-xs font-mono">Network Call</span>
        </div>

        <div className="h-0.5 w-8 bg-slate-300 dark:bg-slate-700"></div>

        <div className="flex flex-col gap-2 p-3 border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-center">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Post-Response</span>
            <div className="flex gap-2">
                <div className="px-3 py-1 bg-white dark:bg-slate-800 shadow-sm rounded border border-indigo-100 dark:border-indigo-900 text-xs">Retry (if err)</div>
                <div className="px-3 py-1 bg-white dark:bg-slate-800 shadow-sm rounded border border-indigo-100 dark:border-indigo-900 text-xs">Cache (Set)</div>
            </div>
        </div>

        <div className="h-0.5 w-8 bg-slate-300 dark:bg-slate-700"></div>

        <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">res</div>
            <span className="text-xs font-mono text-slate-500">Done</span>
        </div>
    </div>
);