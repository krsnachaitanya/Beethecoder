import React, { useState } from 'react';

export const UserContext = React.createContext();

export const UserProvider = (props) => {
  const loadUser = () =>
    typeof window !== 'undefined' && localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : undefined;

  const [user, setUser] = useState(loadUser());

  const authenticate = (data) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'user',
        JSON.stringify({ token: data.token, data: data.data.user })
      );
      setUser({ token: data.token, data: data.data.user });
    }
  };

  const signout = async (next) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        setUser(undefined);
        next();
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <UserContext.Provider value={{ user, signout, authenticate }}>
      {props.children}
    </UserContext.Provider>
  );
};
