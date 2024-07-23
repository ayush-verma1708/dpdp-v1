import axios from 'axios';

const API_URL = 'http://localhost:8021/api/v1/companies';
const ADD_COMPANY_API_URL = 'http://localhost:8021/api/v1/companies/add-company';

export const getCompanies = async (pageNumber) => {
  const { data } = await axios.get(`${API_URL}?pageNumber=${pageNumber}`);
  return data;
};

export const addCompany = async (company) => {
  const { data } = await axios.post(ADD_COMPANY_API_URL, company);
  return data;
};
