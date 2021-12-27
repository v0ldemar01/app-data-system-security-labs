import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { homeRoute } from 'containers/application/App/routes';

const PublicRoute = ({
  component: Component,
  ...rest
}) => {
  const isAuthorized = useSelector(state => Boolean(state.user.activeCredentials));
  return (
    isAuthorized
      ? <Redirect to={homeRoute} />
      : <Route {...rest} render={props => <Component {...props} />} />
  );
};

export default PublicRoute;
