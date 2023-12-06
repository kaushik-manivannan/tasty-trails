import './App.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import PostListContainer from './containers/PostListContainer.tsx';
import CommunityListContainer from './containers/CommunityListContainer.tsx';
import NewCommunity from './components/NewCommunity.tsx';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path='/posts' element={ <PostListContainer /> }>
      //Add routes
    </Route>,
    <Route path='/communites' element={ <CommunityListContainer /> }>
    </Route>,
    <Route path='/new-community' element={ <NewCommunity /> } />

  ])
);

function App() {
  return (
      <RouterProvider router={ router } />
  );
}

export default App;
