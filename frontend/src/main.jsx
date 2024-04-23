import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.jsx'
import ErrorPage from "./error-page";
import { HomePage } from './components/homePage/HomePage'
import { Exercises } from './components/exercises/Exercises'
import { Game } from './components/game/Game'
import { ConLogin } from './containers/Auth.jsx'
import { Header } from './components/header/Header.jsx'
import { ConLogout } from "./containers/Auth"
import { Register } from './components/register/Register'
import { ConUserData } from './containers/Auth.jsx'
import { ConPasswordReset } from './containers/Auth.jsx'

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
        path: "exercises/",
        element: <Exercises />,
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
        element: <ConUserData />,
      },
      {
        path: "password-reset/:uid/:token",
        element: <ConPasswordReset />,
      },
      {
        path: "game/",
        element: <Game />,
      },
    ],
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
