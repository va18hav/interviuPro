import { ChevronDown, X, Type, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import type { InterviewContext } from '../types/interviewContext.types';
// import { getProfile } from '../../../dashboard/services/dashboardServices';

interface SetupFormProps {
  onSubmit: (context: InterviewContext) => void
  isPending: boolean
}

export default function SetupForm({ onSubmit, isPending }: SetupFormProps) {

  const roleOptions: string[] = ['SDE', 'Backend Developer', 'Frontend Developer', 'Full-Stack Developer', 'AI Full Stack Developer']
  const [title, setTitle] = useState('')
  const [role, setRole] = useState('SDE')
  const [experience, setExperience] = useState('')
  const [activeSkill, setActiveSkill] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [jobDescription, setJobDescription] = useState('')

  const handleSubmit = () => {
    onSubmit({ title, role, skills, experience, jobDescription })
  }

  return (
    <div className="bg-[#111623] border border-gray-800 rounded-xl p-6 max-w-3xl w-full mx-auto">

      {/* Title */}
      <div className="mb-4">
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Title</label>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          value={title}
          placeholder="e.g. Senior Frontend Engineer at Stripe"
          className="w-full bg-[#0B0F19] border border-gray-800 rounded-md px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00E599] transition-colors"
        />
      </div>

      {/* Role & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        {/* Role */}
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Role</label>
          <div className="relative">
            <select
              onChange={(e) => {
                setRole(e.target.value)
              }}
              value={role}
              className="w-full bg-[#0B0F19] border border-gray-800 rounded-md px-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-[#00E599] transition-colors cursor-pointer">
              {roleOptions.map((role: string) => {
                return (
                  <option>{role}</option>
                )
              })}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Exp */}
        <div className="mb-4">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Experience</label>
          <input
            type="text"
            onChange={(e) => {
              setExperience(e.target.value)
            }}
            value={experience}
            placeholder="2 Years"
            className="w-full bg-[#0B0F19] border border-gray-800 rounded-md px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00E599] transition-colors"
          />
        </div>

      </div>

      {/* Skills */}
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
                  skills.push(activeSkill)
                  setActiveSkill('')
                }
              }
            }}
            value={activeSkill}
            placeholder="Add skill..."
            className="flex-1 min-w-[80px] bg-transparent border-none text-xs text-white placeholder-gray-600 focus:outline-none px-2"
          />
        </div>
      </div>

      {/* Job Description */}
      <div className="mb-4 relative">
        <div className="flex justify-between mb-2">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Job Description</label>
          <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest">Optional</span>
        </div>
        <textarea
          rows={4}
          onChange={(e) => {
            setJobDescription(e.target.value)
          }}
          value={jobDescription}
          placeholder="Paste the job description here. The AI will tailor the interview questions to this specific role."
          className="w-full bg-[#0B0F19] border border-gray-800 rounded-md px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00E599] transition-colors resize-none"
        ></textarea>
        <div className="absolute bottom-4 right-4 flex items-center gap-1 text-gray-600">
          <Type size={12} />
          <span className="text-[10px] font-bold tracking-widest">Markdown Supported</span>
        </div>
      </div>

      {/* Footer is injected here */}
      <div className="mt-4 pt-6 border-t border-gray-800 flex items-center">
        {/* Start Button */}
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-[#00E599] hover:bg-[#00c985] text-black font-bold text-sm rounded-md transition-all shadow-[0_0_15px_rgba(0,229,153,0.3)]">
          {isPending ? 'Creating....' : 'Create Interview'}
          <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
}
