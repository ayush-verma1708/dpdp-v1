import axios from 'axios';

const API_URL = 'http://localhost:8021/api/v1/actions';

export const fetchActions = async () => {
  return axios.get(API_URL);
};

export const addAction = async (newAction) => {
  return axios.post(API_URL, newAction);
};

export const editAction = async (id, updatedAction) => {
  return axios.put(`${API_URL}/${id}`, updatedAction);
};

export const deleteAction = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
