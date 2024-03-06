import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes} from 'react-router-dom';

import { Header } from './components/Header/Header'
import { Navbar } from './components/Navbar/Navbar'
import { Exercises } from './components/Exercises/Exercises'
import { Game } from './components/Game/Game'
import { HomePage } from './components/HomePage/HomePage'
import { Login } from './components/Login/Login'
import { Register } from './components/Register/Register'
import { UserSettings } from './components/UserSettings/UserSettings'
import Body from './components/Body/Body'

function App() {
  return (
    <>
      <Header />
      <HomePage />
    </>
  )



  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={<><Header /> <HomePage /></>}/>
  //     </Routes>
  //   </Router>
  // ) //działa chaupniczo
  

//   return (
//     <Router>
//       <Routes>
//         <Route path="home" element={<Header />}>
//           {/*<Route path="home" element={<HomePage />} />*/}
//           <Route path="login" element={<Login />} />
//           <Route path="register" element={<Register />} />
//           <Route path="user-settings" element={<UserSettings />} />
//           <Route path="exercises" element={<Exercises />} />
//           <Route path="game" element={<Game />} />
//         </Route>
//       </Routes>
//     </Router>
//   ); // wyświetla tylko Header
} 

export default App;
