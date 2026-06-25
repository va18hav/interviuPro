import { LayoutDashboard, FileText, BarChart2, Settings, Hexagon } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, active: true },
    { name: 'My Interviews', icon: <FileText size={18} />, active: false },
    { name: 'Results', icon: <BarChart2 size={18} />, active: false },
    { name: 'Settings', icon: <Settings size={18} />, active: false },
  ];

  return (
    <aside className="hidden lg:flex w-64 border-r border-gray-800 bg-[#0B0F19] flex-col justify-between h-screen sticky top-0">

      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="p-6 mb-4">
          <h2 className="text-xl font-bold tracking-tight text-white">
            Interviu<span className="text-[#00E599]">.</span>
          </h2>
          <p className="text-[10px] text-gray-400 font-medium tracking-widest mt-1 uppercase">
            Voice AI
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <div
              key={item.name}
              className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors ${item.active
                ? 'border-l-2 border-[#00E599] text-[#00E599] bg-[#00E599]/5'
                : 'border-l-2 border-transparent text-gray-500 hover:text-gray-300 hover:bg-gray-800/30'
                }`}
            >
              {item.icon}
              <span className="text-sm font-semibold">{item.name}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Section - Credits */}
      <div className="p-6">
        <div className="flex items-center justify-between border border-gray-800 bg-[#111623] rounded-lg p-3 cursor-pointer hover:border-gray-700 transition-colors">
          <div className="flex items-center gap-2">
            <Hexagon size={16} className="text-[#00E599]" />
            <span className="text-xs font-bold text-white">84 credits</span>
          </div>
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#00E599] to-blue-500 opacity-80 border border-gray-700"></div>
        </div>
      </div>

    </aside>
  );
}
