import axios from "axios";
// Define a custom parameter serializer function
// const customParamsSerializer = (params) => {
//   return Object.entries(params)
//     .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
//     .join('&');
// };

export const clientAxios = axios.create({
  baseURL: 'http://localhost:8080/api',
  // paramsSerializer: customParamsSerializer,
});

// Attach token into header
// clientAxios.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('token');

//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

