import './App.css';

import Header from './components/Header/Header'
import Navbar from './components/NavbarComponent/NavbarComponent'
import Body from './components/BodyComponent/Body'

function App() {
  return (
    <div className="App">
      {/*<Navbar className="App-navbar" />*/}
      <Header className="App-header" />     
      <Body className="App-body" />
    </div>
  );
}

export default App;
