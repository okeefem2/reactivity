import React, { Fragment, useContext, useEffect } from 'react';
import { observer } from 'mobx-react';

import './app.scss';
import { NavBarComponent } from '@reactivity/components';
import { ActivityComponent } from '@reactivity/activity';
import { activityContext } from '@reactivity/activity-store';

const App: React.FC = () => {

  const activityStore = useContext(activityContext);

  console.log(activityStore.activities);

  return (
    <Fragment>
      <NavBarComponent />
      <main className="app">
        <ActivityComponent />
      </main>
    </Fragment>
  );
};

export default observer(App);
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
