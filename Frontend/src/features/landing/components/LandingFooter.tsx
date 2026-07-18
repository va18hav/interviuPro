import { Link } from 'react-router-dom';

export default function LandingFooter() {
  return (
    <footer className="border-t border-gray-800/80 bg-[#0B0F19] py-8 px-6 transition-all select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Interviu Logo" className="h-6 w-auto" />
          <span className="text-base font-bold tracking-tight text-white font-inter">
            Interv<span className="text-[#00E599]">i</span>u
          </span>
        </Link>

        {/* Center: Copyright */}
        <p className="text-gray-550 text-xs font-medium">
          &copy; {new Date().getFullYear()} Interviu. All rights reserved.
        </p>

        {/* Right: Policy Links */}
        <div className="flex gap-6 text-xs font-semibold text-gray-500 uppercase tracking-widest">
          <a href="#" className="hover:text-gray-300 transition-colors">
            Terms
          </a>
          <span className="text-gray-800">•</span>
          <a href="#" className="hover:text-gray-300 transition-colors">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
