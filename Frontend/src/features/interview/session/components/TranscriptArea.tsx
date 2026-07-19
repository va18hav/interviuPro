import { useSession } from '../context/SessionContext'

export default function TranscriptArea() {
  // aiMessage is still available in context — hidden from UI for now
  useSession()
  return null
}
