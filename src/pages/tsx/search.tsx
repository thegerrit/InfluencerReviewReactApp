import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppContainer from '../../utils/AppContainer.tsx'
import SearchPage from '../../components/SearchPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContainer ComponentProp={<SearchPage />}/>
  </StrictMode>,
)
