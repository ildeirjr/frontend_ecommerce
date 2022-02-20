import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://localhost:7287/'
});

axiosInstance.interceptors.response.use(response => {
      return response;
  }, error => {
      if (error.response.status === 401) {
          localStorage.removeItem('api_token');
          window.location.href = '/';
      }
      return Promise.reject(error);
  });