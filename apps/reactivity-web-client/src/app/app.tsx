import React, { Fragment, useContext } from 'react';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import './app.scss';
import { NavBarComponent } from '@reactivity/components';
import { ActivityComponent, ActivityForm, ActivityDetail } from '@reactivity/activity';
import { Home } from '@reactivity/home';
import { observer } from 'mobx-react-lite';
import { activityContext } from '@reactivity/activity-store';
import { LoadingComponent } from '@reactivity/components';

const App: React.FC<RouteComponentProps> = observer(({ location }) => {
  // TODO use a loading store
  const activityStore = useContext(activityContext);

  return (
    <Fragment>
      <main>
        <Route exact path="/" component={Home} />
        <Route path={'/(.+)'} render={() => (
          <div className="app">
            <NavBarComponent />
            {
              activityStore.loading && <LoadingComponent inverted={false} content={activityStore.loadingMessage} />
            }
            <Route path="/activities" component={ActivityComponent} />
            <Route path="/activity/:id" component={ActivityDetail} />
            <Route path={['/create-activity', '/edit-activity/:id']} component={ActivityForm} key={location.key} />
          </div>
        )} />
      </main>
    </Fragment>
  );
});

export default withRouter(App);
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
