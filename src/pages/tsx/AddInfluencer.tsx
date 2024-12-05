import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppContainer from '../../components/Layout/AppContainer'
import AddInfluencerPage from '../../components/AddInfluencer/AddInfluencerComponent'
// import setTheme from '../../utils/setTheme.js'
// setTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <script src="../../utils/setTheme.js"></script>
      <AppContainer ComponentProp={<AddInfluencerPage />} />
  </StrictMode>,
)
