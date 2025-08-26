import React,{useState, useEffect} from 'react'
import loading_gif from "../../../public/loading.gif"
import Question from '../Questions/Question'
import Results from '../Results/Results'
import './Quizz.css'

const Quizz = ({onFinish, highScore, setHighScore}) => {
  
  const [questions, setQuestions] = useState([])
  const [finished, setFinished] = useState(false)
  const [score, setScore] = useState(0)
  const [start, setStart] = useState(false)
  
  async function fetchQuestions() {
    const res = await fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple');
    const data = await res.json();
    setQuestions(data.results);
  }
  
  useEffect(() => {
    fetchQuestions();
  }, [])

  function handleStart(){
    setStart(true);
  }

  useEffect(() => {
    if(finished) {
      onFinish(score);
    }
  }, [finished]);

  if(score > highScore) {
    setHighScore(score);
  }

  return (
      <div className='quizz-body'>
        {!start && (
          <div className="start-container">
            <h2>Ready to Test Your Knowledge?</h2>
            <p>You'll be asked 10 questions about computer awareness.</p>
            <button className="start-button" onClick={handleStart}>Start Quiz</button>
          </div>
        )}
        <Question questions={questions} finished={finished} setFinished={setFinished} setScore={setScore} start={start}/>
        <Results submit={finished} score={score} total={questions.length} highScore={highScore} />
      </div>

  )
}

export default Quizz
