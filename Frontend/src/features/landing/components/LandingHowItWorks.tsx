import { Settings2, Mic, TrendingUp } from 'lucide-react';

export default function LandingHowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Define Context',
      description: 'Select target engineering roles, specify your experience level, add key skills, and paste job descriptions to customize AI interview parameters.',
      icon: <Settings2 size={18} className="text-[#00E599]" />,
    },
    {
      step: '02',
      title: 'Practice Live',
      description: 'Speak directly into the mic. Code live in the workspace, resolve architecture issues, or build stories as the AI interviewer leads the session.',
      icon: <Mic size={18} className="text-[#00E599]" />,
    },
    {
      step: '03',
      title: 'Review Analytics',
      description: 'Receive scored performance breakdown, verdict recommendations, technical alignment metrics, and transcripts right after each session.',
      icon: <TrendingUp size={18} className="text-[#00E599]" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] font-bold text-[#00E599] uppercase tracking-[0.2em]">
            Step-By-Step
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Simple, Structured Workflows
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-medium">
            Jump into hyper-focused engineering practice in three simple steps.
          </p>
        </div>

        {/* Timeline Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-[52px] left-[15%] right-[15%] h-px bg-gradient-to-r from-gray-800/20 via-gray-850 to-gray-800/20 z-0" />

          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center space-y-4 group">
              {/* Step bubble */}
              <div className="w-12 h-12 rounded-full border border-gray-850 bg-[#0B0F19] group-hover:border-[#00E599]/40 flex items-center justify-center text-xs font-bold text-[#00E599] transition-all duration-300 relative">
                {step.icon}
                <span className="absolute -top-1.5 -right-1.5 px-1 py-0.5 rounded-full bg-gray-900 border border-gray-850 text-[8px] font-black text-gray-500">
                  {step.step}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2 max-w-sm">
                <h3 className="text-lg font-bold text-white group-hover:text-[#00E599] transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
