import { Mic, Code, BarChart2 } from 'lucide-react'

const InfoPanel = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`hidden lg:flex w-1/2 flex-col justify-between lg:p-12 xl:p-20 border-r 
    border-gray-800/50 relative overflow-hidden transition-all duration-[600ms] 
    cubic-beizer(0.16, 1, 0.3, 1) ${className}`}>
      {/* Top Logo */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Interviu<span className="text-[#00E599]">.</span>
        </h2>
      </div>

      {/* Center Content */}
      <div className="flex-1 flex flex-col justify-center max-w-xl mt-8">
        <h1 className="text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight">
          Practice like it's real.
        </h1>
        <h2 className="text-5xl xl:text-6xl font-bold tracking-tight text-gray-500 mb-16 leading-tight">
          So the real one feels<br />like practice.
        </h2>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="text-[#00E599] flex-shrink-0">
              <Mic size={18} strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold tracking-wide text-gray-300">Voice-native AI interviewer</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-[#00E599] flex-shrink-0">
              <Code size={18} strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold tracking-wide text-gray-300">Coding • Behavioral • System Design</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-[#00E599] flex-shrink-0">
              <BarChart2 size={18} strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold tracking-wide text-gray-300">Scored feedback after every session</span>
          </div>
        </div>
      </div>

      {/* Bottom Dot Pattern (Decorative) */}
      <div className="absolute bottom-12 left-12 grid grid-cols-4 gap-2 opacity-20">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
        ))}
      </div>
    </div>
  )
}

export default InfoPanel