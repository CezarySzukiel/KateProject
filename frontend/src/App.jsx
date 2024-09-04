import './App.css';
import { Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Sidebar } from "./components/layout/Sidebar.jsx";

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
              <Sidebar />
            }
          </div>
          <Footer />
        </div>
    </>
  )
} 

export default App;
