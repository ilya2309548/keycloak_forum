import axios from "axios";

const API_URL = "http://localhost:8081/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("keycloak-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Добавляем функцию для создания поста
export const createPost = (post) => api.post("/posts", post);

// Остальные функции
export const getPosts = () => api.get("/posts");
export const getPostById = (postId) => api.get(`/posts/${postId}`);
export const getComments = (postId) => api.get(`/posts/${postId}/comments`);
export const addComment = (postId, comment) => api.post(`/posts/${postId}/comments`, comment);
