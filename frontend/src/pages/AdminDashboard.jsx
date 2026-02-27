import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Globe, 
  Calendar, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  XCircle,
  BarChart as BarChartIcon
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { orgService } from '../services/api';

const AdminDashboard = () => {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orgService.getAll()
      .then(res => setOrgs(res.data))
      .finally(() => setLoading(false));
  }, []);

  const systemStats = [
    { label: 'Total Users', value: '12,450', icon: Users, color: 'text-blue-600', bg: 'bg-blue-500/10' },
    { label: 'Verified NGOs', value: orgs.length, icon: Globe, color: 'text-emerald-600', bg: 'bg-emerald-500/10' },
    { label: 'Active Opportunities', value: '156', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-500/10' },
    { label: 'Total Hours', value: '45.2K', icon: BarChartIcon, color: 'text-purple-600', bg: 'bg-purple-500/10' },
  ];

  if (loading) return <div className="flex h-96 items-center justify-center"><div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div></div>;

  return (
    <div className="w-full px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Admin Control Center</h1>
        <p className="text-zinc-600 dark:text-zinc-400">System-wide analytics and organization management.</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {systemStats.map((stat, i) => (
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
        {/* Pending Approvals */}
        <div className="lg:col-span-2 rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-800">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Organization Approvals</h3>
            <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600">3 Pending</span>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Rural Health Initiative', location: 'Pune', focus: 'Healthcare', date: '2 days ago' },
              { name: 'Green Earth Foundation', location: 'Indore', focus: 'Environment', date: '3 days ago' },
              { name: 'Education for All', location: 'Patna', focus: 'Education', date: '5 days ago' },
            ].map((pending, i) => (
              <div key={i} className="flex items-center justify-between rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-200 dark:bg-zinc-800">
                    <Globe size={24} className="text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white">{pending.name}</p>
                    <p className="text-xs text-zinc-500">{pending.location} • {pending.focus}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700">
                    <CheckCircle2 size={14} /> Approve
                  </button>
                  <button className="flex items-center gap-1 rounded-xl bg-red-500 px-4 py-2 text-xs font-bold text-white hover:bg-red-700">
                    <XCircle size={14} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-800">
          <h3 className="mb-6 text-lg font-bold text-zinc-900 dark:text-white">System Health</h3>
          <div className="space-y-6">
            {[
              { label: 'API Server', status: 'Healthy', color: 'text-emerald-500' },
              { label: 'Database', status: 'Optimal', color: 'text-emerald-500' },
              { label: 'Storage', status: '85% Free', color: 'text-emerald-500' },
              { label: 'AI Service', status: 'Active', color: 'text-emerald-500' },
            ].map((health, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">{health.label}</span>
                <span className={`text-sm font-bold ${health.color}`}>{health.status}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-blue-500/5 p-4">
            <div className="flex items-center gap-2 text-blue-600">
              <ShieldCheck size={18} />
              <span className="text-sm font-bold">Security Scan Passed</span>
            </div>
            <p className="mt-1 text-xs text-zinc-500">Last scanned: Today, 04:30 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
