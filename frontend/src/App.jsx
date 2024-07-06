import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes, Outlet} from 'react-router-dom';
import { Provider } from "react-redux";

import { store } from "./store/store"
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'

function App() {
  return (
    <>
      <Provider store={store}>
        <div className="App">
          <Header />
          <div className="Content">
            <Outlet />
          </div>
          <Footer />
        </div>
      </Provider>
    </>
  )
} 

export default App;
