import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppContainer from '../../components/Layout/AppContainer'
// import AddInfluencerPage from '../../components/AddInfluencer/AddInfluencerComponent.tsx'
// import setTheme from '../../utils/setTheme.js'
// setTheme();
import ContactUsComponent from '../../components/ContactUsComponent.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <script src="../../utils/setTheme.js"></script>
      <AppContainer ComponentProp={<ContactUsComponent />}/>
  </StrictMode>,
)
