import { useSession } from '../context/SessionContext'

export default function TranscriptArea() {

  const { aiMessage, generatingFeedback } = useSession()

  if (generatingFeedback) return null;

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto text-center px-4 mb-2">
      <div className="relative">
        <p className="text-lg md:text-2xl text-white font-extrabold leading-snug tracking-normal px-2">
          {aiMessage}
        </p>
      </div>
    </div>)
}
