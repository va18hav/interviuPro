import { Link } from 'react-router-dom';

export default function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black/60 backdrop-blur-xl border-b border-white/5 transition-all select-none font-sans">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="Interviu Logo" className="h-9 w-auto group-hover:scale-105 transition-transform duration-300" />
          <h2 className="text-xl font-extrabold tracking-tight text-white font-sans">
            Interv<span className="text-[#00E599] group-hover:text-[#00c985] transition-colors">i</span>u
          </h2>
        </Link>

        {/* Middle: Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-xs font-semibold text-gray-400 hover:text-white uppercase tracking-wider transition-all relative py-1.5 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#00E599] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-xs font-semibold text-gray-400 hover:text-white uppercase tracking-wider transition-all relative py-1.5 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#00E599] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            How It Works
          </a>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-xs font-semibold text-gray-400 hover:text-white uppercase tracking-wider transition-colors px-3 py-1.5"
          >
            Log In
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center px-4.5 py-2 bg-gradient-to-r from-[#00E599] to-emerald-400 hover:from-[#00c985] hover:to-emerald-500 text-black font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all shadow-[0_0_20px_rgba(0,229,153,0.25)] hover:shadow-[0_0_25px_rgba(0,229,153,0.45)] hover:-translate-y-0.5 duration-200"
          >
            Start Practice
          </Link>
        </div>
      </div>
    </header>
  );
}
