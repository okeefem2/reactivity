import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import './app.scss';
import { NavBarComponent, NotFound } from '@reactivity/components';
import { ActivityComponent, ActivityForm, ActivityDetail } from '@reactivity/activity';
import { Home } from '@reactivity/home';
import { observer } from 'mobx-react-lite';
import { loadingContext } from '@reactivity/loading-store';
import { LoadingComponent, PrivateRoute } from '@reactivity/components';
import { ToastContainer, toast } from 'react-toastify';
import { LoginComponent } from '@reactivity/auth';
import { userContext } from '@reactivity/user-store';
import { ModalContainer } from '@reactivity/modal';
import { ProfileComponent } from '@reactivity/profile';

const App: React.FC<RouteComponentProps> = observer(({ location }) => {
  // TODO use a loading store
  const loadingStore = useContext(loadingContext);
  const userStore = useContext(userContext);
  const [initialUserCheck, setInitialUserCheck] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem('jwt') && !userStore.isLoggedIn) {
      userStore.getCurrentUser().then(() => setInitialUserCheck(true));
    } else {
      setInitialUserCheck(true);
    }
  }, [userStore.isLoggedIn])

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      {
        loadingStore.loading &&
        <LoadingComponent inverted={false} content={loadingStore.loadingMessage} />
      }
      <main>
        <Route exact path="/" component={Home} />
        <Route path={'/(.+)'} render={() => (
          initialUserCheck ?
            <div className="app">
              <NavBarComponent />
              <Switch>
                <Route path="/login" component={LoginComponent} />
                <PrivateRoute path="/activities" component={ActivityComponent} />
                <PrivateRoute path="/activity/:id" component={ActivityDetail} />
                <PrivateRoute path="/profile/:username" component={ProfileComponent} />
                <PrivateRoute path={['/create-activity', '/edit-activity/:id']} component={ActivityForm} key={location.key} />
                <Route component={NotFound} />
              </Switch>
            </div> : <></>
        )} />
      </main>
    </Fragment>
  );
});

export default withRouter(App); // this will give access to router data such as match, location etc.
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
