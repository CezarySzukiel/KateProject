import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./store/store"
import App from './App'
import ErrorPage from "./error-page";
import { HomePage } from './components/layout/HomePage'
import { Game } from './components/game/Game'
import { Header } from './components/layout/Header'
import { Register } from './components/auth/Register'
import { ConLogin, ConLogout, ConUserData, ConPasswordReset, ConPasswordChange, } from './containers/Auth'
import { ConExercisesList, ConExerciseDetails, ConSectionsList, ConSubsectionsList, ConUserDataExProvider, } from './containers/Ex'
import { PostList } from './components/blog/PostList'
import Privacy from './components/other/Privacy'
import { PostDetails } from './components/blog/PostDetails'
import { Contact } from './components/layout/Contact'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home/",
        element: <HomePage />,
      },
      {
        path: "login/",
        element: <ConLogin />,
      },
      {
        path: "logout/",
        element: <ConLogout />,
      },
      {
        path: "register/",
        element: <Register />,
      },
      {
        path: "user/",
        element: <ConUserDataExProvider />,
      },
      {
        path: "password-reset/:uid/:token",
        element: <ConPasswordReset />,
      },
      {
        path: "password-change/",
        element: <ConPasswordChange />,
      },
      {
        path: "game/",
        element: <Game />,
      },
      {
        path: "sections/",
        element: <ConSectionsList />,
      },
      {
        path: "sections/subsections/",
        element: <ConSubsectionsList />,
      },
      {
        path: "sections/subsections/exercises",
        element: <ConExercisesList />,
      },
      {
        path: "exercises/details/",
        element: <ConExerciseDetails />,
      },
      {
        path: "/blog/",
        element: <PostList />,
      },
      {
        path: "/privacy-policy/",
        element: <Privacy />,
      },
      {
        path: "/contact/",
        element: <Contact />,
      },
      {
        path: "/post/",
        element: <PostDetails />,
      },

    ],
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
