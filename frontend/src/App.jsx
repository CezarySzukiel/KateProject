import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes, Outlet} from 'react-router-dom';

import { Header } from './components/Header/Header'

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
} 

export default App;
