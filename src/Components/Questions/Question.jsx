import React, { useState, useEffect, use } from 'react'
import loading_gif from '../../../public/loading.gif'
import './Questions.css'


const Question = ({questions, finished, setFinished, setScore, start}) => {
    const [selected, setSelected] = useState(null);
    const [i, setI] = useState(0);
    const [disabled, setDisabled] = useState(false);

    if(!start) {
        return <div className='question-body start-message'>
            <p>Click on Start to begin the Quiz</p>
        </div>
    }

    if(!questions || questions.length === 0) {
        return <div className="loading-container">
            <img src={loading_gif} alt="loading questions" />
            <p>Loading questions...</p>
        </div>;
    }
    
    const allOptions = [...questions[i].incorrect_answers, questions[i].correct_answer];

    const correct = questions !== null ? questions[i].correct_answer: null;

    function nextQuestion() {
        if(questions.length > i+1){
            setI(i+1);
        } else {
            setFinished(true);
            setI(0);
        }
        setDisabled(false);
    }

    function handleOptionButton(e) {        
        setSelected(e.target.innerText);
        
        if(e.target.innerText === questions[i].correct_answer) {
            console.log("Correct Answer");
            setScore(prevScore => prevScore + 1);
        } else {
            console.log("Wrong Answer");
        }    
        setDisabled(true);
    }

    const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);

    return (
        <>
        {finished ? (<p className="finished-message">Quiz Completed!</p>) : <div className='question-body'>
            <div className="question-header">
                <span className="question-number">Question {i + 1} of {questions.length}</span>
                <div className="progress-bar">
                    <div className="progress-fill" style={{width: `${((i + 1) / questions.length) * 100}%`}}></div>
                </div>
            </div>
            <h3 className="quizz-question" dangerouslySetInnerHTML={{__html: questions[i].question}}></h3>
            <div className="quizz-options">
                {allOptions.map((option, index) => {
                    let className= "quizz-option";
                    if(disabled){
                        if(option === correct){
                            className += " correct";
                        } else if(option === selected){
                            className += " incorrect";
                        } else {
                            className += " disabled";
                        }
                    }
                    return(
                        <button key={index} className={className} onClick={handleOptionButton} disabled={disabled} dangerouslySetInnerHTML={{__html: option}}></button>
                    )
                })}
            </div>
            <div className="next">
                <button className="next-button" onClick={nextQuestion} disabled={!disabled}>
                    {i === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
            </div> 
        </div>}
        </>
    )
    
}

export default Question
