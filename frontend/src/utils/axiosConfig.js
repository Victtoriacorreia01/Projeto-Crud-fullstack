import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 15000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para requisições GET
export const fetcher = async (url, config = {}) => {
  try {
    const response = await axiosInstance.get(url, config);
    return response.data;
  } catch (error) {
    console.error('Erro no fetcher (GET):', error);
    throw error;
  }
};

// Função para requisições POST
export const poster = async (url, data, config = {}) => {
  try {
    const response = await axiosInstance.post(url, data, config);
    return response.data;
  } catch (error) {
    console.error('Erro no poster (POST):', error);
    throw error;
  }
};

// Função para requisições DELETE
export const deleter = async (url, config = {}) => {
  try {
    const response = await axiosInstance.delete(url, config);
    return response.data;
  } catch (error) {
    console.error('Erro no deleter (DELETE):', error);
    throw error;
  }
};

// Função para requisições PUT
export const putter = async (url, data, config = {}) => {
  try {
    const response = await axiosInstance.put(url, data, config);
    return response.data;
  } catch (error) {
    console.error('Erro no putter (PUT):', error);
    throw error;
  }
};

export default axiosInstance;
