import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Filter, Globe, ExternalLink, Mail, ArrowRight } from 'lucide-react';
import { orgService } from '../services/api';
import { Link } from 'react-router-dom';

const Organizations = () => {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [focusFilter, setFocusFilter] = useState('');

  useEffect(() => {
    orgService.getAll({ city: cityFilter, focus: focusFilter })
      .then(res => setOrgs(res.data))
      .finally(() => setLoading(false));
  }, [cityFilter, focusFilter]);

  const filteredOrgs = orgs.filter(org => 
    org.name.toLowerCase().includes(search.toLowerCase()) ||
    org.focus_area.toLowerCase().includes(search.toLowerCase())
  );

  const cities = [...new Set(orgs.map(o => o.city))].filter(Boolean);
  const focusAreas = [...new Set(orgs.map(o => o.focus_area))].filter(Boolean);

  return (
    <div className="w-full px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
          Discover <span className="text-emerald-600">NGOs</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Connect with verified organizations working on the ground across India. 
          Filter by city or focus area to find your perfect match.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or focus area..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-black/5 bg-white py-4 pl-12 pr-4 text-zinc-900 outline-none focus:border-emerald-600 dark:border-white/10 dark:bg-zinc-800 dark:text-white shadow-sm"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="rounded-2xl border border-black/5 bg-white px-4 py-4 text-sm font-medium text-zinc-700 outline-none focus:border-emerald-600 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300 shadow-sm"
          >
            <option value="">All Cities</option>
            {cities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
          <select
            value={focusFilter}
            onChange={(e) => setFocusFilter(e.target.value)}
            className="rounded-2xl border border-black/5 bg-white px-4 py-4 text-sm font-medium text-zinc-700 outline-none focus:border-emerald-600 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300 shadow-sm"
          >
            <option value="">All Focus Areas</option>
            {focusAreas.map(focus => <option key={focus} value={focus}>{focus}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-80 animate-pulse rounded-3xl bg-zinc-100 dark:bg-zinc-800" />
          ))}
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredOrgs.map((org, i) => (
            <motion.div
              key={org.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group flex flex-col rounded-3xl border border-black/5 bg-white p-6 shadow-sm transition-all hover:shadow-xl dark:border-white/10 dark:bg-zinc-800"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                  {org.logo_url ? (
                    <img src={org.logo_url} alt={org.name} className="h-full w-full rounded-2xl object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <Globe size={32} />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{org.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
                    <MapPin size={14} /> {org.city}, {org.state}
                  </div>
                </div>
              </div>

              <p className="mb-6 flex-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
                {org.description}
              </p>

              <div className="mb-6 flex flex-wrap gap-2">
                <span className="rounded-lg bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
                  {org.focus_area}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-black/5 pt-6 dark:border-white/10">
                <div className="flex gap-3">
                  {org.website && (
                    <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-emerald-600">
                      <ExternalLink size={18} />
                    </a>
                  )}
                  {org.contact_email && (
                    <a href={`mailto:${org.contact_email}`} className="text-zinc-400 hover:text-emerald-600">
                      <Mail size={18} />
                    </a>
                  )}
                </div>
                <a
                  href={org.website || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm font-bold text-emerald-600 hover:underline"
                >
                  View Profile <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && filteredOrgs.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-zinc-500">No organizations found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Organizations;
