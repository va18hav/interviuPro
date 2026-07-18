import LandingNavbar from '../components/LandingNavbar';
import LandingHero from '../components/LandingHero';
import LandingFeatures from '../components/LandingFeatures';
import LandingHowItWorks from '../components/LandingHowItWorks';
import LandingFooter from '../components/LandingFooter';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col relative overflow-x-hidden selection:bg-[#00E599]/20 selection:text-[#00E599]">
      {/* Navbar */}
      <LandingNavbar />

      {/* Main Sections */}
      <main className="flex-grow">
        <LandingHero />
        <LandingFeatures />
        <LandingHowItWorks />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
