import { useGetProfileData, useUpdateProfile, useUpdateResume, useUpdatePassword } from '../hooks/profileDataHook';
import PersonalInformationCard from '../components/PersonalInformationCard';
import TechnicalSkillsCard from '../components/TechnicalSkillsCard';
import ResumeCard from '../components/ResumeCard';
import SecurityCard from '../components/SecurityCard';

export default function Profile() {
  const { profile, loadingProfileData } = useGetProfileData();
  const { updateProfile, isUpdatingProfile } = useUpdateProfile();
  const { updateResume, isUpdatingResume } = useUpdateResume();
  const { updatePassword, isUpdatingPassword } = useUpdatePassword();

  if (loadingProfileData || !profile) {
    return (
      <div className="max-w-4xl mx-auto p-8 lg:p-12 animate-pulse space-y-8 text-white font-sans">
        <div className="h-8 bg-gray-800 rounded w-1/4 mb-10"></div>
        <div className="h-48 bg-[#111623] border border-gray-800 rounded-xl p-6"></div>
        <div className="h-48 bg-[#111623] border border-gray-800 rounded-xl p-6"></div>
      </div>
    );
  }

  return (
    <div key={profile?.profiles?.updatedAt || 'profile-loaded'} className="max-w-4xl mx-auto p-8 lg:p-12 space-y-10 text-white font-sans animate-fade-in">
      {/* Settings Title */}
      <div className="border-b border-gray-800 pb-4 mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-white font-inter">Settings</h1>
      </div>

      <PersonalInformationCard
        profile={profile}
        updateProfile={updateProfile}
        isUpdating={isUpdatingProfile}
      />

      <TechnicalSkillsCard
        profile={profile}
        updateProfile={updateProfile}
        isUpdating={isUpdatingProfile}
      />

      <ResumeCard
        profile={profile}
        updateResume={updateResume}
        isUpdating={isUpdatingResume}
      />

      <SecurityCard
        updatePassword={updatePassword}
        isUpdating={isUpdatingPassword}
      />
    </div>
  );
}
