import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes, Outlet} from 'react-router-dom';
import { Provider } from "react-redux";

import { store } from "./store/store"
import { Header } from './components/header/Header'

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Outlet />
      </Provider>
    </>
  )
} 

export default App;
