import { createPortal } from 'react-dom';
import { X, ExternalLink, FileText } from 'lucide-react';

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl: string;
}

export default function ResumePreviewModal({
  isOpen,
  onClose,
  resumeUrl
}: ResumePreviewModalProps) {
  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-out select-none ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Compositor-only backdrop blur (zero CPU paint) */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
      />

      {/* Modal panel container (transform & scale via GPU compositor) */}
      <div
        className={`w-full max-w-4xl h-[85vh] bg-[#111623] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col relative z-10 transition-transform duration-300 ease-out will-change-transform ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4 bg-[#0B0F19]/50 select-none">
          <div className="flex items-center gap-2 text-[#00E599]">
            <FileText size={18} />
            <span className="text-xs font-black tracking-widest uppercase">Resume Preview</span>
          </div>
          <div className="flex items-center gap-3">
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                title="Open in New Tab"
              >
                <ExternalLink size={16} />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
              title="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* PDF Frame */}
        <div className="flex-1 bg-[#070E1C] relative">
          {resumeUrl ? (
            <iframe
              src={`${resumeUrl}#toolbar=0&navpanes=0`}
              className="w-full h-full border-none"
              title="Resume PDF Preview"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
              No PDF resume URL found.
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
