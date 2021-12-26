import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authRoute } from 'containers/application/App/routes';

const PrivateRoute = ({
  component: Component,
  isAuthorized,
  path,
  ...rest
}) => (
  isAuthorized
    ? (
      <Route
        path={path}
        {...rest}
        render={props => (
          <Component {...props} />
        )}
      />
    ) : (
      <Redirect to={authRoute} />
    )
);

export default PrivateRoute;
