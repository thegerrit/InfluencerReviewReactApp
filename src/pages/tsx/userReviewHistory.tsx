import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import ComingSoon from '../components/ComingSoon';
import  AppContainer  from '../../utils/AppContainer';
// import UserReviewHistoryComponent from '../../components/UserReviewHistoryComponent';
// import UserHistoryPageComponent from '../../components/UserHistoryPageComponent';
import UserReviewsComponent from '../../components/UserReviewsComponent';
// ReactDOM.render(<Browse />, document.getElementById('root'));

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AppContainer ComponentProp={<UserReviewsComponent />}/>
      {/* <NoAuthAppContainer ComponentProp={<UserReviewHistoryComponent />}/> */}
    </StrictMode>,
  );