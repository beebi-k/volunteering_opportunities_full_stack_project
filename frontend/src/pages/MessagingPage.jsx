import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Send, MoreVertical, Phone, Video, Image as ImageIcon, Paperclip } from 'lucide-react';

const MessagingPage = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');

  const chats = [
    { id: 1, name: 'Goonj Coordinator', lastMsg: 'The drive starts at 9 AM tomorrow.', time: '10:30 AM', unread: 2, avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Teach For India', lastMsg: 'Thank you for your application!', time: 'Yesterday', unread: 0, avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Sofia (Volunteer)', lastMsg: 'Are you coming to the beach cleanup?', time: 'Monday', unread: 0, avatar: 'https://i.pravatar.cc/150?u=3' },
  ];

  const messages = [
    { id: 1, text: 'Hello! I had a question about the upcoming drive.', sender: 'me', time: '10:00 AM' },
    { id: 2, text: 'Sure, go ahead!', sender: 'them', time: '10:05 AM' },
    { id: 3, text: 'The drive starts at 9 AM tomorrow. Please be on time!', sender: 'them', time: '10:30 AM' },
  ];

  return (
    <div className="flex h-full bg-white dark:bg-zinc-950">
      {/* Sidebar */}
      <div className="flex w-80 flex-col border-r border-black/5 dark:border-white/10">
        <div className="p-6">
          <h1 className="mb-6 text-2xl font-black text-zinc-900 dark:text-white">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full rounded-xl border border-black/5 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-emerald-500 dark:border-white/10 dark:bg-zinc-900"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {chats.map(chat => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`flex w-full items-center gap-4 px-6 py-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900 ${selectedChat === chat.id ? 'bg-emerald-50/50 dark:bg-emerald-500/5' : ''}`}
            >
              <div className="relative h-12 w-12 flex-shrink-0">
                <img src={chat.avatar} alt={chat.name} className="h-full w-full rounded-full object-cover" />
                {chat.unread > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                    {chat.unread}
                  </span>
                )}
              </div>
              <div className="flex-1 overflow-hidden text-left">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-bold text-zinc-900 dark:text-white">{chat.name}</p>
                  <span className="text-[10px] text-zinc-400">{chat.time}</span>
                </div>
                <p className="truncate text-xs text-zinc-500">{chat.lastMsg}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-black/5 px-8 py-4 dark:border-white/10">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800">
              <img src={chats.find(c => c.id === selectedChat)?.avatar} className="h-full w-full rounded-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-white">{chats.find(c => c.id === selectedChat)?.name}</p>
              <p className="text-[10px] font-medium text-emerald-600">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <button className="hover:text-emerald-600"><Phone size={20} /></button>
            <button className="hover:text-emerald-600"><Video size={20} /></button>
            <button className="hover:text-emerald-600"><MoreVertical size={20} /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm ${
                msg.sender === 'me' 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                  : 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
              }`}>
                <p>{msg.text}</p>
                <p className={`mt-1 text-[10px] ${msg.sender === 'me' ? 'text-emerald-100' : 'text-zinc-400'}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-6">
          <div className="flex items-center gap-4 rounded-2xl border border-black/5 bg-zinc-50 p-2 dark:border-white/10 dark:bg-zinc-900">
            <div className="flex gap-2 px-2 text-zinc-400">
              <button className="hover:text-emerald-600"><ImageIcon size={20} /></button>
              <button className="hover:text-emerald-600"><Paperclip size={20} /></button>
            </div>
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..." 
              className="flex-1 bg-transparent py-2 text-sm outline-none dark:text-white"
            />
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
