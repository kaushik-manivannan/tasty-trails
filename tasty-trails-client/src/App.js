import './App.scss';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
import { Provider} from 'react-redux';
import {store , persistor } from './auth/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import CommentListContainer from './containers/CommentListContainer.tsx';
import CommunityListContainer from './containers/CommunityListContainer.tsx';
import CommunityDetailsContainer from './containers/CommunityDetailsContainer.tsx';
import LandingPage from './views/LandingPage/LandingPage.tsx';
import PostDetailsPage from './views/PostDetailsPage/PostDetailsPage.tsx';
import SignupFormContainer from './containers/SignUpFormContainer.tsx';
import LoginFormContainer from './containers/LoginFormContainer.tsx';
import NewCommunityPage from './views/NewCommunityPage/NewCommunityPage.tsx';
import CreatePostContainer from './containers/CreatePostContainer.tsx';
import CreatePostPage from './views/CreatePostPage/CreatePostPage.tsx';
import ProtectedRoute from './protectedRoute.js';

const protectedRoutes = [
  { path: '/posts', component: LandingPage },
  { path: '/posts/:postId', component: PostDetailsPage },
  // ... add other protected routes here ...
];

const router = createBrowserRouter(createRoutesFromElements([
  <Route path='/' element={<Navigate to='/login'/>}/>,
  <Route path='/signUp' element={ <SignupFormContainer/> }/>,
  <Route path='/login' element = {<LoginFormContainer/>}/>,
  // <Route path='/posts' element={ <LandingPage /> }/>,
  // <Route path='/posts/:postId' element={ <PostDetailsPage /> } />,
  <Route path='/posts/create' element={ <CreatePostPage /> } />,
  <Route path='/comments' element={ <CommentListContainer /> }/>,
  <Route path='/communities' element={ <CommunityListContainer /> }/>,
  <Route path='/communities/:communityId' element={ <CommunityDetailsContainer /> } />,
  <Route path='/new-community' element={ <NewCommunityPage /> } />,

  ...protectedRoutes.map(route => (
    <Route key={route.path} path={route.path} element={
      <ProtectedRoute>
        {React.createElement(route.component)}
      </ProtectedRoute>
    }/>
  )),
]));

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}/>
      </PersistGate>
    </Provider>
  );
}

export default App;
