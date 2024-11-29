import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppContainer from '../../components/Layout/AppContainer'
import HomePage from '../../components/HomePage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContainer ComponentProp={<HomePage />}/>
  </StrictMode>,
)
