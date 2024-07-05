import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App'
import ErrorPage from "./error-page";
import { HomePage } from './components/layout/HomePage'
import { Game } from './components/game/Game'
import { Header } from './components/layout/Header'
import { Register } from './components/auth/Register'
import { ConLogin, ConLogout, ConUserData, ConPasswordReset, ConPasswordChange, } from './containers/Auth'
import { ConExercisesList, ConExerciseDetails, ConSectionsList, ConSubsectionsList, ConUserDataExProvider, } from './containers/Ex'
import { PostList } from './components/blog/PostList'

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

    ],
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
