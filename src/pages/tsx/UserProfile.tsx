import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import ComingSoon from '../components/ComingSoon';
import { NoAuthAppContainer } from '../../components/Layout/AppContainer'
import UserProfileDetails from '../../components/UserProfileDetails';

// ReactDOM.render(<Browse />, document.getElementById('root'));

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <NoAuthAppContainer ComponentProp={<UserProfileDetails />}/>
    </StrictMode>
  );