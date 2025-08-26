import React from 'react'
import './Results.css'

const Results = ({submit, score, total, highScore}) => {

  function handleRetry() {
    window.location.reload();
  }

  const percentage = Math.round((score / total) * 100);
  
  const getResultMessage = () => {
    if (percentage >= 80) return "Excellent! 🎉";
    if (percentage >= 60) return "Good Job! 👍";
    if (percentage >= 40) return "Not Bad! 👌";
    return "Keep Practicing! 💪";
  };

  const getResultClass = () => {
    if (percentage >= 80) return "excellent";
    if (percentage >= 60) return "good";
    if (percentage >= 40) return "average";
    return "poor";
  };

  return (
    submit && <div className='results-body'>
        <div className="results-header">
          <h2>Quiz Results</h2>
          <div className={`result-badge ${getResultClass()}`}>
            {getResultMessage()}
          </div>
        </div>
        
        <div className="score-container">
          <div className="score-circle">
            <span className="percentage">{percentage}%</span>
            <span className="score-text">{score}/{total}</span>
          </div>
        </div>
        
        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Your Score</span>
            <span className="stat-value">{score}/{total}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">High Score</span>
            <span className="stat-value">{highScore}/{total}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Accuracy</span>
            <span className="stat-value">{percentage}%</span>
          </div>
        </div>
        
        <button className="results-retry" onClick={handleRetry}>
          Try Again
        </button>
    </div>
  )
}

export default Results
