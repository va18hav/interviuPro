import { Mic } from 'lucide-react';

export default function RecentInterviews() {
  const interviews = [
    { title: 'Full Stack Mock - Spotify', type: 'Custom', date: 'Today', duration: '45m', score: 88 },
    { title: 'System Design - Distributed Caching', type: 'Custom', date: 'Yesterday', duration: '30m', score: 74 },
    { title: 'React Hooks Deep Dive', type: 'Custom', date: 'Oct 12', duration: '25m', score: 92 },
  ];

  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold text-white mb-6">Recent Interviews</h3>

      <div className="bg-[#111623] border border-gray-800 rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 p-5 border-b border-gray-800 bg-[#0B0F19]/50">
          <div className="col-span-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Title</div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Type</div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Date</div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Duration</div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Score</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col">
          {interviews.map((interview, i) => (
            <div
              key={i}
              className={`grid grid-cols-6 gap-4 p-5 items-center transition-colors hover:bg-gray-800/30 ${i !== interviews.length - 1 ? 'border-b border-gray-800' : ''
                }`}
            >
              <div className="col-span-2 text-sm font-semibold text-gray-300">{interview.title}</div>
              <div className="text-xs font-mono text-gray-400">{interview.type}</div>
              <div className="text-xs font-mono text-gray-400">{interview.date}</div>
              <div className="text-xs font-mono text-gray-400 text-right">{interview.duration}</div>
              <div className={`text-sm font-bold text-right ${interview.score >= 80 ? 'text-[#00E599]' : 'text-orange-400'}`}>
                {interview.score}/100
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Text */}
      <div className="mt-12 flex flex-col items-center justify-center opacity-40 hover:opacity-100 transition-opacity">
        <Mic size={32} className="text-gray-500 mb-4" />
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center max-w-xs leading-relaxed">
          Ready for more? Hit the Start button above to begin a new session.
        </p>
      </div>
    </div>
  );
}
