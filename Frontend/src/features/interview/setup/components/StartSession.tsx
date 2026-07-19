import { Hexagon, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import type { SessionConfig } from '../types/interviewContext.types';

interface StartSessionProps {
    interviewId: string
    onStart: ({ interviewId, config }: { interviewId: string, config: SessionConfig }) => void
    isPending: boolean
}
// import { getProfile } from '../../../dashboard/services/dashboardServices';

export default function StartSession({ interviewId, onStart, isPending }: StartSessionProps) {
    const durationOptions: number[] = [20, 30]
    const rounds: string[] = ['Technical/Coding', 'System Design', 'Behavioral']
    const [type, settype] = useState('Technical/Coding')
    const [duration, setDuration] = useState(20)
    const handleSubmit = () => {
        onStart({ interviewId, config: { type, duration } })
    }
    return (
        <div className="bg-[#111623] border border-gray-800 rounded-xl p-8 max-w-3xl w-full mx-auto">
            {/* Type */}
            <div className="mb-6">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Type</label>
                <div className="flex bg-[#0B0F19] border border-gray-800 rounded-md p-1">
                    {rounds.map((round: string) => {
                        return (
                            <button
                                key={round}
                                onClick={() => { settype(round) }}
                                className={`flex-1 py-2 text-xs ${round === type ? 'font-bold text-white bg-[#1A2235] rounded shadow-sm border border-gray-700 transition-colors' : 'font-semibold text-gray-400 hover:text-gray-300 transition-colors'}`}>
                                {round}
                            </button>)
                    })}
                </div>
            </div>

            {/* Duration */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3 sm:gap-0">
                <div className='shrink-0'>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Duration</label>
                    <div className="flex bg-[#0B0F19] border border-gray-800 rounded-md p-1 w-full sm:max-w-[340px]">
                        {durationOptions.map((min, index) => (
                            <button
                                key={index}
                                onClick={() => { setDuration(min) }}
                                className={`flex-1 px-6 py-1.5 text-xs whitespace-nowrap ${min === duration ? 'font-bold text-white bg-[#1A2235] rounded shadow-sm border border-gray-700 transition-colors' : 'font-semibold text-gray-400 hover:text-gray-300 transition-colors'}`}>
                                {min} min
                            </button>
                        ))}
                    </div>
                </div>
                {/* Credits cost indicator */}
                <div className="flex items-center gap-2 sm:pt-6">
                    <Hexagon className="text-[#00E599]" size={16} />
                    <span className="text-xs font-semibold text-gray-400">
                        This session will use ~{duration} credits
                    </span>
                </div>
            </div>

            {/* Footer is injected here */}
            <div className="mt-8 pt-6 border-t border-gray-800 flex items-center justify-between">

                {/* Start Button */}
                <button
                    onClick={handleSubmit}
                    disabled={isPending}
                    className="flex items-center gap-2 px-6 py-3 bg-[#00E599] hover:bg-[#00c985] text-black font-bold text-sm rounded-md transition-all shadow-[0_0_15px_rgba(0,229,153,0.3)]">
                    {isPending ? 'Starting...' : 'Start Session'}
                    <ArrowRight size={18} />
                </button>
            </div>

        </div>
    );
}