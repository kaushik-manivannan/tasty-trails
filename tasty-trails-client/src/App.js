import './App.scss';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import CommentListContainer from './containers/CommentListContainer.tsx';
import CommunityListContainer from './containers/CommunityListContainer.tsx';
import LandingPage from './views/LandingPage/LandingPage.tsx';
import PostDetailsPage from './views/PostDetailsPage/PostDetailsPage.tsx';

const router = createBrowserRouter(createRoutesFromElements([
  <Route path='/posts' element={ <LandingPage /> }/>,
  <Route path='/posts/:postId' element={ <PostDetailsPage /> } />,
  <Route path='/comments' element={ <CommentListContainer /> }/>,
  <Route path='/communites' element={ <CommunityListContainer /> }/>
]));

function App() {
  return (
      <RouterProvider router={ router } />
  );
}

export default App;
