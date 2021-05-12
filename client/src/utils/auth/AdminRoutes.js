import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '.';

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().user.role === 'admin' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/users/signin', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
