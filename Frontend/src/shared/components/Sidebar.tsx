import { LayoutDashboard, FileText, BarChart2, Settings, Loader2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useGetProfileData } from '../../features/profile/hooks/profileDataHook';
import { useLogout } from '../../features/auth/hooks/authHook';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/dashboard' },
    { name: 'My Interviews', icon: <FileText size={18} />, path: '/interviews' },
    { name: 'Sessions', icon: <BarChart2 size={18} />, path: '/sessions' },
    { name: 'Settings', icon: <Settings size={18} />, path: '/settings' },
  ];

  const { firstName, lastName, loadingProfileData } = useGetProfileData();
  const { logout, loggingOut } = useLogout();

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <aside className="hidden lg:flex w-64 border-r border-gray-800 bg-[#0B0F19] flex-col justify-between h-screen sticky top-0">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="p-6 mb-4 flex items-center gap-3 select-none">
          <img src="/logo.png" alt="Interviu Logo" className="h-10 w-auto" />
          <h2 className="text-xl font-bold tracking-tight text-white font-inter">
            Interv<span className="text-[#00E599]">i</span>u
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors border-l-2 border-[#00E599] text-[#00E599] bg-[#00E599]/5'
                  : 'flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors border-l-2 border-transparent text-gray-500 hover:text-gray-300 hover:bg-gray-800/30'
              }
            >
              {item.icon}
              <span className="text-sm font-semibold">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Section - Profile & Logout */}
      <div className="p-6 border-t border-gray-800/50 bg-[#0d111b]/20">
        {loadingProfileData ? (
          <div className="flex items-center justify-between animate-pulse">
            <div className="w-8 h-8 rounded-full bg-gray-850"></div>
            <div className="flex-1 ml-3 space-y-1.5">
              <div className="h-3 bg-gray-850 rounded w-20"></div>
              <div className="h-2 bg-gray-850 rounded w-10"></div>
            </div>
            <div className="w-14 h-6 bg-gray-850 rounded-full"></div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00E599] to-[#00916a] border border-[#00E599]/20 flex items-center justify-center text-[10px] font-black text-black uppercase select-none shrink-0">
              {initials || '?'}
            </div>
            {/* Name and Plan */}
            <div className="flex-1 min-w-0 flex flex-col items-start text-left">
              <span className="text-xs font-semibold text-white truncate w-full">
                {firstName} {lastName}
              </span>
              <span className="text-[10px] text-gray-500 font-medium mt-0.5">
                Free
              </span>
            </div>
            {/* Premium Logout Button */}
            <button
              onClick={() => logout()}
              disabled={loggingOut}
              className="px-3 py-1 rounded-full border border-gray-800 hover:border-[#00E599]/30 bg-transparent hover:bg-rose-500/10 hover:text-rose-400 text-[10px] font-bold text-gray-400 transition-all duration-300 shrink-0 disabled:opacity-50"
            >
              {loggingOut ? (
                <Loader2 size={10} className="animate-spin" />
              ) : (
                'Logout'
              )}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
