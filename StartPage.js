import React from "react"
export default function StartPage(props){
    
    
   function handleStart(){
    props.changePage()
    
  }; 
    
  
  const handleClick = () => {
    // Set a timeout for 3 seconds before allowing the user to start the quiz
    setTimeout(() => {
      handleStart();
    }, 3000);
  };
    return (
        <div className ="main">
        <h1> Quizzical </h1>
        <p className = "startDesc">A Fun trivia Quiz App! Please pick your Category Below</p>
        {props.number & !props.loading ? <button  className = "StartQuiz" 
        onClick = {handleClick} >Start Quiz </button> : <h3> Loading </h3>}
        <p></p>
        <p>If your screen is stuck on loading for more than 3 seconds the Api has failed to provide data for your selection, please pick a different category and try again.</p>
        
        </div>
    )
}