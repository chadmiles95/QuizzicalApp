import React from "react";

export default function QuizPage(props) {
  const [selectedAnswers, setSelectedAnswers] = React.useState([])
  const [keepScore, setKeepScore] = React.useState(0)
  const [isChecked, setIsChecked] = React.useState(false)
 
const flattenedCorrectAnswers = props.correctAnswersArray.flat()

function handleClick(event, answer, questionIndex) {
     event.preventDefault(event)
    if (!isChecked) {
      const updatedSelectedAnswers = [...selectedAnswers]
      updatedSelectedAnswers[questionIndex] = answer
      setSelectedAnswers(updatedSelectedAnswers)
    }
  }

const showAnswers = () => {
    setIsChecked((prevState) => !prevState)
    const score = selectedAnswers.reduce(
      (count, answer, index) =>
        flattenedCorrectAnswers[index].includes(answer) ? count + 1 : count,
      0)
    setKeepScore(score)
    setIsChecked(true)
}

  const handleNewQuiz = () => {
    props.fetchIt(props.number)
    setKeepScore(0)
    setSelectedAnswers([])
    setIsChecked((prevState) => !prevState)
  }

  return (
    <div className="QuizDiv">
      <button className="StartQuiz" onClick={props.changePage}>
        Main Page
      </button>
      <ul>
        {props.quizData.map((question, index) => (
          <li key={index}>
            <p
              className="question"
              dangerouslySetInnerHTML={{ __html: question.question }}
            ></p>
            <br />
            <div className="answers">
              {" "}
              {props.answersArray[index].map((answer, answerIndex) => (
                <label
                  key={answerIndex}
                  className={!isChecked ? `individualAnswer question-${index} ${
                    selectedAnswers[index] === answer ? "selectedAnswer" : ""
                    }` : `individualAnswer question-${index} ${
                    selectedAnswers[index] === answer & props.correctAnswersArray[index].includes(answer) ? "correctAnswer" : selectedAnswers[index] === answer ? "incorrectAnswer" : props.correctAnswersArray[index].includes(answer)? "correctAnswer" : " "
  }` }>
                  <input
                    type="radio"
                    name={`question`}
                    onChange={(event) => {
                         handleClick(event, answer, index)}}
                    checked={selectedAnswers[index] === answer ? true : false}
                    disabled={isChecked}
                  />
                  <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                </label>
              ))}
            </div>
            <p />
            <hr />
          </li>
        ))}
      </ul>
      <div className="bottomDiv">
        {isChecked && (
          <p className="keepScore">
            You scored {keepScore}/5 correct answers
          </p>
          
        )}
        {!isChecked && (
          <button className="showAnswers" onClick={showAnswers}>
            Check Answers
          </button>
          
        )}
        {isChecked && (
          <button className="StartQuiz" onClick={handleNewQuiz}>
            New Quiz
          </button>
        )}
      </div>
      
    </div>
  )
}

