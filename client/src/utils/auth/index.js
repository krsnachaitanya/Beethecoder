import { api } from '../../backend';

export const signup = async (user) => {
  try {
    const response = await fetch(`${api}/users/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
};

export const signin = async (user) => {
  try {
    const response = await fetch(`${api}/users/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
};

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
};

export const signout = async (next) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt');
      next();
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  } else {
    return false;
  }
};
