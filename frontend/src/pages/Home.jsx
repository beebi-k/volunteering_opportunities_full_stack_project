import React from 'react';
import { motion } from 'motion/react';
import { Heart, Users, Globe, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] overflow-hidden bg-white py-20 dark:bg-zinc-950 lg:py-32">
        {/* Immersive Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-24 -left-24 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px] dark:bg-emerald-500/30 animate-float" />
          <div className="absolute top-1/2 -right-24 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-500/30 animate-float" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.05] dark:invert" />
        </div>

        <div className="relative z-10 w-full px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="mb-8 inline-flex items-center gap-3 rounded-2xl bg-emerald-500/10 px-5 py-2 text-sm font-bold text-emerald-600 dark:bg-emerald-500/20">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                </span>
                Live: 1,240 Volunteers Active Now
              </div>

              <h1 className="mb-8 text-6xl font-black tracking-tighter text-zinc-900 dark:text-white lg:text-8xl leading-tight">
                Impact <br />
                <span className="bg-gradient-to-r from-emerald-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Starts Here.
                </span>
              </h1>

              <p className="mb-10 text-xl leading-relaxed text-zinc-600 dark:text-zinc-300">
                India's premier ecosystem for social good. We bridge the gap between passionate individuals and high-impact NGOs through technology and transparency.
              </p>

              <div className="flex flex-wrap gap-5">
                <Link
                  to="/register"
                  className="group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-emerald-600 px-10 py-5 text-xl font-black text-white shadow-2xl shadow-emerald-600/30 transition-all hover:bg-emerald-700 hover:scale-105"
                >
                  Join the Movement <ArrowRight size={24} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/opportunities"
                  className="flex items-center gap-3 rounded-2xl border-2 border-zinc-100 bg-white px-10 py-5 text-xl font-black text-zinc-900 shadow-sm transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                >
                  Explore NGOs
                </Link>
              </div>

              {/* Live Activity Ticker */}
              <div className="mt-12 overflow-hidden border-t border-zinc-100 pt-8 dark:border-zinc-700">
                <p className="mb-4 text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Recent Activity</p>
                <div className="flex gap-8 whitespace-nowrap">
                  {[
                    "Rahul just applied to CRY",
                    "Priya earned 'Green Warrior' badge",
                    "Goonj added 5 new opportunities",
                    "Amit completed 10 hours at Akshaya Patra"
                  ].map((text, i) => (
                    <motion.div
                      key={i}
                      animate={{ x: [0, -1000] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="flex items-center gap-2 text-sm font-bold text-zinc-500 dark:text-zinc-300"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {text}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative z-10 overflow-hidden rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
                <img
                  src="https://picsum.photos/seed/india-impact/1000/1200"
                  alt="Volunteers in India"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Floating Card */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-10 left-10 right-10 rounded-3xl bg-white/10 p-6 text-white backdrop-blur-2xl border border-white/20 dark:bg-black/30 dark:border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 shadow-lg">
                      <Users size={28} className="text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-black">50,000+</p>
                      <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Verified Volunteers</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Floating Shapes */}
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl animate-float" />
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl animate-float" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 dark:bg-zinc-950">
        <div className="w-full px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: 'Verified NGOs', value: '2,500+', icon: Globe },
              { label: 'Active Volunteers', value: '50,000+', icon: Users },
              { label: 'Hours Contributed', value: '1.2M+', icon: Heart },
              { label: 'Impact Awards', value: '500+', icon: Award },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.05 }}
                className="text-center rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                  <stat.icon size={24} />
                </div>
                <h3 className="text-3xl font-bold text-zinc-900 dark:text-white">{stat.value}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured NGOs */}
      <section className="bg-zinc-50 py-20 dark:bg-zinc-900">
        <div className="w-full px-8">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Featured Organizations</h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">Trusted NGOs making a real difference across India.</p>
            </div>
            <Link to="/organizations" className="hidden items-center gap-2 font-semibold text-emerald-600 hover:underline md:flex">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Goonj', focus: 'Rural Development', city: 'Delhi', img: 'https://picsum.photos/seed/goonj/400/250' },
              { name: 'Teach For India', focus: 'Education', city: 'Mumbai', img: 'https://picsum.photos/seed/tfi/400/250' },
              { name: 'Akshaya Patra', focus: 'Food & Nutrition', city: 'Bangalore', img: 'https://picsum.photos/seed/ap/400/250' },
            ].map((ngo, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition-all hover:shadow-xl dark:border-white/10 dark:bg-zinc-800"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={ngo.img} alt={ngo.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 rounded-lg bg-white/90 px-3 py-1 text-xs font-bold text-zinc-900 backdrop-blur-sm dark:bg-zinc-700/60 dark:text-white">
                    {ngo.focus}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{ngo.name}</h3>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{ngo.city}, India</p>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                      <CheckCircle2 size={14} /> Verified Partner
                    </div>
                    <Link to="/organizations" className="text-sm font-bold text-zinc-900 dark:text-white">Learn More</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;