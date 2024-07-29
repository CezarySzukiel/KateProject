import './App.css';
import { Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Navbar } from "./components/layout/Navbar";

function App() {
  const isNavbar = useSelector(state => state.layout.isNavbar)

  return (
    <>
        <div className="App">
          <Header />
          <div className="Content">
            <div className={"Outlet"}>
              <Outlet />
            </div>
            {isNavbar &&
              <Navbar />
            }
          </div>
          <Footer />
        </div>
    </>
  )
} 

export default App;
