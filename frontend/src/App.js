import logo from './logo.svg';
import './App.css';

import Header from './components/Header/Header.js'
import ExercisesComponent from './components/ExercisesComponent/ExercisesComponent.js'
import Navbar from './components/NavbarComponent/NavbarComponent.js'
import Body from './components/BodyComponent/Body.js'

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        
        <Header />
        <Body />
        
      </header>
    </div>
  );
}

export default App;
