import LandingNavbar from '../components/LandingNavbar';
import LandingHero from '../components/LandingHero';
import LandingFeatures from '../components/LandingFeatures';
import LandingProductTabs from '../components/LandingProductTabs';
import LandingHowItWorks from '../components/LandingHowItWorks';
import LandingFooter from '../components/LandingFooter';

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative selection:bg-[#00E599]/20 selection:text-[#00E599] font-sans">
      {/* Navbar */}
      <LandingNavbar />

      {/* Main Sections */}
      <main className="flex-grow">
        <LandingHero />
        <LandingFeatures />
        <LandingProductTabs />
        <LandingHowItWorks />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
