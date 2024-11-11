import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppContainer from './App.tsx'
import HomePage from './pages/HomePage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContainer ComponentProp={<HomePage />}/>
  </StrictMode>,
)
