import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import ComingSoon from '../components/ComingSoon';
// import AppContainer from '../App';
import SignIn from '../../components/SignIn';
import { NoAuthAppContainer } from '../../utils/AppContainer';

// ReactDOM.render(<Browse />, document.getElementById('root'));

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      {/* <AppContainer ComponentProp={<SignIn />}/> */}
      <NoAuthAppContainer ComponentProp={<SignIn />}/>
    </StrictMode>,
  );