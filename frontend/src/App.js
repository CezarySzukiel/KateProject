import logo from './logo.svg';
import './App.css';

import Header from './components/Header/Header.js'
import ExercisesComponent from './components/ExercisesComponent/ExercisesComponent.js'
import Navbar from './components/NavbarComponent/NavbarComponent.js'

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        
        <Header />
        
      </header>
    </div>
  );
}

export default App;
