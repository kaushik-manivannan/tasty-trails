import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' });


export const fetchPosts = () => API.get('/posts');


//User API's
export const createUser = (data) => API.post('/users',data);

