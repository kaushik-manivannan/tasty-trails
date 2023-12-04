import './App.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import PostListContainer from './containers/PostListContainer.tsx';
import SignupFormContainer from './containers/SignUpFormContainer.tsx';

const router = createBrowserRouter(createRoutesFromElements([
  <Route path='/posts' element={ <PostListContainer /> }/>,
  <Route path='/signUp' element={ <SignupFormContainer/> }/>
]));

function App() {
  return (
      <RouterProvider router={ router } />
     
  );
}

export default App;
