import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render( //find root ele and inject the app
  <StrictMode>
    <App />
  </StrictMode>,
)
