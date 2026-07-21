import { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import InfoPanel from '../components/InfoPanel';
import { useLogin, useRegister, useOAuthRedirect } from '../hooks/authHook';

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M47.532 24.552c0-1.636-.145-3.2-.415-4.698H24.48v8.883h12.94c-.558 3.002-2.25 5.548-4.797 7.258v6.034h7.767c4.543-4.183 7.142-10.34 7.142-17.477z" fill="#4285F4"/>
      <path d="M24.48 48c6.486 0 11.926-2.15 15.9-5.833l-7.767-6.034c-2.152 1.44-4.903 2.29-8.133 2.29-6.253 0-11.549-4.224-13.44-9.9H2.89v6.232C6.847 43.058 15.13 48 24.48 48z" fill="#34A853"/>
      <path d="M11.04 28.523A14.4 14.4 0 0 1 10.27 24c0-1.565.27-3.086.77-4.523v-6.232H2.89A23.935 23.935 0 0 0 .48 24c0 3.874.93 7.543 2.41 10.755l8.15-6.232z" fill="#FBBC05"/>
      <path d="M24.48 9.577c3.523 0 6.684 1.21 9.17 3.587l6.876-6.875C36.4 2.385 30.964 0 24.48 0 15.13 0 6.847 4.942 2.89 13.245l8.15 6.232c1.891-5.676 7.187-9.9 13.44-9.9z" fill="#EA4335"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.625-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.218.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Login() {
  const { login, loginPending } = useLogin();
  const { register, registerPending } = useRegister();
  const { loginWithGoogle, loginWithGithub } = useOAuthRedirect();

  const isPending = loginPending || registerPending;
  const [tab, setTab] = useState('login');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const auth = async () => {
    const data = { email, password };
    if (!email || !password) {
      toast.warning('Please enter email and password');
      return;
    }
    if (tab === 'login') {
      login(data);
    } else {
      register(data);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#0B0F19] text-white font-sans">
      {/* LEFT PANEL */}
      <InfoPanel className={isPending ? '-translate-x-full opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'} />

      {/* RIGHT PANEL */}
      <div className={`flex w-full lg:w-1/2 flex-col justify-center items-center p-8 relative transition-transform duration-[600ms] cubic-bezier(0.16, 1, 0.3, 1) ${isPending ? 'lg:-translate-x-1/2' : 'translate-x-0'}`}>
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
                className="bg-transparent border-b border-gray-800 pb-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00E599] transition-colors [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_#0B0F19_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#ffffff]"
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
                className="bg-transparent border-b border-gray-800 pb-2 text-sm text-white placeholder-gray-600 tracking-widest focus:outline-none focus:border-[#00E599] transition-colors [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_#0B0F19_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#ffffff]"
              />
            </div>

            <button
              disabled={isPending}
              type="button"
              onClick={auth}
              className="relative w-full bg-[#00E599] hover:bg-[#00c985] text-black font-semibold py-3 rounded text-sm transition-all mt-4 flex justify-center items-center"
            >
              <span className={`flex items-center gap-2 transition-all duration-300 ${isPending ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                {tab === 'login' ? 'Continue' : 'Register'}
                <ArrowRight size={16} strokeWidth={2} />
              </span>
              {isPending && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="animate-spin text-black" size={18} strokeWidth={2.5} />
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-8">
            <div className="flex-grow border-t border-gray-800"></div>
            <span className="flex-shrink-0 mx-4 text-xs font-medium text-gray-600 uppercase tracking-widest">Or</span>
            <div className="flex-grow border-t border-gray-800"></div>
          </div>

          {/* OAuth Buttons */}
          <div className="flex flex-col gap-3">
            {/* Continue with Google */}
            <button
              type="button"
              onClick={loginWithGoogle}
              className="w-full flex items-center justify-center gap-3 bg-[#161b22] hover:bg-[#21262d] border border-white/10 hover:border-white/20 text-white text-sm font-medium py-3 rounded transition-all duration-200"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            {/* Continue with GitHub */}
            <button
              type="button"
              onClick={loginWithGithub}
              className="w-full flex items-center justify-center gap-3 bg-[#161b22] hover:bg-[#21262d] border border-white/10 hover:border-white/20 text-white text-sm font-medium py-3 rounded transition-all duration-200"
            >
              <GitHubIcon />
              Continue with GitHub
            </button>
          </div>

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