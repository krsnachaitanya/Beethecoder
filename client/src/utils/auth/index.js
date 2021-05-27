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
