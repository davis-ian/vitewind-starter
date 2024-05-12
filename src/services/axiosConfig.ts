import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

// // Add a request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // You can modify the request config before it is sent
//     // For example, add an Authorization header if needed
//     // config.headers.Authorization = `Bearer ${token}`;

//     // Check if the URL is absolute
//     const isAbsoluteURL = /^(?:[a-z]+:)?\/\//i.test(config.url || '');

//     if (isAbsoluteURL) {
//       // If the URL is absolute, clear the baseURL to use the full URL
//       config.baseURL = '';
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// //Add a response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     //Any status code within the range of 2xx wil trigger this function
//     return response;
//   },
//   (error) => {
//     //Handle response errors here
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
