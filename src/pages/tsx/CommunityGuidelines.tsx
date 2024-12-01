import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppContainer from '../../components/Layout/AppContainer.tsx'
// import AddInfluencerPage from '../../components/AddInfluencer/AddInfluencerComponent.tsx'
// import setTheme from '../../utils/setTheme.js'
// setTheme();
import CommunityGuidelinesComponent from '../../components/CommunityGuidelinesComponent.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <script src="../../utils/setTheme.js"></script>
      <AppContainer ComponentProp={<CommunityGuidelinesComponent />}/>
  </StrictMode>,
)
