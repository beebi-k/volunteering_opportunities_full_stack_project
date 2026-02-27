import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Play, FileText, Download, 
  Search, ArrowRight, Star, X, 
  Clock, Globe, Shield, Filter,
  Book, Video, Award
} from 'lucide-react';

const ResourceHub = () => {
  const [selectedResource, setSelectedResource] = useState(null);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const resources = [
    { 
      id: 1, 
      title: 'Volunteering 101', 
      type: 'Guide', 
      duration: '10 min read', 
      category: 'Basics', 
      icon: BookOpen, 
      rating: 4.8, 
      image: '/assets/volunteer_101.jpeg',
      link: 'https://iclick2learn.com.au/volunteering-101/' 
    },
    { 
      id: 2, 
      title: 'First Aid Training', 
      type: 'Video', 
      duration: '15 min', 
      category: 'Skills', 
      icon: Play, 
      rating: 4.9, 
      image: '/assets/First_Aid_raining.jpeg', 
      websiteLink: 'https://ircsfa.org/',
      videoLink: 'https://www.youtube.com/watch?v=APinK3ijfiQ'
    },
    { 
      id: 3, 
      title: 'Community Leadership', 
      type: 'Certification', 
      duration: '2 hours', 
      category: 'Advanced', 
      icon: Award, 
      rating: 5.0, 
      image: '/assets/community_leadership.jpeg', 
      link: 'https://www.sciencedirect.com/topics/social-sciences/community-leadership' 
    },
    { 
      id: 4, 
      title: 'Disaster Management', 
      type: 'Guide', 
      duration: '25 min read', 
      category: 'Safety', 
      icon: Shield, 
      rating: 4.7, 
      image: '/assets/Disaster_Management.jpeg', 
      link: 'https://cdnbbsr.s3waas.gov.in/s3kv027b571733cd04d2b1611257c05049/uploads/2024/05/2024053090.pdf' 
    },
    { 
      id: 5, 
      title: 'Effective Communication', 
      type: 'Video', 
      duration: '12 min', 
      category: 'Skills', 
      icon: Play, 
      rating: 4.6, 
      image: '/assets/Effective_Communication.jpeg', 
      websiteLink: 'https://www.helpguide.org/relationships/communication/effective-communication',
      videoLink: 'https://www.youtube.com/watch?v=6pYSbdGiDYw' 
    },
    { 
      id: 6, 
      title: 'Fundraising Basics', 
      type: 'Guide', 
      duration: '15 min read', 
      category: 'Finance', 
      icon: BookOpen, 
      rating: 4.5, 
      image: '/assets/Fundraising_Basics.jpeg', 
      link: 'https://peacealliance.org/fundraising-basics-a-step-by-step-guide/' 
    },
  ];

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === 'All' || res.type === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="w-full px-8 py-12">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            Resource <span className="text-emerald-600">Hub</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
            Master the skills you need to make a real difference in your community.
          </p>
        </motion.div>
      </div>

      <div className="mb-12 flex flex-col gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400" size={24} />
          <input
            type="text"
            placeholder="Search guides, videos, certifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-[32px] border border-black/5 bg-white py-6 pl-16 pr-8 text-lg font-medium text-zinc-900 outline-none transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 dark:border-white/10 dark:bg-zinc-900 dark:text-white shadow-sm"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {['All', 'Guide', 'Video', 'Certification'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-2xl px-8 py-3 text-sm font-black uppercase tracking-widest transition-all ${
                activeTab === tab 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                  : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800'
              }`}
            >
              {tab}s
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((res, i) => (
          <motion.div
            key={res.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative flex flex-col overflow-hidden rounded-[40px] border border-black/5 bg-white transition-all hover:shadow-2xl dark:border-white/10 dark:bg-zinc-900"
          >
            <div className="relative h-48 w-full overflow-hidden bg-emerald-500/5">
              <img src={res.image} alt={res.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center text-emerald-600 transition-transform duration-500 group-hover:scale-110">
                <res.icon size={80} />
              </div>
              <div className="absolute top-6 right-6 rounded-xl bg-white/90 px-3 py-1.5 text-xs font-black text-zinc-900 backdrop-blur-md dark:bg-zinc-800/90 dark:text-white">
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-emerald-500 text-emerald-500" />
                  {res.rating}
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-8">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-xl bg-emerald-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                  {res.type}
                </span>
                <span className="text-xs font-bold text-zinc-400">{res.duration}</span>
              </div>
              <h3 className="mb-4 text-2xl font-black tracking-tight text-zinc-900 dark:text-white">{res.title}</h3>
              <p className="mb-8 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                Learn essential {res.category.toLowerCase()} skills to maximize your impact in the community.
              </p>
              
              <a 
                href={res.link || res.websiteLink || res.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center justify-center gap-2 rounded-2xl bg-zinc-50 py-4 text-sm font-black uppercase tracking-widest text-emerald-600 transition-all hover:bg-emerald-600 hover:text-white dark:bg-zinc-800 dark:hover:bg-emerald-600"
              >
                Access Now <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Resource Modal */}
      <AnimatePresence>
        {selectedResource && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedResource(null)}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-[40px] bg-white shadow-2xl dark:bg-zinc-900"
            >
              <div className="flex h-48 w-full items-center justify-center bg-emerald-500/10 text-emerald-600">
                <img src={selectedResource.image} alt={selectedResource.title} className="h-full w-full object-cover" />
              </div>
              
              <div className="p-10">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-xl bg-emerald-500/10 px-3 py-1.5 text-xs font-black uppercase tracking-widest text-emerald-600">
                    {selectedResource.type}
                  </span>
                  <div className="flex items-center gap-2 text-sm font-bold text-zinc-400">
                    <Clock size={16} /> {selectedResource.duration}
                  </div>
                </div>

                <h2 className="mb-4 text-3xl font-black text-zinc-900 dark:text-white">{selectedResource.title}</h2>
                <p className="mb-8 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  This {selectedResource.type.toLowerCase()} covers essential {selectedResource.category.toLowerCase()} knowledge for volunteers. 
                  Learn how to effectively contribute to social causes and maximize your impact in the community.
                  The content is designed to be practical, scannable, and immediately applicable to your volunteering journey.
                </p>

                <div className="grid gap-4 sm:grid-cols-2 mb-10">
                  <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
                    <Shield size={20} className="text-emerald-600" />
                    <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Verified Content</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
                    <Globe size={20} className="text-emerald-600" />
                    <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Available Offline</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setSelectedResource(null)}
                    className="flex-1 rounded-2xl border border-black/5 bg-zinc-50 py-4 font-bold text-zinc-600 transition-all hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                  >
                    Close
                  </button>
                  <a
                    href={selectedResource.link || selectedResource.websiteLink || selectedResource.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-[2] flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-4 font-black uppercase tracking-widest text-white shadow-xl shadow-emerald-600/20 transition-all hover:bg-emerald-700"
                  >
                    <Download size={20} /> Download Resource
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResourceHub;