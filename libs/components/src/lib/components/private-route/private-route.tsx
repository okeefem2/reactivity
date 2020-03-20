import React, { useContext } from 'react';

import './private-route.scss';
import { RouteProps, RouteComponentProps, Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { userContext } from '@reactivity/user-store';

export interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
}

export const PrivateRoute = observer(({ component: Component, ...rest }: PrivateRouteProps) => {
  const userStore = useContext(userContext);



  return (
    <Route
      {...rest}
      render={(props) => userStore.isLoggedIn ? <Component {...props} /> : <Redirect to={'/'} />}>
    </Route>
  );
});
