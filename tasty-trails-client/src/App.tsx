import './App.scss';
import "react-toastify/dist/ReactToastify.css";
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
import { Suspense } from'react';
import { useTranslation } from'react-i18next';
import UserProfileViewPage from './views/UserProfileViewPage/UserProfileViewPage.tsx';
import UserProfileEditPage from './views/UserProfileEditPage/UserProfileEditPage.tsx';
import GoogleOAuthSuccess from './containers/GoogleOAuthSuccess.tsx';
import { ToastContainer } from 'react-toastify';
 
const protectedRoutes = [
  { path: '/posts', component: LandingPage },
  { path: '/posts/:postId', component: PostDetailsPage },
  { path:'/communities',component: CommunityListPage },
  { path:'/communities/:communityId', component: CommunityDetailsPage},
  { path:'/new-community',component: NewCommunityPage},
  { path: '/profile', component: UserProfileViewPage},
  { path: '/edit-profile/:userId', component: UserProfileEditPage},
  { path: '/posts/create', component: CreatePostPage},
  { path: '/comments', component: CommentListContainer},
  { path: '/edit-profile/:userId', component: UserProfileEditPage},
  { path: '/profile', component: UserProfileViewPage},
  // ... add other protected routes here ...
];
 
const router = createBrowserRouter(createRoutesFromElements([
  <Route path='/' element={<Navigate to='/posts'/>}/>,
  <Route path='/signUp' element={ <SignupFormContainer/> }/>,
  <Route path='/login' element = {<LoginFormContainer/>}/>,
  <Route path="/google/oauth/success" element={<GoogleOAuthSuccess/>} />,
 
 
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
  const { i18n } = useTranslation();
 
  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, []);
 
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Suspense fallback={<Loading />}>
            <RouterProvider router={router}/>
          </Suspense>
        </PersistGate>
      </Provider>
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
 
export default App;