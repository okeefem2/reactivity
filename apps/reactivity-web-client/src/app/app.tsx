import React, { Fragment } from 'react';
import { Header } from 'semantic-ui-react'

import './app.scss';

import { NavBarComponent } from '@reactivity/components';
import { ActivityComponent } from '@reactivity/activity';

export const App: React.FC = () => {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./${fileName}.${style} file.
   */
  return (
    <Fragment>
      <NavBarComponent />
      <main className="app">
        <ActivityComponent />
      </main>
    </Fragment>
  );
};

export default App;


{/* START: routes */ }
{/* These routes and navigation have been generated for you */ }
{/* Feel free to move and update them to fit your needs */ }
{/* <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Route
        path="/"
        exact
        render={() => (
          <div>
            This is the generated root route.{' '}
            <Link to="/page-2">Click here for page 2.</Link>
          </div>
        )}
      />
      <Route
        path="/page-2"
        exact
        render={() => (
          <div>
            <Link to="/">Click here to go back to root page.</Link>
          </div>
        )} */}
// />
{/* END: routes */ }
