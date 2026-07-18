import { Mic, Code, Network, MessageSquare, BarChart2, Briefcase } from 'lucide-react';

export default function LandingFeatures() {
  const features = [
    {
      title: 'Conversational Voice AI',
      description: 'Interact naturally. Our voice-native AI listens, holds active conversation, and follows up dynamically based on your answers.',
      icon: <Mic size={20} className="text-[#00E599]" />,
      glow: 'shadow-[0_0_30px_rgba(0,229,153,0.04)] hover:border-[#00E599]/20',
    },
    {
      title: 'Monaco Code Editor',
      description: 'Solve algorithms in a fully-integrated Monaco code editor. Supports automatic layouts, word-wrap, and multiple popular languages.',
      icon: <Code size={20} className="text-blue-400" />,
      glow: 'shadow-[0_0_30px_rgba(56,189,248,0.04)] hover:border-blue-500/20',
    },
    {
      title: 'System Design Arch',
      description: 'Tackle architecture questions. Explain load balancers, caching strategies, and replication lag to an AI that knows system trade-offs.',
      icon: <Network size={20} className="text-purple-400" />,
      glow: 'shadow-[0_0_30px_rgba(192,132,252,0.04)] hover:border-purple-500/20',
    },
    {
      title: 'Behavioral & STAR',
      description: 'Master behavioral questions. Refine your delivery, structure, leadership metrics, and communication traits in behavioral rounds.',
      icon: <MessageSquare size={20} className="text-pink-400" />,
      glow: 'shadow-[0_0_30px_rgba(244,114,182,0.04)] hover:border-pink-500/20',
    },
    {
      title: 'Scored Analytics',
      description: 'Receive instant evaluation. Get scored technical understanding, problem-solving, and communication bars + strengths and focus highlights.',
      icon: <BarChart2 size={20} className="text-cyan-400" />,
      glow: 'shadow-[0_0_30px_rgba(34,211,238,0.04)] hover:border-cyan-500/20',
    },
    {
      title: 'Company & Role Setup',
      description: 'Tailor sessions. Setup interviews matching specific experience levels, roles, target skills, or paste a custom job description.',
      icon: <Briefcase size={20} className="text-emerald-400" />,
      glow: 'shadow-[0_0_30px_rgba(52,211,153,0.04)] hover:border-emerald-500/20',
    },
  ];

  return (
    <section id="features" className="py-24 px-6 bg-[#111623]/20 relative">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] font-bold text-[#00E599] uppercase tracking-[0.2em]">
            Core Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Practice Every Engineering Round
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-medium">
            Interviu simulates complete interview formats under realistic conditions with immediate actionable insights.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-xl border border-gray-800 bg-[#111623]/40 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 ${feature.glow}`}
            >
              <div className="space-y-4">
                {/* Icon Container */}
                <div className="w-10 h-10 rounded-lg border border-gray-800 bg-[#181d2c]/50 flex items-center justify-center">
                  {feature.icon}
                </div>
                {/* Text Content */}
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
