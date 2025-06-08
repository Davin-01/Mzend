import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-tailwind/react' // <-- Import this
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider> {/* <-- Wrap your App with this */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
