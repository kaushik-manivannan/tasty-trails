import './App.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import PostListContainer from './containers/PostListContainer.tsx';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/posts' element={ <PostListContainer /> }>
    //Add routes
  </Route>
));

function App() {
  return (
      <RouterProvider router={ router } />
  );
}

export default App;
