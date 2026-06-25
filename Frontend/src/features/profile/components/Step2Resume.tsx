import { FileText, ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';
import * as profileServices from '../services/profileServices'
import { toast } from 'sonner';


export default function Step2Resume({ onNext }: { onNext: () => void }) {

  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null)
  const handleSubmit = async () => {
    if (!file) {
      console.log('Please upload a file')
    }
    const result = await profileServices.uploadResume(file)
    console.log(result)
    if (result.data?.success) {
      toast.success(result.data.message)
      onNext()
    }
    else {
      toast.error(result.message)
    }

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
          onClick={() => { fileInputRef.current.click() }}
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
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between border-t border-gray-800 pt-8">
          <button className="flex items-center gap-2 px-6 py-3 bg-transparent border border-gray-800 hover:border-gray-600 rounded-md text-xs font-bold text-white uppercase tracking-widest transition-colors">
            <ArrowLeft size={16} /> Back
          </button>

          <button onClick={handleSubmit} className="flex items-center gap-2 px-8 py-3 bg-[#00E599] hover:bg-[#00c985] rounded-md text-sm font-bold text-black transition-colors">
            Next <ArrowRight size={18} />
          </button>
        </div>
      </div>

    </div>
  );
}
