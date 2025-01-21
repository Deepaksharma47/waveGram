import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Set your API base URL
  timeout: 10000, // Set a timeout for requests
});

// Add a request interceptor to include the token in the headers
apiClient.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('token') as string); // Retrieve the token (from localStorage, for example)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the Bearer token to the headers
    }

    // Dynamically set Content-Type based on the request data
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => {
    // Handle errors in the request setup
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle responses or errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response; // Return the response if it's successful
  },
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      console.error('Unauthorized. Redirecting to login...');
      // Optionally, redirect to a login page or perform logout
    }
    return Promise.reject(error);
  }
);

export default apiClient;




// import axios from 'axios';
// // import { setAuthorizationToken } from './setAuthorizationToken';
// import { setAuthorizationToken } from '../actions/token.action';

// const apiClient = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, // Replace with your API base URL
//   timeout: 10000,
// });

// // Add the Authorization token before every request
// apiClient.interceptors.request.use(
//     (config) => {
//       const token =  JSON.parse(localStorage.getItem('token') as string);
//       console.log(token, typeof(token),"kdjfkjskjdfk")
//       if (token) {
//         setAuthorizationToken(apiClient); // Assuming this sets the token in the headers
//       } else {
//         console.warn('No token found in sessionStorage or localStorage');
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );
// export default apiClient;
