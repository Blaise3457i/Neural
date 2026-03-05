import { motion } from 'motion/react';

export function BlogSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm animate-pulse">
      <div className="aspect-[16/10] bg-slate-100 dark:bg-slate-900" />
      <div className="p-6 space-y-4">
        <div className="h-3 w-24 bg-slate-100 dark:bg-slate-700 rounded" />
        <div className="h-6 w-full bg-slate-100 dark:bg-slate-700 rounded" />
        <div className="space-y-2">
          <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded" />
          <div className="h-3 w-4/5 bg-slate-100 dark:bg-slate-700 rounded" />
        </div>
        <div className="h-4 w-20 bg-slate-100 dark:bg-slate-700 rounded pt-2" />
      </div>
    </div>
  );
}
