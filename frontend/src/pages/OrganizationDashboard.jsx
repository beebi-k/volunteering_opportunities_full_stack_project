import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Users, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  MoreVertical,
  BarChart as BarChartIcon,
  Clock
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { oppService } from '../services/api';

const OrganizationDashboard = () => {
  const [opps, setOpps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    oppService.getAll()
      .then(res => setOpps(res.data))
      .finally(() => setLoading(false));
  }, []);

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  const stats = [
    { label: 'Total Opportunities', value: opps.length, icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-500/10' },
    { label: 'Active Applicants', value: '45', icon: Users, color: 'text-blue-600', bg: 'bg-blue-500/10' },
    { label: 'Hours Contributed', value: '1,240', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-500/10' },
    { label: 'Success Rate', value: '98%', icon: CheckCircle2, color: 'text-purple-600', bg: 'bg-purple-500/10' },
  ];

  const applicantData = [
    { name: 'Education Drive', applicants: 12 },
    { name: 'Health Camp', applicants: 18 },
    { name: 'Tree Plantation', applicants: 25 },
    { name: 'Food Drive', applicants: 15 },
  ];

  if (loading) return <div className="flex h-96 items-center justify-center"><div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div></div>;

  return (
    <div className="w-full px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Organization Dashboard</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Manage your opportunities and track volunteer impact.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700">
          <Plus size={20} /> Create Opportunity
        </button>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
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

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Applicants Chart */}
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-800">
          <h3 className="mb-6 text-lg font-bold text-zinc-900 dark:text-white">Applicants per Opportunity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={applicantData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="applicants" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Applicants Table */}
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-800">
          <h3 className="mb-6 text-lg font-bold text-zinc-900 dark:text-white">Recent Applicants</h3>
          <div className="space-y-4">
            {[
              { name: 'Anjali Sharma', opp: 'Education Drive', date: '2 hours ago', status: 'pending' },
              { name: 'Vikram Singh', opp: 'Health Camp', date: '5 hours ago', status: 'pending' },
              { name: 'Neha Gupta', opp: 'Tree Plantation', date: '1 day ago', status: 'approved' },
            ].map((applicant, i) => (
              <div key={i} className="flex items-center justify-between rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900">
                <div className="flex items-center gap-3">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} className="h-10 w-10 rounded-full" alt="" />
                  <div>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white">{applicant.name}</p>
                    <p className="text-xs text-zinc-500">{applicant.opp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {applicant.status === 'pending' ? (
                    <>
                      <button className="rounded-lg bg-emerald-500 p-1.5 text-white hover:bg-emerald-600">
                        <CheckCircle2 size={16} />
                      </button>
                      <button className="rounded-lg bg-red-500 p-1.5 text-white hover:bg-red-600">
                        <XCircle size={16} />
                      </button>
                    </>
                  ) : (
                    <span className="text-xs font-bold text-emerald-600">Approved</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
