import axios from 'axios';
import store from '../auth/store.js';


const API = axios.create({ baseURL: 'http://localhost:8080' });

API.interceptors.request.use((req) => {

     const { token } = store.getState().auth;

  
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
  
      return req;
    
});


export const fetchPosts = () => API.get('/posts');


//User API's
export const createUser = (data) => API.post('/users',data);
export const loginUser = (data) => API.post('/users/login',data);

