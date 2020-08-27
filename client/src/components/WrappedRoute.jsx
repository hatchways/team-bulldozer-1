import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { UserContext } from '../contexts/User';

import AppLayout from '../layouts/AppLayout';
import SignedOutLayout from '../layouts/SignedOutLayout';

const WrappedRoute = ({
  component: Component,
  isPrivateRoute,
  layoutProps,
  ...routeProps
}) => {
  const { user } = useContext(UserContext);

  if (isPrivateRoute && !user) {
    return <Route {...routeProps} render={() => <Redirect to="/" />} />;
  }

  if (!isPrivateRoute && user) {
    return <Route {...routeProps} render={() => <Redirect to="/dashboard" />} />;
  }

  const Layout = user ? AppLayout : SignedOutLayout;

  return (
    <Route
      {...routeProps}
      render={(props) => (
        <Layout {...layoutProps}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

WrappedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.object]).isRequired,
  isPrivateRoute: PropTypes.bool,
  layoutProps: PropTypes.object,
};

WrappedRoute.defaultProps = {
  isPrivateRoute: false,
  layoutProps: {},
};

export default WrappedRoute;
