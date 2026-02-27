import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Clock, 
  Calendar, 
  MapPin, 
  Award, 
  TrendingUp, 
  PieChart as PieChartIcon,
  ChevronRight,
  CheckCircle2,
  Star
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Cell, Pie
} from 'recharts';
import { userService } from '../services/api';

const VolunteerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getStats()
      .then(res => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
    </div>
  );

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className="w-full px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Volunteer Dashboard</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Track your impact and upcoming opportunities.</p>
        </div>
        <button className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700">
          Download Impact Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Hours', value: stats.totalHours, icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-500/10' },
          { label: 'Applications', value: stats.totalApplications, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-500/10' },
          { label: 'NGOs Supported', value: '5', icon: MapPin, color: 'text-amber-600', bg: 'bg-amber-500/10' },
          { label: 'Rank', value: '#12', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-500/10' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-800"
          >
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{stat.label}</p>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: Charts & Stats */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Hours Over Time */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-800"
            >
              <h3 className="mb-6 text-lg font-bold text-zinc-900 dark:text-white">Hours Over Time</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.hoursByMonth}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line type="monotone" dataKey="hours" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Category Distribution */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-800"
            >
              <h3 className="mb-6 text-lg font-bold text-zinc-900 dark:text-white">Impact by Category</h3>
              <div className="flex h-64 items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.hoursByCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {stats.hoursByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col gap-2">
                  {stats.hoursByCategory.map((cat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-xs text-zinc-600 dark:text-zinc-400">{cat.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Badges & Achievements */}
          <div>
            <h3 className="mb-6 text-xl font-bold text-zinc-900 dark:text-white">Recent Achievements</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {stats.badges.map((badge) => (
                <div 
                  key={badge.id}
                  className={`flex items-center gap-4 rounded-2xl border p-4 transition-all ${
                    badge.earned 
                      ? 'border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/10' 
                      : 'border-black/5 bg-zinc-50 opacity-50 dark:border-white/10 dark:bg-zinc-800'
                  }`}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${badge.earned ? 'bg-emerald-500 text-white' : 'bg-zinc-200 text-zinc-400'}`}>
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white">{badge.name}</h4>
                    <p className="text-xs text-zinc-500">{badge.earned ? 'Unlocked' : 'Locked'}</p>
                  </div>
                  {badge.earned && <CheckCircle2 className="ml-auto text-emerald-500" size={20} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live Feed & Leaderboard */}
        <div className="space-y-8">
          {/* Live Impact Feed */}
          <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-800">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-white">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Live Impact Feed
            </h3>
            <div className="space-y-6">
              {[
                { user: 'Rahul', action: 'applied to', target: 'CRY', time: '2m ago' },
                { user: 'Priya', action: 'completed', target: 'Teach For India', time: '15m ago' },
                { user: 'Amit', action: 'earned', target: 'Top Volunteer', time: '1h ago' },
                { user: 'Sneha', action: 'joined', target: 'VolunteerHub', time: '2h ago' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center text-xs font-bold">
                    {item.user[0]}
                  </div>
                  <div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      <span className="font-bold text-zinc-900 dark:text-white">{item.user}</span> {item.action} <span className="font-bold text-emerald-600">{item.target}</span>
                    </p>
                    <p className="text-[10px] text-zinc-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-800">
            <h3 className="mb-6 text-lg font-bold text-zinc-900 dark:text-white">Leaderboard</h3>
            <div className="space-y-4">
              {[
                { name: 'Rahul S.', hours: 120, rank: 1 },
                { name: 'Priya M.', hours: 95, rank: 2 },
                { name: 'Amit K.', hours: 88, rank: 3 },
                { name: 'You', hours: stats.totalHours, rank: 12, isMe: true },
              ].map((user, i) => (
                <div key={i} className={`flex items-center justify-between rounded-xl p-3 ${user.isMe ? 'bg-emerald-500/10' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold ${i < 3 ? 'text-emerald-600' : 'text-zinc-400'}`}>#{user.rank}</span>
                    <span className={`text-sm font-medium ${user.isMe ? 'text-emerald-600 font-bold' : 'text-zinc-900 dark:text-white'}`}>{user.name}</span>
                  </div>
                  <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400">{user.hours}h</span>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full text-center text-sm font-bold text-emerald-600 hover:underline">
              View Full Leaderboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
