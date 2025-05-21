import axios from 'axios';

// Criação da instância do axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api', // Porta e rota base corretas do backend
  timeout: 15000, // Timeout de 15 segundos
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

// Exporta a instância configurada
export default axiosInstance;
