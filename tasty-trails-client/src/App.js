import './App.scss';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './auth/store.js';
import CommentListContainer from './containers/CommentListContainer.tsx';
import CommunityListContainer from './containers/CommunityListContainer.tsx';
import LandingPage from './views/LandingPage/LandingPage.tsx';
import PostDetailsPage from './views/PostDetailsPage/PostDetailsPage.tsx';
import SignupFormContainer from './containers/SignUpFormContainer.tsx';
import LoginFormContainer from './containers/LoginFormContainer.tsx';
import NewCommunity from './components/NewCommunity.tsx';

const router = createBrowserRouter(createRoutesFromElements([
  <Route path='/signUp' element={ <SignupFormContainer/> }/>,
  <Route path='/login' element = {<LoginFormContainer/>}/>,
  <Route path='/posts' element={ <LandingPage /> }/>,
  <Route path='/posts/:postId' element={ <PostDetailsPage /> } />,
  <Route path='/comments' element={ <CommentListContainer /> }/>,
  <Route path='/communites' element={ <CommunityListContainer /> }/>,
  <Route path='/new-community' element={ <NewCommunity /> } />
]));

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={ router } />
    </Provider>  
  );
}

export default App;
