import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Mail, Shield, Award, MapPin, Camera, Loader2, 
  ArrowRight, TrendingUp, Clock, Calendar, CheckCircle2,
  Edit3, Save, X, Phone, Briefcase, Heart, ClipboardList,
  AlertCircle, CheckCircle
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { userService, appService } from '../services/api';
import { format } from 'date-fns';

/**
 * Profile Component
 * Displays user information, visualizes volunteer performance using charts,
 * and tracks application status.
 */
const Profile = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: '',
    interests: '',
    skills: '',
    avatar_url: ''
  });

  // Fetch performance stats and applications on mount
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        bio: user.bio || '',
        interests: user.interests || '',
        skills: user.skills || '',
        avatar_url: user.avatar_url || ''
      });
      
      const fetchData = async () => {
        try {
          const [statsRes, appsRes] = await Promise.all([
            userService.getStats(),
            appService.getMyApplications()
          ]);
          setStats(statsRes.data);
          setApplications(appsRes.data);
        } catch (err) {
          console.error("Data fetch failed", err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [user]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await userService.updateProfile(formData);
      setUser(res.data);
      setIsEditing(false);
    } catch (err) {
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];
  const interestsList = user.interests ? user.interests.split(',').map(i => i.trim()) : [];
  const skillsList = user.skills ? user.skills.split(',').map(s => s.trim()) : [];

  return (
    <div className="w-full px-8 py-12">
      <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white">My Profile</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Your personal impact and performance metrics.</p>
        </div>
        <div className="flex gap-3">
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 rounded-2xl border border-black/5 bg-white px-6 py-3 text-sm font-bold text-zinc-900 shadow-sm transition-all hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-800 dark:text-white"
            >
              <Edit3 size={18} /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 rounded-2xl border border-black/5 bg-white px-6 py-3 text-sm font-bold text-zinc-900 shadow-sm transition-all hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-800 dark:text-white"
              >
                <X size={18} /> Cancel
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700"
              >
                <Save size={18} /> Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Profile Info */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-zinc-800"
          >
            <div className="relative mx-auto mb-6 h-40 w-40">
              <img
                src={user.avatar_url || `https://i.pravatar.cc/150?u=${user.id}`}
                alt={user.name}
                className="h-full w-full rounded-full border-8 border-white object-cover shadow-2xl dark:border-zinc-700"
              />
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-2 right-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg"
              >
                <Camera size={20} />
              </motion.button>
            </div>
            
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full rounded-xl border border-black/5 bg-zinc-50 px-4 py-2 text-sm outline-none focus:border-emerald-600 dark:border-white/10 dark:bg-zinc-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Bio</label>
                  <textarea 
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="w-full rounded-xl border border-black/5 bg-zinc-50 px-4 py-2 text-sm outline-none focus:border-emerald-600 dark:border-white/10 dark:bg-zinc-900 dark:text-white"
                    rows={3}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-black text-zinc-900 dark:text-white">{user.name}</h2>
                <p className="text-sm font-bold uppercase tracking-widest text-zinc-500">{user.role}</p>
                {user.bio && <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">{user.bio}</p>}
                
                <div className="mt-6 flex justify-center gap-3">
                  <div className="flex flex-col items-center rounded-2xl bg-zinc-50 p-3 dark:bg-zinc-900">
                    <span className="text-lg font-black text-emerald-600">Lvl 5</span>
                    <span className="text-[10px] font-bold uppercase text-zinc-500">Rank</span>
                  </div>
                  <div className="flex flex-col items-center rounded-2xl bg-zinc-50 p-3 dark:bg-zinc-900">
                    <span className="text-lg font-black text-blue-600">88%</span>
                    <span className="text-[10px] font-bold uppercase text-zinc-500">Trust</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-8 text-left">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Progress to Level 6</span>
                    <span className="text-[10px] font-bold text-emerald-600">75%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-emerald-600"
                    />
                  </div>
                  <p className="mt-2 text-[10px] text-zinc-400 italic">15 more hours to reach next level</p>
                </div>
              </div>
            )}

            <div className="mt-8 space-y-4 border-t border-black/5 pt-8 dark:border-white/10">
              <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900"><Mail size={16} /></div>
                {user.email}
              </div>
              {isEditing ? (
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Phone</label>
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full rounded-xl border border-black/5 bg-zinc-50 px-4 py-2 text-sm outline-none focus:border-emerald-600 dark:border-white/10 dark:bg-zinc-900 dark:text-white"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900"><Phone size={16} /></div>
                  {user.phone || 'No phone added'}
                </div>
              )}
              <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900"><MapPin size={16} /></div>
                Mumbai, Maharashtra
              </div>
              <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900"><Shield size={16} /></div>
                Verified Member
              </div>
            </div>
          </motion.div>

          {/* Interests & Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-zinc-800"
          >
            <div className="space-y-8">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-lg font-black tracking-tight text-zinc-900 dark:text-white">
                    <Heart size={20} className="text-emerald-600" /> My Interests
                  </h3>
                </div>
                {isEditing ? (
                  <input 
                    type="text" 
                    placeholder="Education, Environment, Health..."
                    value={formData.interests}
                    onChange={(e) => setFormData({...formData, interests: e.target.value})}
                    className="w-full rounded-xl border border-black/5 bg-zinc-50 px-4 py-2 text-sm outline-none focus:border-emerald-600 dark:border-white/10 dark:bg-zinc-900 dark:text-white"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {interestsList.length > 0 ? interestsList.map((interest, i) => (
                      <span key={i} className="rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600">
                        {interest}
                      </span>
                    )) : <p className="text-xs text-zinc-500 italic">No interests added yet.</p>}
                  </div>
                )}
              </div>

              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-lg font-black tracking-tight text-zinc-900 dark:text-white">
                    <Briefcase size={20} className="text-blue-600" /> My Skills
                  </h3>
                </div>
                {isEditing ? (
                  <input 
                    type="text" 
                    placeholder="Teaching, Coding, Marketing..."
                    value={formData.skills}
                    onChange={(e) => setFormData({...formData, skills: e.target.value})}
                    className="w-full rounded-xl border border-black/5 bg-zinc-50 px-4 py-2 text-sm outline-none focus:border-emerald-600 dark:border-white/10 dark:bg-zinc-900 dark:text-white"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {skillsList.length > 0 ? skillsList.map((skill, i) => (
                      <span key={i} className="rounded-lg bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-600">
                        {skill}
                      </span>
                    )) : <p className="text-xs text-zinc-500 italic">No skills added yet.</p>}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Badges Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-zinc-800"
          >
            <h3 className="mb-6 text-lg font-black tracking-tight text-zinc-900 dark:text-white">Achievements</h3>
            <div className="grid grid-cols-3 gap-4">
              {stats?.badges?.map((badge, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className={`flex flex-col items-center gap-2 rounded-2xl p-3 text-center ${
                    badge.earned ? 'bg-emerald-500/10 text-emerald-600' : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-900'
                  }`}
                >
                  <Award size={24} />
                  <span className="text-[10px] font-bold leading-tight">{badge.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Performance Charts */}
        <div className="lg:col-span-8 space-y-8">
          {loading ? (
            <div className="flex h-96 items-center justify-center rounded-3xl border border-black/5 bg-white dark:bg-zinc-800">
              <Loader2 className="animate-spin text-emerald-600" size={40} />
            </div>
          ) : stats ? (
            <>
              {/* Performance Overview */}
              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  { label: 'Total Hours', value: stats.totalHours, icon: Clock, color: 'text-emerald-600' },
                  { label: 'Impact Score', value: '840', icon: TrendingUp, color: 'text-blue-600' },
                  { label: 'NGOs Helped', value: '12', icon: CheckCircle2, color: 'text-amber-600' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-800"
                  >
                    <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-50 dark:bg-zinc-900 ${stat.color}`}>
                      <stat.icon size={20} />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">{stat.label}</p>
                    <h4 className="mt-1 text-2xl font-black text-zinc-900 dark:text-white">{stat.value}</h4>
                  </motion.div>
                ))}
              </div>

              {/* Charts Grid */}
              <div className="grid gap-8 md:grid-cols-2">
                {/* Hours Trend (Line Chart) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-zinc-800"
                >
                  <h3 className="mb-6 text-lg font-black text-zinc-900 dark:text-white">Hours Trend</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stats.hoursByMonth}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="hours" 
                          stroke="#10b981" 
                          strokeWidth={4} 
                          dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} 
                          activeDot={{ r: 8 }} 
                          animationDuration={2000}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Category Mix (Pie Chart) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-zinc-800"
                >
                  <h3 className="mb-6 text-lg font-black text-zinc-900 dark:text-white">Category Mix</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stats.hoursByCategory}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={8}
                          dataKey="value"
                          animationDuration={1500}
                        >
                          {stats.hoursByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Impact Bar Chart */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="md:col-span-2 rounded-3xl border border-black/5 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-zinc-800"
                >
                  <h3 className="mb-6 text-lg font-black text-zinc-900 dark:text-white">Monthly Impact Comparison</h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.hoursByMonth}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip 
                          cursor={{ fill: 'transparent' }}
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar 
                          dataKey="hours" 
                          fill="#3b82f6" 
                          radius={[8, 8, 0, 0]} 
                          animationDuration={2000}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Applications Status Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="md:col-span-2 rounded-3xl border border-black/5 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-zinc-800"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <div>
                      <h3 className="flex items-center gap-2 text-xl font-black text-zinc-900 dark:text-white">
                        <ClipboardList size={24} className="text-emerald-600" /> My Applications
                      </h3>
                      <p className="text-sm text-zinc-500">Track the progress of your volunteer requests.</p>
                    </div>
                    <span className="rounded-xl bg-zinc-100 px-3 py-1 text-xs font-bold dark:bg-zinc-900">
                      {applications.length} Total
                    </span>
                  </div>

                  <div className="space-y-4">
                    {applications.length > 0 ? (
                      applications.map((app, i) => (
                        <div 
                          key={app.id}
                          className="flex flex-col gap-4 rounded-2xl border border-black/5 bg-zinc-50 p-6 transition-all hover:bg-white hover:shadow-md dark:border-white/5 dark:bg-zinc-900/50 dark:hover:bg-zinc-900 md:flex-row md:items-center md:justify-between"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-zinc-800">
                              <Heart size={24} className="text-emerald-600" />
                            </div>
                            <div>
                              <h4 className="font-bold text-zinc-900 dark:text-white">{app.opp_title}</h4>
                              <p className="text-xs font-medium text-zinc-500">{app.org_name}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                              <Calendar size={14} />
                              {format(new Date(app.applied_at), 'MMM d, yyyy')}
                            </div>
                            
                            <div className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${
                              app.status === 'approved' ? 'bg-emerald-500/10 text-emerald-600' :
                              app.status === 'rejected' ? 'bg-red-500/10 text-red-600' :
                              'bg-amber-500/10 text-amber-600'
                            }`}>
                              {app.status === 'approved' ? <CheckCircle size={12} /> : 
                               app.status === 'rejected' ? <X size={12} /> : 
                               <Clock size={12} />}
                              {app.status}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="mb-4 rounded-full bg-zinc-100 p-4 dark:bg-zinc-900">
                          <AlertCircle size={32} className="text-zinc-400" />
                        </div>
                        <p className="text-sm font-medium text-zinc-500">You haven't applied to any opportunities yet.</p>
                        <button className="mt-4 text-xs font-bold text-emerald-600 hover:underline">Browse Opportunities</button>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </>
          ) : (
             <div className="flex h-96 items-center justify-center rounded-3xl border border-black/5 bg-white dark:bg-zinc-800">
               <p className="text-zinc-500">No performance data available yet. Start volunteering to see your impact!</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
