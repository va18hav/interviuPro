import React from 'react';
import { Lock, Code, X, FileText, Shield, User } from 'lucide-react';

const PersonalInfoSection = () => {
  return (
    <section>
      <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-6">
        <User size={18} className="text-[#00E599]" /> Personal Information
      </h3>
      
      <div className="bg-[#111623] border border-gray-800 rounded-xl p-6 space-y-6">
        <div className="flex gap-6">
          <div className="flex-1 space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              First Name
            </label>
            <input 
              type="text" 
              defaultValue="Linus"
              className="w-full bg-[#0B0F19] border border-gray-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E599] transition-colors"
            />
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Last Name
            </label>
            <input 
              type="text" 
              defaultValue="Torvalds"
              className="w-full bg-[#0B0F19] border border-gray-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E599] transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Email Address (Read-Only)
          </label>
          <div className="relative">
            <input 
              type="email" 
              readOnly
              defaultValue="linus.torvalds@kernel.org"
              className="w-full bg-[#0B0F19] border border-gray-800 rounded px-4 py-3 text-sm text-gray-500 focus:outline-none cursor-not-allowed"
            />
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
          </div>
        </div>
      </div>
    </section>
  );
};

const TechnicalSkillsSection = () => {
  return (
    <section>
      <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-6">
        <Code size={18} className="text-[#00E599]" /> Technical Skills
      </h3>
      
      <div className="bg-[#111623] border border-gray-800 rounded-xl p-6 space-y-6">
        <div className="flex flex-wrap gap-3">
          {['Python', 'React', 'Go'].map(skill => (
            <div key={skill} className="flex items-center gap-2 px-4 py-1.5 bg-[#00E599]/10 border border-[#00E599]/30 rounded-full text-xs font-semibold text-[#00E599]">
              {skill}
              <button className="hover:text-white transition-colors">
                <X size={12} />
              </button>
            </div>
          ))}
          
          <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-800 border border-gray-700 rounded-full text-xs font-semibold text-gray-400">
            Rust
            <button className="hover:text-gray-200 transition-colors">
              <X size={12} />
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="+ Add custom skill"
            className="flex-1 bg-[#0B0F19] border border-gray-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E599] transition-colors"
          />
          <button type="button" className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-xs font-bold text-gray-300 uppercase tracking-widest rounded transition-colors border border-gray-700">
            Add
          </button>
        </div>
      </div>
    </section>
  );
};

const ResumeSection = () => {
  return (
    <section>
      <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-6">
        <FileText size={18} className="text-[#00E599]" /> Resume
      </h3>
      
      <div className="bg-[#111623] border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#1A2235] rounded flex items-center justify-center">
               <FileText className="text-[#00E599]" size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">resume_linus_v3.pdf</p>
              <p className="text-xs text-gray-500 mt-1">Uploaded on Oct 12, 2023 • 1.2 MB</p>
            </div>
          </div>
          
          <button type="button" className="px-6 py-2 bg-transparent border border-gray-700 hover:border-gray-500 hover:text-white text-xs font-bold text-gray-300 uppercase tracking-widest rounded transition-colors">
            Replace
          </button>
        </div>
      </div>
    </section>
  );
};

const SecuritySection = () => {
  return (
    <section>
      <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-6">
        <Shield size={18} className="text-[#00E599]" /> Security
      </h3>
      
      <div className="bg-[#111623] border border-gray-800 rounded-xl p-6">
        <h4 className="text-sm font-semibold text-white mb-6">Change Password</h4>
        
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Current Password
          </label>
          <input 
            type="password" 
            defaultValue="password123"
            className="w-full bg-[#0B0F19] border border-gray-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E599] transition-colors tracking-widest"
          />
        </div>
      </div>
    </section>
  );
};

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans p-8 flex justify-center">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <header className="flex justify-between items-center border-b border-gray-800 pb-6 mb-8">
          <h1 className="text-2xl font-bold">Settings</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-gray-400">00:15:24</span>
            <button className="px-4 py-2 border border-[#00E599] text-[#00E599] hover:bg-[#00E599] hover:text-black rounded text-sm font-medium transition-colors">
              End Interview
            </button>
          </div>
        </header>

        {/* Settings Content */}
        <div className="space-y-12 pb-20">
          <PersonalInfoSection />
          <TechnicalSkillsSection />
          <ResumeSection />
          <SecuritySection />
        </div>
      </div>
    </div>
  );
}
