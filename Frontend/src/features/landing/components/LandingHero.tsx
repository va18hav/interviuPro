import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

export default function LandingHero() {
  return (
    <section className="relative pt-24 pb-20 px-6 overflow-hidden">
      {/* Decorative Blur Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00E599]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
        {/* Banner Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00E599]/25 bg-[#00E599]/5 text-[10px] md:text-xs font-black uppercase tracking-wider text-[#00E599] select-none animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-pulse" />
          <span>Conversational Voice AI Interviewer</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] max-w-4xl mx-auto">
          Master the Interview.<br />
          <span className="bg-gradient-to-r from-emerald-400 to-[#00E599] bg-clip-text text-transparent">
            Speak with Confidence.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-base md:text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
          Practice realistic voice coding, system design, and behavioral interviews with Interviu. Get scored performance analytics and detailed feedback after every round.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/login"
            className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-[#00E599] hover:bg-[#00c985] text-black font-extrabold text-sm rounded-lg transition-all shadow-[0_0_20px_rgba(0,229,153,0.25)] hover:shadow-[0_0_25px_rgba(0,229,153,0.45)] w-full sm:w-auto"
          >
            <span>Start Practice Free</span>
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a
            href="#features"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-gray-700 hover:border-gray-500 bg-gray-900/30 hover:bg-gray-900/60 text-white font-bold text-sm transition-all w-full sm:w-auto"
          >
            <Play size={14} className="fill-white" />
            <span>Explore Features</span>
          </a>
        </div>

        {/* App Showcase Screenshot Mockup */}
        <div className="relative mt-20 max-w-4xl mx-auto rounded-xl border border-gray-800 bg-[#111623]/30 shadow-[0_0_60px_rgba(0,229,153,0.06)] overflow-hidden scale-[0.99] hover:scale-100 transition-all duration-700 group">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00E599]/30 to-transparent" />
          <img
            src="/app_preview.png"
            alt="Interviu App Interface Mockup"
            className="w-full h-auto object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-500"
          />
        </div>
      </div>
    </section>
  );
}
