import axios from 'axios';

export const uploadActionFile = async (formData) => {
  const response = await axios.post('/api/v1/uploads/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};
