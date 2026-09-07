import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/globals.css'
import './styles/2026-editorial.css'
import './styles/2026-editorial-v2.css'
import './styles/minimal-header.css'
import './styles/2026-editorial-v3.css'
import './styles/2026-cleanup.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
