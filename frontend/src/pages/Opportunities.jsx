import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, MapPin, Clock, Users, Search, Filter, 
  ArrowRight, CheckCircle2, Loader2, Sparkles,
  BookOpen, MessageSquare, Bell, Star, Heart,
  Globe, Shield, Zap
} from 'lucide-react';
import { oppService, appService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';

/**
 * Opportunities Component
 * Lists all available volunteer opportunities with filtering and search.
 * Includes a "Recommended" section based on user interests.
 */
const Opportunities = () => {
  const [opps, setOpps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [applying, setApplying] = useState(null);
  const [appliedIds, setAppliedIds] = useState(new Set());
  const [showResources, setShowResources] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const { user } = useAuth();

  // Fetch opportunities and user's existing applications on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [oppsRes, appsRes] = await Promise.all([
          oppService.getAll({ category: categoryFilter }),
          user ? appService.getMyApplications() : Promise.resolve({ data: [] })
        ]);
        
        setOpps(oppsRes.data);
        if (user) {
          const ids = new Set(appsRes.data.map(a => a.opp_id));
          setAppliedIds(ids);
        }
      } catch (err) {
        console.error("Failed to fetch opportunities", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryFilter, user]);

  /**
   * Handles the application process for a specific opportunity.
   */
  const handleApply = async (id) => {
    if (!user) return alert('Please login to apply');
    if (appliedIds.has(id)) return;

    setApplying(id);
    try {
      await appService.apply(id);
      setAppliedIds(prev => new Set([...prev, id]));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to apply');
    } finally {
      setApplying(null);
    }
  };

  const userInterests = user?.interests ? user.interests.toLowerCase().split(',').map(i => i.trim()) : [];
  
  const filteredOpps = opps.filter(opp => 
    opp.title.toLowerCase().includes(search.toLowerCase()) ||
    opp.org_name.toLowerCase().includes(search.toLowerCase()) ||
    opp.category.toLowerCase().includes(search.toLowerCase())
  );

  const recommendedOpps = opps.filter(opp => 
    userInterests.some(interest => 
      opp.category.toLowerCase().includes(interest) || 
      opp.title.toLowerCase().includes(interest)
    )
  ).slice(0, 3);

  const resources = [
    { title: "Volunteering 101", desc: "A guide for first-time volunteers in India.", icon: BookOpen },
    { title: "Impact Reporting", desc: "How to track and share your contributions effectively.", icon: Zap },
    { title: "Community Building", desc: "Tips for organizing group volunteering events.", icon: Globe },
  ];

  return (
    <div className="w-full px-8 py-12">
      {/* Header Section */}
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            Volunteer <span className="text-emerald-600 underline decoration-emerald-600/30 underline-offset-8">Hub</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
            Connect with meaningful opportunities that align with your passion and schedule.
          </p>
        </motion.div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setShowResources(!showResources)}
            className="flex items-center gap-2 rounded-2xl border border-black/5 bg-white px-6 py-3 text-sm font-bold text-zinc-900 shadow-sm transition-all hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-800 dark:text-white"
          >
            <BookOpen size={18} /> Resource Hub
          </button>
          <div className="flex items-center gap-2 rounded-2xl bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-600">
            <Sparkles size={18} />
            <span>{opps.length} Opportunities</span>
          </div>
        </div>
      </div>

      {/* Resource Hub Section */}
      <AnimatePresence>
        {showResources && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-12 overflow-hidden"
          >
            <div className="grid gap-6 md:grid-cols-3">
              {resources.map((res, i) => (
                <div key={i} className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-800">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                    <res.icon size={20} />
                  </div>
                  <h4 className="font-bold text-zinc-900 dark:text-white">{res.title}</h4>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{res.desc}</p>
                  <button className="mt-4 text-xs font-bold text-emerald-600 hover:underline">Read More</button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recommended for You */}
      {user && recommendedOpps.length > 0 && (
        <div className="mb-12">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
            <Star size={24} className="text-amber-500" /> Recommended for You
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {recommendedOpps.map((opp, i) => (
              <motion.div
                key={opp.id}
                whileHover={{ y: -5 }}
                className="rounded-3xl border-2 border-emerald-600/20 bg-emerald-50/30 p-6 shadow-sm dark:bg-emerald-900/10"
              >
                <span className="mb-2 inline-block rounded-lg bg-emerald-600 px-2 py-1 text-[10px] font-black uppercase text-white">Match</span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{opp.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{opp.description}</p>
                <button 
                  onClick={() => handleApply(opp.id)}
                  className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-600 hover:underline"
                >
                  Apply Now <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
          <input
            type="text"
            placeholder="Search by interest (e.g. Education, Health, Environment)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-black/5 bg-white py-4 pl-12 pr-4 text-zinc-900 outline-none transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 dark:border-white/10 dark:bg-zinc-800 dark:text-white shadow-sm"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-2xl border border-black/5 bg-white px-6 py-4 text-sm font-bold text-zinc-700 outline-none transition-all focus:border-emerald-600 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300 shadow-sm"
          >
            <option value="">All Fields</option>
            <option value="Education">Education</option>
            <option value="Environment">Environment</option>
            <option value="Health">Health</option>
            <option value="Community">Community</option>
            <option value="Disaster Relief">Disaster Relief</option>
            <option value="Women Empowerment">Women Empowerment</option>
            <option value="Child Rights">Child Rights</option>
          </select>
        </div>
      </div>

      {/* Opportunities List */}
      {loading ? (
        <div className="grid gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 animate-pulse rounded-3xl bg-zinc-100 dark:bg-zinc-900" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6">
          <AnimatePresence mode="popLayout">
            {filteredOpps.map((opp, i) => (
              <motion.div
                key={opp.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white p-8 shadow-sm transition-all hover:shadow-xl dark:border-white/10 dark:bg-zinc-800"
              >
                <div className="flex flex-col gap-8 md:flex-row md:items-center">
                  {/* NGO Logo/Icon */}
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-900">
                    {opp.org_logo ? (
                      <img src={opp.org_logo} alt={opp.org_name} className="h-full w-full rounded-2xl object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <Users size={40} className="text-zinc-400" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="rounded-xl bg-emerald-500/10 px-3 py-1.5 text-xs font-black uppercase tracking-widest text-emerald-600">
                        {opp.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-sm font-bold text-zinc-500">
                        <CheckCircle2 size={16} className="text-emerald-500" /> 
                        <span className="hover:text-emerald-600 cursor-pointer transition-colors">{opp.org_name}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">{opp.title}</h3>
                    
                    <div className="mt-6 flex flex-wrap gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-emerald-600" /> {format(new Date(opp.date), 'PPP')}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-emerald-600" /> {opp.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-emerald-600" /> {opp.available_slots} slots left
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-4 md:items-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedOpp(opp)}
                      disabled={applying === opp.id || appliedIds.has(opp.id)}
                      className={`flex min-w-[160px] items-center justify-center gap-2 rounded-2xl px-8 py-4 text-sm font-black uppercase tracking-widest transition-all shadow-lg ${
                        appliedIds.has(opp.id)
                          ? 'bg-zinc-100 text-zinc-400 cursor-default dark:bg-zinc-900'
                          : 'bg-emerald-600 text-white shadow-emerald-600/20 hover:bg-emerald-700'
                      }`}
                    >
                      {applying === opp.id ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : appliedIds.has(opp.id) ? (
                        <>Applied <CheckCircle2 size={18} /></>
                      ) : (
                        <>Apply Now <ArrowRight size={18} /></>
                      )}
                    </motion.button>
                    <div className="flex gap-4">
                      <button className="flex items-center gap-1 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-emerald-600 transition-colors">
                        <MessageSquare size={14} /> Message
                      </button>
                      <button className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredOpps.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 rounded-full bg-zinc-100 p-6 dark:bg-zinc-900">
                <Search size={48} className="text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">No opportunities found</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      )}
      {/* Opportunity Details Modal */}
      <AnimatePresence>
        {selectedOpp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOpp(null)}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-[40px] bg-white shadow-2xl dark:bg-zinc-900"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={selectedOpp.org_logo || "https://picsum.photos/seed/volunteer/800/400"} 
                  className="h-full w-full object-cover opacity-50 blur-sm"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900" />
                <button 
                  onClick={() => setSelectedOpp(null)}
                  className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-black/10 text-zinc-900 hover:bg-black/20 dark:bg-white/10 dark:text-white"
                >
                  <Users size={20} />
                </button>
              </div>

              <div className="px-10 pb-10">
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="rounded-xl bg-emerald-500/10 px-3 py-1.5 text-xs font-black uppercase tracking-widest text-emerald-600">
                    {selectedOpp.category}
                  </span>
                  <span className="text-sm font-bold text-zinc-500">{selectedOpp.org_name}</span>
                </div>

                <h2 className="mb-6 text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
                  {selectedOpp.title}
                </h2>

                <div className="mb-8 grid gap-6 sm:grid-cols-2">
                  <div className="flex items-center gap-4 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Location</p>
                      <p className="text-sm font-bold text-zinc-900 dark:text-white">{selectedOpp.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                      <Globe size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">State</p>
                      <p className="text-sm font-bold text-zinc-900 dark:text-white">{selectedOpp.state || 'Across India'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Date to Volunteer</p>
                      <p className="text-sm font-bold text-zinc-900 dark:text-white">{format(new Date(selectedOpp.date), 'PPP')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Availability</p>
                      <p className="text-sm font-bold text-zinc-900 dark:text-white">{selectedOpp.available_slots} slots remaining</p>
                    </div>
                  </div>
                </div>

                <div className="mb-10">
                  <h4 className="mb-3 text-sm font-black uppercase tracking-widest text-zinc-400">About the Opportunity</h4>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {selectedOpp.description}
                  </p>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setSelectedOpp(null)}
                    className="flex-1 rounded-2xl border border-black/5 bg-zinc-50 py-4 font-bold text-zinc-600 transition-all hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      handleApply(selectedOpp.id);
                      setSelectedOpp(null);
                    }}
                    className="flex-[2] rounded-2xl bg-emerald-600 py-4 font-black uppercase tracking-widest text-white shadow-xl shadow-emerald-600/20 transition-all hover:bg-emerald-700"
                  >
                    Confirm Application
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Opportunities;
