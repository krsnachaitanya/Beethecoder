import { api } from '../../backend';

export const createCategoryAPI = async (token, category) => {
  try {
    const data = await fetch(`${api}/categories`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });
    return data.json();
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};
