import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { homeRoute } from 'containers/application/App/routes';

const PublicRoute = ({
  component: Component,
  isAuthorized,
  ...rest
}) => (
  isAuthorized
    ? <Redirect to={homeRoute} />
    : <Route {...rest} render={props => <Component {...props} />} />
);

export default PublicRoute;
