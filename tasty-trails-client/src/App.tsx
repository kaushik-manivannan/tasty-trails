import './App.scss';
import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate} from 'react-router-dom';
import { Provider} from 'react-redux';
import {store , persistor } from './auth/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import CommentListContainer from './containers/CommentListContainer.tsx';
import LandingPage from './views/LandingPage/LandingPage.tsx';
import PostDetailsPage from './views/PostDetailsPage/PostDetailsPage.tsx';
import SignupFormContainer from './containers/SignUpFormContainer.tsx';
import LoginFormContainer from './containers/LoginFormContainer.tsx';
import NewCommunityPage from './views/NewCommunityPage/NewCommunityPage.tsx';
import CreatePostPage from './views/CreatePostPage/CreatePostPage.tsx';
import CommunityListPage from './views/CommunityListPage/CommunityListPage.tsx';
import CommunityDetailsPage from './views/CommunityDetailsPage/CommunityDetailsPage.tsx';
import ProtectedRoute from './protectedRoute.js';
import i18n from './i18n';
import { Suspense } from'react';
import { useTranslation } from'react-i18next';
import UserProfileViewPage from './views/UserProfileViewPage/UserProfileViewPage.tsx';
import UserProfileEditPage from './views/UserProfileEditPage/UserProfileEditPage.tsx';

const protectedRoutes = [
  { path: '/posts', component: LandingPage },
  { path: '/posts/:postId', component: PostDetailsPage },
  { path:'/communities',component: CommunityListPage },
  { path:'/communities/:communityId', component: CommunityDetailsPage},
  { path:'/new-community',component: NewCommunityPage},
  { path: '/profile', component: UserProfileViewPage},
  { path: '/edit-profile/:userId', component: UserProfileEditPage}
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
  <Route path="/edit-profile/:userId" element={<UserProfileEditPage />} />,
  <Route path="/profile" element={<UserProfileViewPage />} />,,

  ...protectedRoutes.map(route => (
    <Route key={route.path} path={route.path} element={
      <ProtectedRoute>
        {React.createElement(route.component)}
      </ProtectedRoute>
    }/>
  )),
]));

function Loading() {
  return <>Loading...</>;
}
function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, []);

  const lng = navigator.language;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router}/>
        </Suspense>
      </PersistGate>
    </Provider>
  );
}

export default App;
