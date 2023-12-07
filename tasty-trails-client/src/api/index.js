import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' });

export const getAllPosts = () => API.get('/posts');
export const getPost = (id) => API.get(`/posts/${id}`);