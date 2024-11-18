import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppContainer from '../../utils/AppContainer.tsx'
import AddInfluencerPage from '../../components/AddInfluencerComponent.tsx'
// import setTheme from '../../utils/setTheme.js'
// setTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <script src="../../utils/setTheme.js"></script>
      <AppContainer ComponentProp={<AddInfluencerPage />}/>
  </StrictMode>,
)
