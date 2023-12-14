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
export const updatePost = (id, data) => API.put(`/posts/${id}`, data);
export const deletePost = (id) => API.delete(`/posts/${id}`);

//User API's
export const createUser = (data) => API.post('/users',data);
export const loginUser = (data) => API.post('/users/login',data);
export const updateUser = (id,data) => API.put(`/users/${id}`, data);
export const getUserById = (id) => API.get(`/users/${id}`);
export const getuserCommunities = (id)=> API.get(`/users/${id}/communities`);

//Community API's
export const createCommunity = (data) => API.post('/communities',data);
export const getAllCommunities = () => API.get(`/communities/`);
// export const getCommunity = (id) => API.get(`/communities/${id}`);
export const getAllCommunityDetailsById = (id) => API.get(`/communities/${id}`);
export const updateCommunityById = (id,data) => API.put(`/communities/${id}`,data);

//Comment API's
export const getAllCommentsByPostId = (postId) => API.get(`/comments/${postId}`);
export const getAllCommentsByUserId = (userId) => API.get(`/users/${userId}`);
export const updateCommentById = (id,data) => API.put(`/comments/${id}`,data);
export const createComment = (data) => API.post(`/comments`,data);
export const deleteCommentById = (id) => API.delete(`/comments/${id}`);
