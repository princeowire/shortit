import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Nav from './components/Navbar/nav.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav />
    <App />
  </StrictMode>,
)
