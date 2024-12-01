import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NoAuthAppContainer } from '../../components/Layout/AppContainer'
import HomePage from '../../components/HomePage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NoAuthAppContainer ComponentProp={<HomePage />}/>
  </StrictMode>,
)
