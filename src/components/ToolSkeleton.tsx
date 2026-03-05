import { motion } from 'motion/react';

export function ToolSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm animate-pulse">
      <div className="aspect-video bg-slate-100 dark:bg-slate-900" />
      <div className="p-6 space-y-4">
        <div className="flex justify-between">
          <div className="h-3 w-16 bg-slate-100 dark:bg-slate-700 rounded" />
          <div className="h-3 w-10 bg-slate-100 dark:bg-slate-700 rounded" />
        </div>
        <div className="h-5 w-3/4 bg-slate-100 dark:bg-slate-700 rounded" />
        <div className="space-y-2">
          <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded" />
          <div className="h-3 w-5/6 bg-slate-100 dark:bg-slate-700 rounded" />
        </div>
        <div className="flex justify-between pt-2">
          <div className="h-4 w-20 bg-slate-100 dark:bg-slate-700 rounded" />
          <div className="h-8 w-8 bg-slate-100 dark:bg-slate-700 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
