import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppContainer from '../../components/Layout/AppContainer'
import SearchPage from '../../components/Search/SearchPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContainer ComponentProp={<SearchPage />}/>
  </StrictMode>,
)
