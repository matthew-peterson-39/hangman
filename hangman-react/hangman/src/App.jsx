import { useEffect, useState } from 'react'
import words from './data/words.json'
import './App.css'

function App() {
  const [answer, setAnswer] = useState('')
  const [answerHidden, setAnswerHidden] = useState(false)
  
  const [solutionAttempt, setSolutionAttempt] = useState('')
  const [letterGuess, setLetterGuess] = useState('');
  const [guessHistory, setGuessHistory] = useState('');
  
  const [attemptCount, setAttemptCount] = useState(0);
  
  //set answer each time page loads -> useEffect
  useEffect(() => {
    setAnswer(words[Math.floor(Math.random() * words.length)].toUpperCase())
  }, [words])
  
  //handle user guessing a letter
  const handleGuessedLetter = () => {
    let allGuess = [...guessHistory, letterGuess]
    // update guess history state with prevous + new guess
    setGuessHistory(allGuess)
    if(!answer.includes(letterGuess)) {  //check if letter guessed is in answer
      setAttemptCount(attemptCount+1);
    }
    setLetterGuess('')  //clear guess input
  }

  const hideAnswer = () => {
    setAnswerHidden(!answerHidden)
  }

  const solveWord = () => {
    console.log(solutionAttempt)
    if(answer === solutionAttempt) {
      alert('You won!')
      setAttemptCount(0)
      setSolutionAttempt('')
      setLetterGuess('')
      setGuessHistory('')
      setAnswer(words[Math.floor(Math.random() * words.length)].toUpperCase())
    }
    else {
      setAttemptCount(attemptCount+1)
    }
  }
  const restartGame = () => {
    location.reload()
  }

  const wordDisplay = answer.split("").map((letter) => (guessHistory.includes(letter) ? letter : "_")).join(" ");

  return (
    <>
      <div id='main-container'>
        <h1>Hangman Game!</h1>
        <div id='answer' className='container'>    
            <div id='answer-text' className={answerHidden ? "hidden" : ""}>
                {attemptCount < 6 ? answer : 'You Lose!'}
            </div>
            <div id='answer-button'>
              <button onClick={attemptCount < 6 ? hideAnswer : restartGame}>
                  {attemptCount < 6 ? 'Answer' : 'Restart'}
              </button>
            </div>
        </div>    
        <div id='current-word'>Current word: {wordDisplay}</div>
        <div id='wrong-attempts'>Wrong Attempts: {attemptCount}</div>
        <div className='input-field' id='letter-input'>
          <input 
            type="text"
            value={letterGuess}
            maxLength={1}
            onChange={(e) => setLetterGuess(e.target.value.toUpperCase())} />
          <button onClick={handleGuessedLetter} disabled={attemptCount == 6 ? true : false }>Guess: {letterGuess}</button>        
        </div>
       
       <div className='input-field' id="solution-input">
          <input 
            type="text"
            value={solutionAttempt}
            onChange={(e) => setSolutionAttempt(e.target.value.toUpperCase())} />
          <button onClick={solveWord} disabled={attemptCount == 6 ? true : false }>Solve: {solutionAttempt}</button>
        </div>

      </div>
    </>
  )
}

export default App
