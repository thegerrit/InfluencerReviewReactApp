import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NoAuthAppContainer } from '../../components/Layout/AppContainer'
import SearchPage from '../../components/Search/SearchPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NoAuthAppContainer ComponentProp={<SearchPage />}/>
  </StrictMode>
)
