import { Outlet, NavLink } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useGetProfileData } from '../../features/profile/hooks/profileDataHook';
import { useLogout } from '../../features/auth/hooks/authHook';
import { LayoutDashboard, FileText, BarChart2, Settings, LogOut, Loader2 } from 'lucide-react';

export default function AppLayout() {
  const { firstName, lastName } = useGetProfileData();
  const { logout, loggingOut } = useLogout();

  const initials = `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'My Interviews', icon: <FileText size={20} />, path: '/interviews' },
    { name: 'Sessions', icon: <BarChart2 size={20} />, path: '/sessions' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0B0F19] text-white font-sans">
      {/* Mobile/Tablet Top Header */}
      <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-[#0B0F19] border-b border-gray-800/80 sticky top-0 z-40">
        <div className="flex items-center gap-2.5 select-none">
          <img src="/logo.png" alt="Interviu Logo" className="h-8 w-auto" />
          <h2 className="text-xl font-bold tracking-tight text-white font-inter">
            Interv<span className="text-[#00E599]">i</span>u
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00E599] to-blue-500 border border-gray-700 flex items-center justify-center text-[10px] font-black text-white uppercase select-none">
            {initials || '?'}
          </div>
          <button
            onClick={() => logout()}
            disabled={loggingOut}
            className="p-1.5 rounded-md border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-rose-400 hover:text-rose-300 transition-all disabled:opacity-50"
            title="Logout"
          >
            {loggingOut ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <LogOut size={14} />
            )}
          </button>
        </div>
      </header>

      {/* Sidebar for Desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        <Outlet />
      </main>

      {/* Mobile/Tablet Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0F19]/90 backdrop-blur-md border-t border-gray-800/80 flex justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            className={({ isActive }) =>
              isActive
                ? 'flex flex-col items-center gap-1 text-[#00E599] transition-colors px-3 py-1'
                : 'flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 transition-colors px-3 py-1'
            }
          >
            {item.icon}
            <span className="text-[9px] font-bold tracking-wider uppercase">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

