import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import InfoPanel from './components/InfoPanel';
import 'boxicons/css/boxicons.min.css';
import * as authService from './services/authService'

export default function Login() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('login');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const auth = async () => {
    // Authentication logic will go here
    const data = { email, password }
    if (!data || !email || !password) {
      toast.warning('Please Enter Email and Password')
    }
    if (tab === 'login') {
      const result = await authService.login(data)
      if (result.data?.success) {
        toast.success(result.data.message)
        navigate('/dashboard')
      }
      else {
        toast.error(result.message)
      }
    }
    if (tab === 'signup') {
      const result = await authService.register(data)
      console.log(result)
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#0B0F19] text-white font-sans">
      {/* LEFT PANEL */}
      <InfoPanel />
      {/* RIGHT PANEL */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center items-center p-8 relative">
        <div className="w-full max-w-sm">

          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-800 mb-10">
            <button
              onClick={() => setTab('login')}
              className={`pb-3 text-sm font-medium ${tab === 'login' ? 'border-b-2 border-[#00E599] text-white' : 'text-gray-500 hover:text-gray-300 transition-colors'}`}>
              Log In
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`pb-3 text-sm font-medium ${tab === 'signup' ? 'border-b-2 border-[#00E599] text-white' : 'text-gray-500 hover:text-gray-300 transition-colors'}`}>
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form className="space-y-8">
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="engineer@example.com"
                className="bg-transparent border-b border-gray-800 pb-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00E599] transition-colors"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Password
                </label>
                {tab === 'login' && (
                  <a href="#" className="text-xs text-[#00E599] hover:underline">
                    Forgot?
                  </a>
                )}
              </div>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-transparent border-b border-gray-800 pb-2 text-sm text-white placeholder-gray-600 tracking-widest focus:outline-none focus:border-[#00E599] transition-colors"
              />
            </div>

            <button
              type="button"
              onClick={auth}
              className="w-full bg-[#00E599] hover:bg-[#00c985] text-black font-semibold py-3 rounded text-sm transition-colors mt-4 flex justify-center items-center gap-2"
            >
              {tab === 'login' ? 'Continue' : 'Register'}
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-8">
            <div className="flex-grow border-t border-gray-800"></div>
            <span className="flex-shrink-0 mx-4 text-xs font-medium text-gray-600 uppercase tracking-widest">Or</span>
            <div className="flex-grow border-t border-gray-800"></div>
          </div>

          {/* Google Auth */}
          <button
            type="button"
            className="w-full bg-transparent border border-gray-700 hover:border-gray-500 text-white font-medium py-3 rounded text-sm transition-colors flex justify-center items-center gap-3"
          >
            <i className='bx bxl-google text-lg'></i>
            Continue with Google
          </button>

        </div>

        {/* Footer */}
        <div className="absolute bottom-8 flex gap-6 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
          <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
          <span className="text-gray-700">•</span>
          <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
        </div>
      </div>
    </div>
  );
}