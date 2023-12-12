import './App.scss';
import React from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate} from 'react-router-dom';
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
import CommunityListPage from './views/CommunityListPage/CommunityListPage.tsx';
import CommunityDetailsPage from './views/CommunityDetailsPage/CommunityDetailsPage.tsx';
import ProtectedRoute from './protectedRoute.js';
import UserProfileViewContainer from './containers/UserProfileViewContainer.tsx';
import UserProfileEditContainer from './containers/UserProfileEditContainer.tsx';
import GoogleOAuthSuccess from './containers/GoogleOAuthSucsess.tsx';

const protectedRoutes = [
  { path: '/posts', component: LandingPage },
  { path: '/posts/:postId', component: PostDetailsPage },
  { path:'/communities',component: CommunityListPage },
  { path:'/communities/:communityId', component: CommunityDetailsPage},
  { path:'/new-community',component: NewCommunityPage},

  // ... add other protected routes here ...
];

const router = createBrowserRouter(createRoutesFromElements([
  <Route path='/' element={<Navigate to='/posts'/>}/>,
  <Route path='/signUp' element={ <SignupFormContainer/> }/>,
  <Route path='/login' element = {<LoginFormContainer/>}/>,
  // <Route path='/posts' element={ <LandingPage /> }/>,
  // <Route path='/posts/:postId' element={ <PostDetailsPage /> } />,
  <Route path='/posts/create' element={ <CreatePostPage /> } />,
  <Route path='/comments' element={ <CommentListContainer /> }/>,
  // <Route path='/communities' element={ <CommunityListPage /> }/>,
  // <Route path='/communities/:communityId' element={ <CommunityDetailsContainer /> } />,
  // <Route path='/new-community' element={ <NewCommunityPage /> } />,
  <Route path="/edit-profile/:userId" element={<UserProfileEditContainer />} />,
  
  <Route path="/google/oauth/success" element={<GoogleOAuthSuccess/>} />,


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
