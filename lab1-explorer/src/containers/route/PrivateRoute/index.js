import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authRoute } from 'containers/application/App/routes';
import { useSelector } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  path,
  ...rest
}) => {
  const isAuthorized = useSelector(state => Boolean(state.user.activeCredentials));
  return (
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
};

export default PrivateRoute;
