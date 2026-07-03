import { Toaster } from 'sonner'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Toaster
      position="top-right"
      duration={2000}
      toastOptions={{
        style: {
          background: "#111827",
          color: "#ffffff",
          border: "1px solid #374151",
        },
      }}
    />
    <App />
  </QueryClientProvider>
)
