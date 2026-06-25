import DashboardHeader from './components/DashboardHeader';
import CustomInterviewCard from './components/CustomInterviewCard';
import TemplatesList from './components/TemplatesList';
import RecentInterviews from './components/RecentInterviews';
import * as dashboardServices from './services/dashboardServices'
import { useEffect, useState } from 'react';

export default function Dashboard() {

  const [firstName, setFirstName] = useState('')

  useEffect(() => {
    const getProfileData = async () => {
      const result = await dashboardServices.getProfile()
      setFirstName(result.profile.firstName)
      console.log(firstName)
    }
    getProfileData()
  }, [firstName])
  return (
    <div className="max-w-6xl mx-auto p-8 lg:p-12">
      <DashboardHeader firstName={firstName} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <CustomInterviewCard />
        <TemplatesList />
      </div>

      <RecentInterviews />
    </div>
  );
}
