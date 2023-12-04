import './App.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import PostListContainer from './containers/PostListContainer.tsx';
import CommunityListContainer from './containers/CommunityListContainer.tsx';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path='/posts' element={ <PostListContainer /> }>
      //Add routes
    </Route>,
    <Route path='/communites' element={ <CommunityListContainer /> }>
      //Add routes
    </Route>
  ])
);

function App() {
  return (
      <RouterProvider router={ router } />
  );
}

export default App;
