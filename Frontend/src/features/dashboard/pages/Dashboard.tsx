import { useDashboardData } from '../hooks/dashboardHook';
import DashboardHeader from '../components/DashboardHeader';
import CustomInterviewCard from '../components/CustomInterviewCard';
import TemplatesList from '../components/TemplatesList';
import RecentInterviews from '../components/RecentInterviews';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetProfileData } from '../../profile/hooks/profileDataHook';
import DashboardSkeleton from '../components/DashboardSkeleton';

export default function Dashboard() {
  const { dashboardData, stats, loadingDashboardData, isError } = useDashboardData();
  const { firstName, onboardingStep1, onboardingStep2, loadingProfileData } = useGetProfileData()

  const navigate = useNavigate()

  if (onboardingStep1 === false || onboardingStep2 === false) navigate('/onboarding')

  if (loadingDashboardData || loadingProfileData) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-3 text-gray-400">
        <AlertCircle size={24} className="text-red-400" />
        <p className="text-sm font-mono text-red-400">Failed to load dashboard data.</p>
        <p className="text-xs text-gray-600">Check your connection or try refreshing the page.</p>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto p-8 lg:p-12">
      <DashboardHeader firstName={firstName} stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <CustomInterviewCard />
        <TemplatesList />
      </div>

      <RecentInterviews sessions={dashboardData} />
    </div>
  );
}
