import { Toaster } from 'sonner'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <Toaster
      position="top-right"
      duration={2000}
      toastOptions={{
        style: {
          background: "#111827", // dark background
          color: "#ffffff",      // white text
          border: "1px solid #374151",
        },
      }}
    />
    <App />
  </>
)
