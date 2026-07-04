import { X, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useUploadProfileData } from '../hooks/profileDataHook';
import { toast } from 'sonner';

export default function Step1Profile({ onNext }: { onNext: () => void }) {
  const { createProfile, isPending } = useUploadProfileData()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [activeSkill, setActiveSkill] = useState('')
  const [skills, setSkills] = useState<string[]>([])

  const handleSubmit = () => {
    if (!firstName) {
      toast.error('First Name is required');
      return;
    }
    const data = { firstName, lastName, skills }
    createProfile(data, {
      onSuccess: () => {
        onNext();
      }
    });
  }
  return (
    <div className="w-full relative max-w-2xl mx-auto flex flex-col items-center">
      {/* Header text */}
      <div className="text-center mb-10 mt-8">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Let's set up your profile</h1>
        <p className="text-sm text-gray-400">Tell us a bit about yourself and your technical expertise to tailor your experience.</p>
      </div>

      <div className="w-full space-y-8">

        {/* Personal Info Section */}
        <section>
          <div className="border-b border-gray-800 pb-2 mb-3">
            <h2 className="text-[10px] font-bold text-[#00E599] uppercase tracking-[0.2em]">Personal Info</h2>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                First Name <span className="text-[#00E599]">*</span>
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
                value={firstName}
                className="w-full bg-transparent border border-gray-800 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E599] transition-colors"
              />
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Last Name
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
                value={lastName}
                className="w-full bg-transparent border border-gray-800 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E599] transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Technical Skills Section */}
        <section>
          <div className='mb-4'>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Skills</label>
            <div className="flex flex-wrap items-center gap-2 bg-[#0B0F19] border border-gray-800 rounded-md p-4 min-h-[46px]">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-1.5 px-3 py-1 bg-[#00E599]/10 border border-[#00E599]/30 rounded-full text-[11px] font-bold text-[#00E599]">
                  {skill}
                  <X size={12}
                    onClick={() => {
                      setSkills(prev => prev.filter((_, i) => i !== index))
                    }}
                    className="cursor-pointer hover:text-white" />
                </div>
              ))}
              <input
                type="text"
                onChange={(e) => {
                  if (e.target.value !== ',' && e.target.value !== '.' && e.target.value !== ' ') {
                    setActiveSkill(e.target.value)
                  }
                }}
                onKeyDown={(e) => {
                  if (activeSkill !== '') {
                    if (e.key === 'Enter' || e.key === ',') {
                      e.preventDefault()
                      setSkills(prev => [...prev, activeSkill])
                      setActiveSkill('')
                    }
                  }
                }}
                value={activeSkill}
                placeholder="Add skils. Press ',' or 'Enter' after typing the skill"
                className="flex-1 min-w-[80px] bg-transparent border-none text-xs text-white placeholder-gray-600 focus:outline-none px-2"
              />
            </div>
          </div>
        </section>

        {/* Bottom Actions */}
        <div className="pt-8">
          <button
            disabled={isPending}
            onClick={handleSubmit}
            className="relative w-full bg-[#00E599] hover:bg-[#00c985] text-black font-semibold py-3.5 rounded-md text-sm transition-all flex justify-center items-center overflow-hidden"
          >
            <span className={`flex items-center gap-2 transition-all duration-300 ${isPending ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              Continue to Experience
            </span>
            {isPending && (
              <span className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="animate-spin text-black" size={18} strokeWidth={2.5} />
              </span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
