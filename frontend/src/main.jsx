import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// import Root from "./routes/root"; do skasowania razem z folderem routes. tam są niepotrzebne komponenty z tutorialu
import App from './App.jsx'
import ErrorPage from "./error-page";
import { HomePage } from './components/HomePage/HomePage'
import { Exercises } from './components/Exercises/Exercises'
import { Game } from './components/Game/Game'
import { Login } from './components/Login/Login'
import { Register } from './components/Register/Register'
import { UserSettings } from './components/UserSettings/UserSettings'
import Body from './components/Body/Body'

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
        element: <Login />,
      },
      {
        path: "register/",
        element: <Register />,
      },
      {
        path: "user/",
        element: <UserSettings />,
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
