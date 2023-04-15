import { useState } from "react";
import { resultInitialState } from "./constant";

const Quiz = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerIndex, setAnswerIndex] = useState(null);
    const [answerCorrect, setAnswerCorrect] = useState(null);
    const [result, setResult] = useState(resultInitialState);
    const [showResult, setShowResult] = useState(false)
    const { question, choices, correctAnswer } = questions[currentQuestion];

    const onAnswerClick = (answer,index) => {
        setAnswerIndex(index);
        if (answer === correctAnswer) {
            setAnswerCorrect(answerCorrect)
        }
        else {
            setAnswerCorrect(!answerCorrect)
        }
    }

    const onClickNext = () => {
        setAnswerIndex(null);
        setResult((...prev) => answerCorrect ?
            {
                ...prev,
                score: prev.score + 5,
                correctAnswers: prev.correctAnswers + 1

            } : {
                ...prev,
                wrongAnswers: prev.wrongAnswers + 1
            }
        );
        if (currentQuestion !== questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1)
            
        } else {
            setCurrentQuestion(0)
            setShowResult(true)
        }
        
    }
    const onTryAgain = () => {
        setResult(resultInitialState)
        setShowResult(false)
    }
    return (
        <div className="quiz-container">
            {!showResult ? (   <>
                <span className="active-question-no">{currentQuestion + 1}</span>
                <span className="total-question">/{questions.length}</span>
                <h2>{question}</h2>
                <ul>
                    {choices.map((answer,index) => (
                        <li onClick={() => onAnswerClick(answer, index)} key={answer}
                            className={answerIndex === index ? "selected-answer" : null}>{answer}</li>
                    ))}
                </ul>
                <div className="footer">
                    <button onClick={onClickNext} disabled={answerIndex === null}>
                        {currentQuestion === question.length - 1 ?"Finish" : "Next"}
                    </button>
                </div>
            </>) : <div className="result">
                
                    <h3>Result</h3>
                    <p>
                        Total Question: <span>{questions.length}</span>
                    </p>
                      <p>
                        Total Score: <span>{result.score}</span>
                    </p>
                      <p>
                        Correct Answers: <span>{result.correctAnswers}</span>
                    </p>
                        <p>
                        Wrong Answers: <span>{result.wrongAnswers}</span>
                    </p>
                    <button onClick={onTryAgain}>Try Again</button>
            </div>}  
        
         
        </div>
    )
}

export default Quiz;