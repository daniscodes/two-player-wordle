import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App';

function Letter({ letterPos, attemptVal }) {
  const { board, correctWord, currAttempt, disabledLetters, setDisabledLetters } = useContext(AppContext);
  const letter = board[attemptVal][letterPos];

// define correct letters (both position and character)
  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter);

// determine letter match to position and value of correct word
  const letterState =  currAttempt.attempt > attemptVal &&
  (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter])
    }
  }, [currAttempt.attempt])

  return (
    <div className='letter' id={letterState}>{letter}</div>
  )
}

export default Letter