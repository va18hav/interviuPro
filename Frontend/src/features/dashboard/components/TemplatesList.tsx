import { Lock } from 'lucide-react';

export default function TemplatesList() {
  const templates = [
    { title: 'Senior Frontend Eng', tech: 'React, System Design' },
    { title: 'Backend Architecture', tech: 'Go, Microservices' },
    { title: 'Data Structures', tech: 'Algorithms, Python' },
  ];

  return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-300">Templates</h3>
        <div className="bg-gray-800/50 border border-gray-700 rounded-full px-3 py-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Coming soon</span>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {templates.map((template, i) => (
          <div key={i} className="flex items-center gap-4 bg-[#111623] border border-gray-800 rounded-xl p-5 opacity-70">
            <Lock size={18} className="text-gray-500" />
            <div>
              <h4 className="text-sm font-bold text-gray-300 mb-1">{template.title}</h4>
              <p className="text-xs text-gray-500 font-mono">{template.tech}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
