import './App.css';

import Header from './components/Header/Header'
// import { ExercisesComponent } from './components/ExercisesComponent/ExercisesComponent'
import Navbar from './components/NavbarComponent/NavbarComponent'
import Body from './components/BodyComponent/Body'

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        
        <Header />
        
        
      </header>
      <body className="App-body">
        <Body />
      </body>
      
    </div>
  );
}

export default App;