import axios from "axios";

const AUTH_URL = "http://localhost:8080/api/users";

export const loginUser = (data) =>
  axios.post(`${AUTH_URL}/login`, data);

export const registerUser = (data) =>
  axios.post(`${AUTH_URL}/register`, data);












// import axios from "axios";

// const API_URL = 'http://localhost:8080/api';

// const api = axios.create({
//     baseURL:API_URL
// });

// api.interceptors.request.use((config) => {
//     const userId = localStorage.getItem('userId');
//     const token = localStorage.getItem('token');

//     if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//     }

//     if (userId) {
//         config.headers['X-User-ID'] = userId;
//     }
//     return config;
// }
// );


// export const getActivities = () => api.get('/activities');
// export const addActivity = (activity) => api.post('/activities', activity);
// export const getActivityDetail = (id) => api.get(`/recommendations/activity/${id}`);