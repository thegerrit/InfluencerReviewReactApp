import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import BrowsePage from '../components/BrowsePage';
import AppContainer from '../App';


// ReactDOM.render(<Browse />, document.getElementById('root'));

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AppContainer ComponentProp={<BrowsePage />}/>
    </StrictMode>,
  );