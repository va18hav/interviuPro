import { Plus } from 'lucide-react';
import { useState } from 'react';
import * as profileServices from '../services/profileServices'

export default function Step1Profile({ onNext }: { onNext: () => void }) {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [activeSkill, setActiveSkill] = useState('')
  const [skills, setSkills] = useState([])

  const handleSubmit = async () => {
    if (!firstName) {
      console.log('Please enter your first name')
    }
    const data = { firstName, lastName, skills }
    const result = await profileServices.createProfile(data)
    if (result.data.success) {
      console.log(result.data)
      onNext()
    }
    else {
      console.log(result.data)
    }
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
          <div className="border-b border-gray-800 pb-2 mb-3">
            <h2 className="text-[10px] font-bold text-[#00E599] uppercase tracking-[0.2em]">Technical Skills</h2>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Select Your Core Technologies
            </label>

            <div className="mt-2 flex flex-wrap gap-2">
              {skills.map((skill) => {
                return (
                  <button
                    key={skill}
                    className='px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors bg-[#00E599] border-[#00E599] text-black'
                  >
                    {skill}
                  </button>
                )
              })}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                onChange={(e) => {
                  setActiveSkill(e.target.value)
                }}
                value={activeSkill}
                placeholder="Add custom skill (e.g. Kubernetes)"
                className="flex-1 bg-transparent border border-gray-800 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00E599] transition-colors"
              />
              <button
                type="button"
                onClick={() => {
                  setSkills([...skills, activeSkill])
                  setActiveSkill('')
                }}
                className="w-12 flex items-center justify-center bg-[#1A2235] hover:bg-[#232D45] text-[#00E599] rounded-md transition-colors border border-gray-800">
                <Plus size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* Bottom Actions */}
        <div className="pt-8">
          <button onClick={handleSubmit} className="w-full bg-[#00E599] hover:bg-[#00c985] text-black font-semibold py-3.5 rounded-md text-sm transition-colors">
            Continue to Experience
          </button>
        </div>

      </div>
    </div>
  );
}
