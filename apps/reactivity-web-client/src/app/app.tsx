import React, { Fragment, useContext } from 'react';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import './app.scss';
import { NavBarComponent, NotFound } from '@reactivity/components';
import { ActivityComponent, ActivityForm, ActivityDetail } from '@reactivity/activity';
import { Home } from '@reactivity/home';
import { observer } from 'mobx-react-lite';
import { loadingContext } from '@reactivity/loading-store';
import { LoadingComponent } from '@reactivity/components';
import { ToastContainer, toast } from 'react-toastify';

const App: React.FC<RouteComponentProps> = observer(({ location }) => {
  // TODO use a loading store
  const loadingStore = useContext(loadingContext);

  return (
    <Fragment>
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      {
        loadingStore.loading &&
        <LoadingComponent inverted={false} content={loadingStore.loadingMessage} />
      }
      <main>
        <Route exact path="/" component={Home} />
        <Route path={'/(.+)'} render={() => (
          <div className="app">
            <NavBarComponent />

            <Switch>
              <Route path="/activities" component={ActivityComponent} />
              <Route path="/activity/:id" component={ActivityDetail} />
              <Route path={['/create-activity', '/edit-activity/:id']} component={ActivityForm} key={location.key} />
              <Route component={NotFound} />
            </Switch>
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
