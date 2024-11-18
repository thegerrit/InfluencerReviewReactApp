import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppContainer from '../../utils/AppContainer.tsx'
import SetDisplayNameComponent from '../../components/SetDisplayNameComponent.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContainer ComponentProp={<SetDisplayNameComponent />}/>
  </StrictMode>,
)
