import './App.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './auth/store.js';
import PostListContainer from './containers/PostListContainer.tsx';
import SignupFormContainer from './containers/SignUpFormContainer.tsx';
import LoginFormContainer from './containers/LoginFormContainer.tsx';

const router = createBrowserRouter(createRoutesFromElements([
  <Route path='/posts' element={ <PostListContainer /> }/>,
  <Route path='/signUp' element={ <SignupFormContainer/> }/>,
  <Route path='/login' element = {<LoginFormContainer/>}/>
]));

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={ router } />
    </Provider>
     
  );
}

export default App;
