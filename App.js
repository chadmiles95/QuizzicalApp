import React from "react"
import StartPage from "./StartPage"
import QuizPage from "./QuizPage"

export default function App(){
const [page, setPage] = React.useState(false)
const [count, setCount] = React.useState(0)
const [quizData, setQuizData] = React.useState([])
const [selectedCategory, setSelectedCategory] = React.useState(9);
const [loading, setLoading] = React.useState(false);

const answersArray = quizData.map((question) => {
    const combinedAnswers = [...question.incorrect_answers, question.correct_answer]
    shuffleArray(combinedAnswers)
      return combinedAnswers
   })
      function shuffleArray(array) {
    const getRandomValue = () => Math.random() - 0.5
    array.sort(getRandomValue)
   }

   
const correctAnswersArray = quizData.map((question) => {
    const correctAnswers = [question.correct_answer]
    return correctAnswers
  });

function changePage(){
        setPage((prevState) => !prevState)
        setCount(count + 1)
        }

function fetchData(category) {
    setLoading(true);
    fetch(`https://opentdb.com/api.php?amount=5&category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setQuizData(data.results)
        setTimeout(() => {
            setLoading(false)
        }, 3000 )
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
        setLoading(false);
      });
  }
React.useEffect(() => {
    fetchData(selectedCategory)
}, [selectedCategory],)
    return (
        <div>
            {!page ? (
                <div className = "label">
                < StartPage changePage = {changePage} number = {selectedCategory} loading = {loading} quizData = {quizData} correctAnswersArray = {correctAnswersArray} answersArray = {answersArray}  />
                <div className = "selection">
                <label  htmlFor="category">Choose a category:</label>
                <select
                id="category"
                name="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
          >
        <option value="9">General Knowledge</option>
        <option value="10">Books</option>
        <option value="11">Film</option>
        <option value="12">Music</option>
        <option value="13">Musicals & Theatres</option>
        <option value="14">Television</option>
        <option value="15">Video Games</option>
        <option value="16">Board Games</option>
        <option value="17">Science and  Nature</option>
        <option value="18">Science: Computers</option>
        <option value="19">Science: Mathematics</option>
        <option value="20">Mythology</option>
        <option value="21">Sports</option>
        <option value="22">Geography</option>
        <option value="23">History</option>
        <option value="24">Politics</option>
        <option value="25">Art</option>
        <option value="26">Celebrities</option>
        <option value="27">Animals</option>
        <option value="28">Vehicles</option>
        <option value="29">Comics</option>
        <option value="30">Science: Gadgets</option>
        <option value="31">Anime and Manga</option>
        <option value="32">Cartoon and Animation</option>
    
    
  </select>
  
  </div>
        </div>
            )  :
             < QuizPage quizData = {quizData} changePage = {changePage} fetchIt = {fetchData} number = {selectedCategory} correctAnswersArray = {correctAnswersArray} answersArray = {answersArray} />}
        </div>
    )
}