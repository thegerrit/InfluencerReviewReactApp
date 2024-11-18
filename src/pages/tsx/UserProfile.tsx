import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import ComingSoon from '../components/ComingSoon';
import AppContainer from '../../utils/AppContainer';
import UserProfileDetails from '../../components/UserProfileDetails';

// ReactDOM.render(<Browse />, document.getElementById('root'));

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AppContainer ComponentProp={<UserProfileDetails />}/>
    </StrictMode>,
  );