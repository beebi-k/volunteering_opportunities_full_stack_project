import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Plus, ArrowRight, Calendar, ShieldCheck, X } from 'lucide-react';

const GroupVolunteering = () => {
  // ✅ Converted to state (logic same, structure same)
  const [groups, setGroups] = useState([
    { id: 1, name: 'Mumbai Eco Warriors', members: 45, events: 12, impact: '500h', img: 'https://picsum.photos/seed/group1/400/200', joined: false },
    { id: 2, name: 'Delhi Tech Mentors', members: 28, events: 8, impact: '320h', img: 'https://picsum.photos/seed/group2/400/200', joined: false },
    { id: 3, name: 'Bangalore Food Heroes', members: 62, events: 24, impact: '840h', img: 'https://picsum.photos/seed/group3/400/200', joined: false },
  ]);

  // ✅ Modal state
  const [showModal, setShowModal] = useState(false);

  // ✅ New group form state
  const [newGroup, setNewGroup] = useState({
    name: '',
    img: '',
  });

  // ✅ Create group handler
  const handleCreateGroup = () => {
    if (!newGroup.name) return;

    const groupToAdd = {
      id: Date.now(),
      name: newGroup.name,
      members: 1,
      events: 0,
      impact: '0h',
      img: newGroup.img || `https://picsum.photos/seed/${Date.now()}/400/200`,
      joined: true,
    };

    setGroups([...groups, groupToAdd]);
    setShowModal(false);
    setNewGroup({ name: '', img: '' });
  };

  // ✅ Join group handler
  const handleJoinGroup = (id) => {
    const updatedGroups = groups.map(group =>
      group.id === id
        ? { ...group, members: group.members + 1, joined: true }
        : group
    );
    setGroups(updatedGroups);
  };

  return (
    <div className="flex h-full flex-col bg-gradient-to-br from-white to-emerald-50 dark:from-zinc-950 dark:to-zinc-900">

      {/* Header */}
      <header className="flex items-center justify-between border-b border-black/5 px-8 py-10 backdrop-blur-lg dark:border-white/10">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Group Volunteering
          </h1>
          <p className="mt-2 text-lg text-zinc-500">
            Volunteering is better with friends. Join or create a team.
          </p>
        </div>

        {/* ✅ Create Group Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="flex items-center gap-3 rounded-2xl bg-emerald-600 px-8 py-4 text-lg font-black text-white shadow-2xl shadow-emerald-600/30 transition-all hover:bg-emerald-700 hover:scale-105"
        >
          <Plus size={24} /> Create a Group
        </motion.button>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-6xl">

          {/* Stats Section */}
          <div className="mb-12 grid gap-8 md:grid-cols-3">
            {[
              { label: 'Active Groups', value: groups.length, icon: Users },
              { label: 'Group Events', value: '450+', icon: Calendar },
              { label: 'Collective Impact', value: '25,000h', icon: ShieldCheck },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-[32px] border border-black/5 bg-white/70 backdrop-blur-lg p-8 shadow-xl dark:border-white/10 dark:bg-zinc-800/60"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg">
                  <stat.icon size={24} />
                </div>
                <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                <p className="mt-1 text-3xl font-black text-zinc-900 dark:text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <h2 className="mb-8 text-2xl font-black text-zinc-900 dark:text-white">
            Popular Groups Near You
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <motion.div
                key={group.id}
                whileHover={{ y: -10 }}
                className="group overflow-hidden rounded-[40px] border border-black/5 bg-white shadow-lg transition-all hover:shadow-2xl dark:border-white/10 dark:bg-zinc-800"
              >
                <div className="relative h-48">
                  <img
                    src={group.img}
                    alt={group.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-xl font-bold text-white">{group.name}</h3>
                  </div>
                </div>

                <div className="p-8">
                  <div className="mb-6 grid grid-cols-3 gap-4 border-b border-black/5 pb-6 dark:border-white/10">
                    <div className="text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Members</p>
                      <p className="text-lg font-black text-zinc-900 dark:text-white">{group.members}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Events</p>
                      <p className="text-lg font-black text-zinc-900 dark:text-white">{group.events}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Impact</p>
                      <p className="text-lg font-black text-emerald-600">{group.impact}</p>
                    </div>
                  </div>

                  {/* ✅ Join Button Working */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleJoinGroup(group.id)}
                    disabled={group.joined}
                    className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-bold text-white transition-all ${
                      group.joined
                        ? 'bg-emerald-500 cursor-not-allowed'
                        : 'bg-zinc-900 hover:bg-emerald-600 dark:bg-zinc-700'
                    }`}
                  >
                    {group.joined ? 'Joined' : 'Join Group'} <ArrowRight size={18} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Create Group Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              className="w-96 rounded-3xl bg-white p-8 shadow-2xl dark:bg-zinc-900"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-black">Create New Group</h2>
                <button onClick={() => setShowModal(false)}>
                  <X />
                </button>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Group Name"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  className="w-full rounded-xl border p-3 text-sm"
                />

                <input
                  type="text"
                  placeholder="Image URL (optional)"
                  value={newGroup.img}
                  onChange={(e) => setNewGroup({ ...newGroup, img: e.target.value })}
                  className="w-full rounded-xl border p-3 text-sm"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm">
                  Cancel
                </button>
                <button
                  onClick={handleCreateGroup}
                  className="rounded-xl bg-emerald-600 px-6 py-2 text-sm font-bold text-white hover:bg-emerald-700"
                >
                  Create
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GroupVolunteering;