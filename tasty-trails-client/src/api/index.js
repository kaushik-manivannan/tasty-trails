import axios from 'axios';
import {store} from '../auth/store.js';


const API = axios.create({ baseURL: 'http://localhost:8080' });


API.interceptors.request.use((req) => {

    const { token } = store.getState().auth;

 
     if (token) {
       req.headers.Authorization = `Bearer ${token}`;
     }
 
     return req;
   
});

//Post APIs
export const getAllPosts = () => API.get('/posts');
export const getPost = (id) => API.get(`/posts/${id}`);
export const createPost = (data) => API.post(`/posts`, data);

//User API's
export const createUser = (data) => API.post('/users',data);
export const loginUser = (data) => API.post('/users/login',data);