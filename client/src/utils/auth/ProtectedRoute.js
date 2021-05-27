import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../pages/user-account/userContext';

const ProtectedRoute = ({
  component: Component,
  restrictTo = 'admin',
  ...rest
}) => {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user && user.data.role === restrictTo ? (
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
