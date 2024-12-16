import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NoAuthAppContainer } from '../../components/Layout/AppContainer'
import HomePage from '../../components/HomePage'
// import { AuthProvider } from '../../context/AuthContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <AuthProvider> */}
      <NoAuthAppContainer ComponentProp={<HomePage />}/>
    {/* </AuthProvider> */}
  </StrictMode>,
)