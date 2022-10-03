import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { createContext, useEffect, useState } from "react";
import { boardDefault, generateWordSet } from './components/Words';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([])

  const correctWord = "RIGHT";

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
    })
  }, [])

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos += 1 })
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard)
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos -= 1 })
  }

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;

    let currentWord = "";
    for (let i = 0; i < 5; i++) {
      currentWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currentWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt += 1, letterPos: currAttempt.letterPos = 0 })
    } else {
      alert("Word not found!")
    }

    if (currentWord === correctWord) {
      alert("you won")
    }

  }
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider value={{
        board,
        setBoard,
        currAttempt,
        setCurrAttempt,
        onSelectLetter,
        onDelete,
        onEnter,
        correctWord,
        setDisabledLetters,
        disabledLetters
      }}>
        <div className='game'>
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
