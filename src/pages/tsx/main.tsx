import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppContainer from '../../utils/AppContainer.tsx'
import HomePage from '../../components/HomePage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContainer ComponentProp={<HomePage />}/>
  </StrictMode>,
)
