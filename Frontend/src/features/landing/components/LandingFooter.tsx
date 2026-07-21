import { Link } from 'react-router-dom';

export default function LandingFooter() {
  return (
    <footer className="border-t border-white/5 bg-black py-16 px-6 font-sans select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img src="/logo.png" alt="Interviu Logo" className="h-8 w-auto group-hover:scale-105 transition-transform duration-300" />
              <span className="text-base font-extrabold tracking-tight text-white">
                Interv<span className="text-[#00E599]">i</span>u
              </span>
            </Link>
            <p className="text-xs text-gray-400 font-normal max-w-sm leading-relaxed">
              An advanced, voice-first simulator for practicing technical screens, coding, system design, and behavioral questions out loud.
            </p>
          </div>

          {/* Practice Columns */}
          <div className="space-y-3.5">
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Practice Rounds</h5>
            <ul className="space-y-2 text-xs text-gray-400 font-normal">
              <li>
                <Link to="/login" className="hover:text-[#00E599] transition-colors">Coding Sandbox</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#00E599] transition-colors">System Architecture</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#00E599] transition-colors">Behavioral STAR</Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-3.5">
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Account</h5>
            <ul className="space-y-2 text-xs text-gray-400 font-normal">
              <li>
                <Link to="/login" className="hover:text-[#00E599] transition-colors">Log In</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#00E599] transition-colors">Get Started</Link>
              </li>
              <li>
                <a href="#" className="hover:text-[#00E599] transition-colors">API Docs</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Divider */}
        <div className="h-px bg-white/5 w-full" />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-normal text-gray-400">
          <p className="text-[11px]">&copy; {new Date().getFullYear()} Interviu. All rights reserved.</p>
          <div className="flex gap-6 uppercase tracking-widest text-[10px] font-mono">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
