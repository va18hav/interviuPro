import { ArrowRight, Code, MessageSquare, Cpu, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingFeatures() {
  const cards = [
    {
      title: 'Coding Practice',
      desc: 'Write solution algorithms live in Monaco editor while explaining logic out loud.',
      icon: <Code size={18} className="text-[#00E599]" />,
      action: 'Start Coding'
    },
    {
      title: 'Custom Job Tailoring',
      desc: 'Paste target JDs to get questions matched to the exact tech stack & seniority.',
      icon: <Cpu size={18} className="text-[#00E599]" />,
      action: 'Configure JD'
    },
    {
      title: 'Behavioral & STAR',
      desc: 'Practice STAR method answers out loud with conversational follow-up questions.',
      icon: <MessageSquare size={18} className="text-[#00E599]" />,
      action: 'Speak Out Loud'
    },
    {
      title: 'Instant Feedback',
      desc: 'Get a breakdown of technical accuracy, speech clarity, and actionable tips.',
      icon: <Activity size={18} className="text-[#00E599]" />,
      action: 'View Metrics'
    }
  ];

  return (
    <section id="features" className="py-24 px-6 bg-black text-center font-sans select-none border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-white/5 bg-[#0A0A0A] hover:border-[#00E599]/20 transition-all duration-300 flex flex-col justify-between items-start text-left group"
            >
              <div className="space-y-4">
                <div className="w-9 h-9 rounded-lg bg-[#00E599]/5 border border-[#00E599]/10 flex items-center justify-center">
                  {card.icon}
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">{card.title}</h4>
                  <p className="text-xs text-gray-400 font-normal leading-relaxed">{card.desc}</p>
                </div>
              </div>
              <Link
                to="/login"
                className="mt-6 flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 group-hover:text-[#00E599] transition-colors"
              >
                <span>{card.action}</span>
                <ArrowRight size={10} className="transform group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
