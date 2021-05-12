import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '.';

const ProtectedRoute = ({
  component: Component,
  restrictTo = 'admin',
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().data.user.role === restrictTo ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/users/signin', state: { form: props.location } }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
