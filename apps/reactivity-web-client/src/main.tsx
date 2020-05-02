import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './app/App';
import { routerHistory } from '@reactivity/common';
import dateFnsLocalizer from 'react-widgets-date-fns';

dateFnsLocalizer();

ReactDOM.render(

    <Router history={routerHistory}>
      {/* <ScrollToTop> */}
      <App />
      {/* </ScrollToTop> */}
    </Router>
,
  document.getElementById('root')
);

// ReactDOM.render(
//   <BrowserRouter>
//     {/* <ScrollToTop> */}
//     <App />
//     {/* </ScrollToTop> */}
//   </BrowserRouter>,
//   document.getElementById('root')
// );
