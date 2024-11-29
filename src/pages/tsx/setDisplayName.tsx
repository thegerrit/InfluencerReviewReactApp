import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppContainer from '../../components/Layout/AppContainer'
import SetDisplayNameComponent from '../../components/SetDisplayNameComponent'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContainer ComponentProp={<SetDisplayNameComponent />}/>
  </StrictMode>,
)
