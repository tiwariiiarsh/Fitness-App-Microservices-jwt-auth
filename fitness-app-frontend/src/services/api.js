import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ---------- ACTIVITY APIs ---------- */
export const addActivity = (activity) =>
  api.post("/activities", activity);

export const getActivities = () =>
  api.get("/activities");

export const getActivityDetail = (id) =>
  api.get(`/recommendations/activity/${id}`);

export default api;
