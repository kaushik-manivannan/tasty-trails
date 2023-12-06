import './App.scss';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import PostListContainer from './containers/PostListContainer.tsx';
import PostDetailsContainer from './containers/PostDetailsContainer.tsx';
import CommentListContainer from './containers/CommentListContainer.tsx';
import CommunityListContainer from './containers/CommunityListContainer.tsx';

const router = createBrowserRouter(createRoutesFromElements([
  <Route path='/posts' element={ <PostListContainer /> }/>,
  <Route path='/posts/:postId' element={ <PostDetailsContainer /> } />,
  <Route path='/comments' element={ <CommentListContainer /> }/>,
  <Route path='/communites' element={ <CommunityListContainer /> }/>
]));

function App() {
  return (
      <RouterProvider router={ router } />
  );
}

export default App;
