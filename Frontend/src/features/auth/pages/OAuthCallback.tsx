import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface Props {
  status: 'success' | 'error';
}

export default function OAuthCallback({ status }: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (status === 'success') {
      // The httpOnly cookie has already been set by the backend redirect.
      // Clear cached queries so the app re-fetches user data fresh.
      queryClient.clear();
      toast.success('Signed in successfully');
      navigate('/dashboard', { replace: true });
    } else {
      const message = searchParams.get('message') || 'Sign-in failed. Please try again.';
      toast.error(message);
      navigate('/login', { replace: true });
    }
  }, [status, navigate, queryClient, searchParams]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0B0F19]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-[#00E599]" size={36} strokeWidth={2} />
        <p className="text-sm text-gray-400 font-medium tracking-wide">
          {status === 'success' ? 'Signing you in…' : 'Redirecting…'}
        </p>
      </div>
    </div>
  );
}
