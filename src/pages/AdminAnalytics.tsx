import { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer2, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { format, subDays, isSameDay, parseISO } from 'date-fns';

export function AdminAnalytics() {
  const [loading, setLoading] = useState(true);
  const [dailyData, setDailyData] = useState<any[]>([]);
  const [pageData, setPageData] = useState<any[]>([]);
  const [globalStats, setGlobalStats] = useState<any>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Daily Stats (Last 30 days)
      const dailySnap = await getDocs(query(collection(db, 'analytics_daily'), orderBy('date', 'desc'), limit(30)));
      const daily = dailySnap.docs.map(doc => doc.data()).reverse();
      
      // Fill in missing days with 0
      const last30Days = Array.from({ length: 30 }).map((_, i) => {
        const d = subDays(new Date(), i);
        const dateStr = format(d, 'yyyy-MM-dd');
        const existing = daily.find(item => item.date === dateStr);
        return existing || { date: dateStr, views: 0 };
      }).reverse();
      
      setDailyData(last30Days);

      // 2. Fetch Page Stats
      const pagesSnap = await getDocs(query(collection(db, 'analytics_pages'), orderBy('views', 'desc'), limit(10)));
      setPageData(pagesSnap.docs.map(doc => doc.data()));

      // 3. Fetch Global Stats
      const globalSnap = await getDocs(collection(db, 'analytics_global'));
      if (!globalSnap.empty) {
        setGlobalStats(globalSnap.docs[0].data());
      }

    } catch (err) {
      console.error('Failed to fetch analytics', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  const totalViews = dailyData.reduce((sum, d) => sum + (d.views || 0), 0);
  const todayViews = dailyData[dailyData.length - 1]?.views || 0;
  const yesterdayViews = dailyData[dailyData.length - 2]?.views || 0;
  const growth = yesterdayViews === 0 ? 100 : Math.round(((todayViews - yesterdayViews) / yesterdayViews) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time insights into your site's performance.</p>
        </div>
        <button 
          onClick={fetchData}
          className="p-2 text-slate-400 hover:text-purple-600 transition-colors"
          title="Refresh Data"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600">
              <Eye className="w-5 h-5" />
            </div>
            <div className={`flex items-center text-xs font-bold ${growth >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {growth >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
              {Math.abs(growth)}%
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{todayViews.toLocaleString()}</div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Views Today</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{totalViews.toLocaleString()}</div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Views (Last 30 Days)</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {Math.round(totalViews * 0.7).toLocaleString()}
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Est. Unique Visitors</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {globalStats?.totalViews?.toLocaleString() || todayViews.toLocaleString()}
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Total Lifetime Views</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Traffic Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Traffic Overview</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(str) => format(parseISO(str), 'MMM d')}
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                  labelFormatter={(str) => format(parseISO(str), 'MMMM d, yyyy')}
                />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#9333ea" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorViews)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Top Pages</h3>
          <div className="space-y-4">
            {pageData.map((page, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex-1 min-w-0 mr-4">
                  <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {page.path === '/' ? 'Home' : page.path}
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="bg-purple-600 h-full rounded-full" 
                      style={{ width: `${(page.views / pageData[0].views) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-sm font-black text-slate-900 dark:text-white">
                  {page.views.toLocaleString()}
                </div>
              </div>
            ))}
            {pageData.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-sm italic">
                No page data collected yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Daily Traffic Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Page Views</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Growth</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {dailyData.slice().reverse().map((day, i) => {
                const prevDay = dailyData[dailyData.length - 1 - i - 1];
                const dayGrowth = prevDay?.views === 0 ? 100 : Math.round(((day.views - prevDay?.views) / prevDay?.views) * 100);
                
                return (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                      {format(parseISO(day.date), 'EEEE, MMMM d')}
                    </td>
                    <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white">
                      {day.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      {i < dailyData.length - 1 && (
                        <span className={`text-xs font-bold flex items-center ${dayGrowth >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                          {dayGrowth >= 0 ? '+' : ''}{dayGrowth}%
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center px-2 py-1 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                        Live
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
