import React, { useState } from 'react';
import { Code, X } from 'lucide-react';
import { toast } from 'sonner';
import { GetProfileData, UpdateProfileInput } from '../types/profile.types';

interface TechnicalSkillsCardProps {
  profile: GetProfileData;
  updateProfile: (data: UpdateProfileInput) => void;
  isUpdating: boolean;
}

export default function TechnicalSkillsCard({
  profile,
  updateProfile,
  isUpdating
}: TechnicalSkillsCardProps) {
  const [skills, setSkills] = useState<string[]>(profile?.profiles?.skills || []);
  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    updateProfile({
      skills
    });
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSkill = newSkill.trim();
    if (!cleanSkill) return;
    if (skills.includes(cleanSkill)) {
      toast.warning('Skill already added');
      return;
    }
    setSkills([...skills, cleanSkill]);
    setNewSkill('');
  };

  const handleDeleteSkill = (skillToDelete: string) => {
    setSkills(skills.filter(s => s !== skillToDelete));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2.5 text-[#00E599] select-none">
        <Code size={18} />
        <h2 className="text-sm font-extrabold tracking-widest uppercase">Technical Skills</h2>
      </div>
      <div className="bg-[#111623] border border-gray-800 rounded-xl p-6 space-y-6">
        <div className="flex flex-wrap gap-2.5">
          {skills.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#00E599]/30 bg-[#00E599]/5 text-xs font-bold text-[#00E599] select-none hover:border-[#00E599]/50 transition-colors"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleDeleteSkill(skill)}
                className="text-[#00E599] hover:text-red-400 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          {skills.length === 0 && (
            <span className="text-xs text-gray-500 italic">No skills listed yet</span>
          )}
        </div>
        <form onSubmit={handleAddSkill} className="flex gap-4">
          <input
            type="text"
            placeholder="+ Add custom skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-800 bg-[#0B0F19] text-sm text-white focus:outline-none focus:border-[#00E599]/50 transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-md border border-gray-700 bg-gray-800 hover:bg-gray-700 hover:border-gray-600 text-xs font-black tracking-widest text-white uppercase transition-all"
          >
            Add
          </button>
        </form>
        <div className="flex justify-end pt-2 border-t border-gray-800/60">
          <button
            onClick={handleSave}
            disabled={isUpdating}
            className="px-6 py-2.5 rounded-md border border-[#00E599]/40 hover:border-[#00E599] bg-[#00E599]/5 hover:bg-[#00E599]/10 text-xs font-black tracking-widest text-[#00E599] hover:text-[#47ffb8] uppercase transition-all duration-300 disabled:opacity-50"
          >
            {isUpdating ? 'Saving...' : 'Save Skills'}
          </button>
        </div>
      </div>
    </div>
  );
}
