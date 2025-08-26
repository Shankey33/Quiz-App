import React,{useState, useEffect} from 'react'
import Header from './Components/Header/Header'
import Quizz from './Components/Quizz/Quizz'
import Results from './Components/Results/Results'

const App = () => {
  const [highScore, setHighScore] = useState(0);
  const [submit, setSubmit] = useState(false)

  useEffect(() => {
    const storedHighScore = localStorage.getItem('highScore');
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('highScore', highScore);
  }, [highScore]);

  const handleQuizFinish = (score) => {
    setSubmit(true);
    if(score > highScore) {
      setHighScore(score);
    }
  } 

  return (
    <div className='app'>
      <div className='main-container'>
        <Header />
        <Quizz onFinish={handleQuizFinish} highScore={highScore} setHighScore={setHighScore}/>
      </div>
    </div>
  )
}

export default App
