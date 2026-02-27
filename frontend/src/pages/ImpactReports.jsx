import React from 'react';
import { motion } from 'motion/react';
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
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Download, Share2, TrendingUp, Award, Heart, Users } from 'lucide-react';

const ImpactReports = () => {
  const data = [
    { month: 'Jan', hours: 12 },
    { month: 'Feb', hours: 18 },
    { month: 'Mar', hours: 15 },
    { month: 'Apr', hours: 25 },
    { month: 'May', hours: 30 },
    { month: 'Jun', hours: 22 },
  ];

  const categoryData = [
    { name: 'Education', value: 40 },
    { name: 'Environment', value: 30 },
    { name: 'Health', value: 20 },
    { name: 'Community', value: 10 },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className="flex h-full flex-col bg-white dark:bg-zinc-950">
      <header className="flex items-center justify-between border-b border-black/5 px-8 py-6 dark:border-white/10">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white">Impact Reports</h1>
          <p className="text-sm text-zinc-500">Visualizing your contribution to society</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-4 py-2 text-sm font-bold text-zinc-900 shadow-sm hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-800 dark:text-white">
            <Share2 size={18} /> Share
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700">
            <Download size={18} /> Download PDF
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { label: 'Total Hours', value: '122h', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-500/10' },
              { label: 'NGOs Helped', value: '8', icon: Heart, color: 'text-blue-600', bg: 'bg-blue-500/10' },
              { label: 'Lives Impacted', value: '450+', icon: Users, color: 'text-amber-600', bg: 'bg-amber-500/10' },
              { label: 'Badges Earned', value: '12', icon: Award, color: 'text-purple-600', bg: 'bg-purple-500/10' },
            ].map((stat, i) => (
              <div key={i} className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-800">
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                <p className="mt-1 text-2xl font-black text-zinc-900 dark:text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Hours Chart */}
            <div className="rounded-[32px] border border-black/5 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-zinc-800">
              <h3 className="mb-8 text-lg font-bold text-zinc-900 dark:text-white">Monthly Contribution</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="hours" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Pie */}
            <div className="rounded-[32px] border border-black/5 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-zinc-800">
              <h3 className="mb-8 text-lg font-bold text-zinc-900 dark:text-white">Impact Distribution</h3>
              <div className="flex h-80 items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={100}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {categoryData.map((cat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400">{cat.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Log */}
          <div className="rounded-[32px] border border-black/5 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-zinc-800">
            <h3 className="mb-8 text-lg font-bold text-zinc-900 dark:text-white">Contribution Log</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-black/5 dark:border-white/10">
                    <th className="pb-4 text-xs font-black uppercase tracking-widest text-zinc-400">Date</th>
                    <th className="pb-4 text-xs font-black uppercase tracking-widest text-zinc-400">Organization</th>
                    <th className="pb-4 text-xs font-black uppercase tracking-widest text-zinc-400">Activity</th>
                    <th className="pb-4 text-xs font-black uppercase tracking-widest text-zinc-400">Hours</th>
                    <th className="pb-4 text-xs font-black uppercase tracking-widest text-zinc-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/10">
                  {[
                    { date: '2026-02-20', org: 'Goonj', activity: 'Disaster Relief', hours: 5, status: 'Verified' },
                    { date: '2026-02-15', org: 'Teach For India', activity: 'Mentoring', hours: 3, status: 'Verified' },
                    { date: '2026-02-10', org: 'CRY', activity: 'Fundraising', hours: 4, status: 'Pending' },
                  ].map((log, i) => (
                    <tr key={i}>
                      <td className="py-4 text-sm font-medium text-zinc-900 dark:text-white">{log.date}</td>
                      <td className="py-4 text-sm font-bold text-emerald-600">{log.org}</td>
                      <td className="py-4 text-sm text-zinc-600 dark:text-zinc-400">{log.activity}</td>
                      <td className="py-4 text-sm font-bold text-zinc-900 dark:text-white">{log.hours}h</td>
                      <td className="py-4">
                        <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                          log.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactReports;
