import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { ScrollToTop } from '@reactivity/components';
import App from './app/App';

ReactDOM.render(
  <BrowserRouter>
    {/* <ScrollToTop> */}
    <App />
    {/* </ScrollToTop> */}
  </BrowserRouter>,
  document.getElementById('root')
);
