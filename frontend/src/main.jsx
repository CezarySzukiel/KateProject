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
import { ConnectedLogin } from './containers/Auth.jsx'
import { Header } from './components/header/Header.jsx'
import { Logout } from "./components/logout/Logout"
import { Register } from './components/register/Register'
import { ConnectedUserData } from './containers/Auth.jsx'

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
        element: <ConnectedLogin />,
      },
      {
        path: "logout/",
        element: <Logout />,
      },
      {
        path: "register/",
        element: <Register />,
      },
      {
        path: "user/",
        element: <ConnectedUserData />,
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
