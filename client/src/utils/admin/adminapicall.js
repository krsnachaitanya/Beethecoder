import { api } from '../../backend';

export const createDoc = async ({ token, link, json, data }) => {
  try {
    const response = await fetch(`${api}${link}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        ...(json && { 'Content-Type': 'application/json' }),
        Authorization: `Bearer ${token}`,
      },
      body: json ? JSON.stringify(data) : data,
    });
    return response.json();
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

export const getAllDocs = async ({ token, query }) => {
  try {
    const response = await fetch(`${api}${query}`, {
      method: 'GET',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return response.json();
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

export const getDoc = async ({ token, link, id }) => {
  try {
    const response = await fetch(`${api}${link}/${id}`, {
      method: 'GET',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return response.json();
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

export const updateDoc = async ({ token, link, json, id, data }) => {
  try {
    const response = await fetch(`${api}${link}/${id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        ...(json && { 'Content-Type': 'application/json' }),
        Authorization: `Bearer ${token}`,
      },
      body: json ? JSON.stringify(data) : data,
    });
    return response.json();
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

export const deleteDoc = async ({ token, link, id }) => {
  try {
    const response = await fetch(`${api}${link}/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};
