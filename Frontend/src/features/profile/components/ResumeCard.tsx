import React, { useRef, useState } from 'react';
import { FileText } from 'lucide-react';
import { toast } from 'sonner';
import { GetProfileData } from '../types/profile.types';
import ResumePreviewModal from './ResumePreviewModal';

interface ResumeCardProps {
  profile: GetProfileData
  updateResume: (file: File) => void;
  isUpdating: boolean;
}

export default function ResumeCard({
  profile,
  updateResume,
  isUpdating
}: ResumeCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Only PDF files are supported');
        return;
      }
      updateResume(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2.5 text-[#00E599] select-none">
        <FileText size={18} />
        <h2 className="text-sm font-extrabold tracking-widest uppercase">Resume</h2>
      </div>
      <div className="bg-[#111623] border border-gray-800 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div
          onClick={() => {
            if (profile?.resume?.resumeUrl) {
              setIsPreviewOpen(true);
            } else {
              toast.error('No resume file uploaded yet');
            }
          }}
          className={`flex items-start gap-4 ${
            profile?.resume?.resumeUrl ? 'cursor-pointer hover:opacity-80' : 'opacity-65'
          } transition-all`}
        >
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-500 flex items-center justify-center">
            <FileText size={24} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide truncate max-w-[280px] md:max-w-md">
              {profile?.profiles ? (profile.profiles.firstName + '-resume.pdf') : 'resume.pdf'}
            </h3>
            <p className="text-[10px] text-gray-400 font-mono tracking-wider mt-1">
              {profile?.resume?.resumeUrl ? 'Uploaded PDF Document' : 'No file uploaded yet'}
            </p>
          </div>
        </div>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUpdating}
            className="w-full md:w-auto px-6 py-2.5 rounded-md border border-gray-700 hover:border-gray-500 hover:bg-gray-800 text-xs font-black tracking-widest text-white uppercase transition-all disabled:opacity-50"
          >
            {isUpdating ? 'Replacing...' : 'Replace'}
          </button>
        </div>
      </div>

      {/* Zero CPU overhead preview portal modal */}
      <ResumePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        resumeUrl={profile?.resume?.resumeUrl || ''}
      />
    </div>
  );
}
