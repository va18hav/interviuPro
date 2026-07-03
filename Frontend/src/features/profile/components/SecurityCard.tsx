import { useState } from 'react';
import { Shield } from 'lucide-react';
import { toast } from 'sonner';

interface SecurityCardProps {
  updatePassword: (password: string, options?) => void;
  isUpdating: boolean;
}

export default function SecurityCard({
  updatePassword,
  isUpdating
}: SecurityCardProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdate = () => {
    if (!newPassword) {
      toast.error('Password cannot be empty');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    updatePassword(newPassword, {
      onSuccess: () => {
        setNewPassword('');
        setConfirmPassword('');
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2.5 text-[#00E599] select-none">
        <Shield size={18} />
        <h2 className="text-sm font-extrabold tracking-widest uppercase">Security</h2>
      </div>
      <div className="bg-[#111623] border border-gray-800 rounded-xl p-6 space-y-6">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Change Password</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">New Password</label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-800 bg-[#0B0F19] text-sm text-white focus:outline-none focus:border-[#00E599]/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">Confirm New Password</label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-800 bg-[#0B0F19] text-sm text-white focus:outline-none focus:border-[#00E599]/50 transition-colors"
            />
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="px-6 py-2.5 rounded-md border border-[#00E599]/40 hover:border-[#00E599] bg-[#00E599]/5 hover:bg-[#00E599]/10 text-xs font-black tracking-widest text-[#00E599] hover:text-[#47ffb8] uppercase transition-all duration-300 disabled:opacity-50"
          >
            {isUpdating ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </div>
    </div>
  );
}
