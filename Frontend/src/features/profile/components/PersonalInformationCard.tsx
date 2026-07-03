import { useState } from 'react';
import { User, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface PersonalInformationCardProps {
  profile: any;
  updateProfile: (data: any) => void;
  isUpdating: boolean;
}

export default function PersonalInformationCard({
  profile,
  updateProfile,
  isUpdating
}: PersonalInformationCardProps) {
  const [firstName, setFirstName] = useState(profile?.profiles?.firstName || '');
  const [lastName, setLastName] = useState(profile?.profiles?.lastName || '');

  const handleSave = () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast.error('First name and last name cannot be empty');
      return;
    }
    updateProfile({
      firstName: firstName.trim(),
      lastName: lastName.trim()
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2.5 text-[#00E599] select-none">
        <User size={18} />
        <h2 className="text-sm font-extrabold tracking-widest uppercase">Personal Information</h2>
      </div>
      <div className="bg-[#111623] border border-gray-800 rounded-xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-800 bg-[#0B0F19] text-sm text-white focus:outline-none focus:border-[#00E599]/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-800 bg-[#0B0F19] text-sm text-white focus:outline-none focus:border-[#00E599]/50 transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">Email Address (Read-Only)</label>
          <div className="relative">
            <input
              type="text"
              readOnly
              value={profile?.email || ''}
              className="w-full px-4 py-2.5 pr-10 rounded-lg border border-gray-800 bg-[#0B0F19]/60 text-sm text-gray-400 select-none cursor-not-allowed outline-none"
            />
            <Lock size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            disabled={isUpdating}
            className="px-6 py-2.5 rounded-md border border-[#00E599]/40 hover:border-[#00E599] bg-[#00E599]/5 hover:bg-[#00E599]/10 text-xs font-black tracking-widest text-[#00E599] hover:text-[#47ffb8] uppercase transition-all duration-300 disabled:opacity-50"
          >
            {isUpdating ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
