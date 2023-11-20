import axios from 'axios';

const axiosInstance =
  process.env.NODE_ENV === 'development'
    ? axios.create({
        baseURL: 'http://localhost:3000/'
      })
    : axios.create({
        baseURL: 'https://api.hellokompass.com/'
      });

axiosInstance.interceptors.request.use(
  function (config) {
    if (!config.headers.Authorization) {
      const usersInfo = JSON.parse(sessionStorage.getItem('usersInfo'));
      if (usersInfo) {
        config.headers.Authorization = `Bearer ${usersInfo}`;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
