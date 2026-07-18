import { Link } from 'react-router-dom';

export default function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0F19]/80 backdrop-blur-lg border-b border-gray-800/80 transition-all select-none">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Interviu Logo" className="h-8 w-auto" />
          <h2 className="text-xl font-bold tracking-tight text-white font-inter">
            Interv<span className="text-[#00E599]">i</span>u
          </h2>
        </Link>

        {/* Middle: Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm font-semibold text-gray-400 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-semibold text-gray-400 hover:text-white transition-colors"
          >
            How It Works
          </a>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-semibold text-gray-400 hover:text-white transition-colors px-3 py-1.5"
          >
            Log In
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center px-4 py-2 bg-[#00E599] hover:bg-[#00c985] text-black font-bold text-xs uppercase tracking-wider rounded transition-all shadow-[0_0_15px_rgba(0,229,153,0.15)] hover:shadow-[0_0_20px_rgba(0,229,153,0.3)]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
