import { FileText, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { useUploadResume } from '../hooks/profileDataHook';


export default function Step2Resume({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {

  const { uploadResume, isPending } = useUploadResume()

  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleSubmit = () => {
    if (!file) {
      toast.error('Please upload a file')
      return;
    }
    uploadResume(file, {
      onSuccess: () => {
        onNext()
      }
    })
  }


  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">

      {/* Header text */}
      <div className="text-center mb-10 mt-8">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Personalize your interviews</h1>
        <p className="text-sm text-gray-400">We'll use it to provide specific feedback based on your experience.</p>
      </div>

      <div className="w-full">
        {/* Upload Box */}
        <div
          onClick={() => { fileInputRef.current?.click() }}
          className="w-full bg-[#111623] border border-gray-800 rounded-xl p-16 flex flex-col items-center justify-center mb-12 hover:border-gray-700 transition-colors cursor-pointer border-dashed">
          <div className="w-12 h-12 bg-[#1A2235] rounded-lg flex items-center justify-center mb-6">
            <FileText className="text-[#00E599]" size={24} />
          </div>

          <h3 className="text-lg font-bold text-white mb-2">Upload your resume (PDF)</h3>
          <p className="text-xs text-gray-500 font-medium mb-6">{file ? file.name : 'Max file size 5MB'}</p>

          <button
            className="text-xs font-bold text-[#00E599] uppercase tracking-widest hover:text-[#00c985] transition-colors">
            SELECT FILE
          </button>
          <input
            type="file"
            accept='.pdf'
            className='hidden'
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between border-t border-gray-800 pt-8">
          <button 
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 bg-transparent border border-gray-800 hover:border-gray-600 rounded-md text-xs font-bold text-white uppercase tracking-widest transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <button
            disabled={isPending}
            onClick={handleSubmit}
            className="relative flex items-center justify-center gap-2 px-8 py-3 bg-[#00E599] hover:bg-[#00c985] rounded-md text-sm font-bold text-black transition-all overflow-hidden min-w-[120px]"
          >
            <span className={`flex items-center gap-2 transition-all duration-300 ${isPending ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              Next <ArrowRight size={18} />
            </span>
            {isPending && (
              <span className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="animate-spin text-black" size={18} strokeWidth={2.5} />
              </span>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
