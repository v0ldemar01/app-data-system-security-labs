import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
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

PublicRoute.propTypes = {
  component: PropTypes.elementType.isRequired
};

export default PublicRoute;
