import './App.css';
import Navbar from './Navbar';
import CardList from './CardList'
import {useState} from 'react'

function App() {
  const [newGame, setNewGame] = useState(false);

  function handleNewGame(){
    setNewGame(true)
  }

  function updateNewGame(){
    setNewGame(false)
  }

  return (
    <div className="App">
      <Navbar handleNewGame={handleNewGame}/>
      <CardList newGame={newGame} updateNewGame={updateNewGame}/>
    </div>
  );
}

export default App;
