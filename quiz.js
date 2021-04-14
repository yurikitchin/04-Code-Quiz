//Declare Variabls
var startQuiz = document.getElementById("startQuiz");
var timeElement = document.getElementById("timer");
var secondsLeft = 75;
var penalty = 5;
var score = 0;
var questionIndex = 0;

startQuiz.addEventListener('click', startTimer) 

//Timer Function
function startTimer (){
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeElement.textContent = "You have " + secondsLeft + " seconds left!";

        if  (secondsLeft === 0){
            clearInterval(timerInterval)
            sendMessage()
        }

    }, 1000);
    renderQuestions(questionIndex)
}

function sendMessage () {
    alert("You have run out of time!!")
    secondsLeft = 75
}
//Quiz Function
//Question variable
var questions = [{
    question: "Which is these is not a primative data type",
    userChoice: ["booleans", "undefined", "variables", "number"],
    answer: "variables",
},
{
    question: "the Document method querySelector() Returns the first ____ within the document",
    userChoice: ["variable", "css Selector", "node", "element"],
    answer: "element",
},
{
    question: "A useful tool that can be used during the development process to print content to the console is?",
    userChoice: ["console log", "debugger", "Bash terminal", "conditional statment"],
    answer: "console log",
},
{
    question: "when a variable is declared inside of a function, where is that variable available?",
    userChoice: ["that specific function", "window", "the child element", "Global Scope"],
    answer: "that specific function",
},
{
    question: "What can be stored within an object?",
    userChoice: ["Primitive data types", "arrays", "methods", "all of the above"],
    answer: "all of the above"
}]

var mainQuestions = document.querySelector("#questions");
var createList = document.createElement("ul")

//function to render questions to the page
function renderQuestions(questionIndex) {
    //clear the data in the questions section
    console.log(questions[questionIndex].question)
    mainQuestions.innerHTML ="";
    createList.innerHTML = "";
    //loop through info in question array 
    for (var i = 0; i < questions.length; i++){
        //appends question to the title
        var userQuestion = questions[questionIndex].question
        var userChoices = questions[questionIndex].userChoice
        mainQuestions.textContent = userQuestion;
    }
    //apend each question to the multiplechoice list using forEach method
    userChoices.forEach(function (newItem){
        //creates list items
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        mainQuestions.appendChild(createList);
        createList.appendChild(listItem);
        listItem.addEventListener('click', (compareFunction));
        
    })
}
//when answer selected by user, compared to answer in array true or false
//creates an event target for the user to click the right or wrong answer
//if correct element is clicked 1 is added to score
//if wrong element is clicked penalty is taken off timer
//question index is increased by 1 so render function can run through on next array item
function compareFunction(event) {
    var element = event.target;
    if (element.matches('li')){
        //creates new div to populate with correct or incorrect answer 
        var createAnswerSection = document.createElement("div");
        createAnswerSection.setAttribute("id", "createAnswerSection")
        //compares user choice to answer in array
        if (element.textContent == questions[questionIndex].answer){
            score++
            createAnswerSection.textContent = "That is the correct answer";
        } else /*deduct -5 seconds display correct answer*/ {
            secondsLeft = secondsLeft - penalty;
            createAnswerSection.textContent = "Wrong!! The correct answer is: " + questions[questionIndex].answer; ". You have been deducted 5 seconds";
        }
    }
    
    //must add 1 to question index, to render the next question untill index is greater than or equal to the questions array
    questionIndex++;
    if (questionIndex >= questions.length){
        //run function to show answers, score and enter details
        alert("You have completed the quiz!" + "You scored " + score + "/5")
        quizCompleteFunction();        
    } else {
        renderQuestions(questionIndex)
    }
}
//create quiz complete function
//must log score to the local storage, along with name and add it to the highscores page
//add restart botton
function quizCompleteFunction (){
    //clear text and stop timer
    mainQuestions.innerHTML = "";
    timeElement.innerHTML = "";
    //create a label to tell user to enter name for highscore
    var highscoreLabel = document.createElement("label");
    highscoreLabel.setAttribute("id", "highscoreLabel");
    highscoreLabel.textContent = "Enter your name:";
    mainQuestions.appendChild(highscoreLabel);

    //creat input for names
    var highscoreInput = document.createElement("input");
    highscoreInput.setAttribute("type", "text");
    highscoreInput.setAttribute("id", "enterName");
    highscoreInput.textContent = "";
    mainQuestions.appendChild(highscoreInput);

    //create submit button
    var highscoreSubmit = document.createElement("button");
    highscoreSubmit.setAttribute("type", "submit");
    highscoreSubmit.setAttribute("id", "submitScore");
    highscoreSubmit.textContent = "Submit Score";
    mainQuestions.appendChild(highscoreSubmit)

    //store name to local storage, event listener
    highscoreSubmit.addEventListener("click", submitScoreFunction)


function submitScoreFunction (){
        var name = highscoreInput.value;
        
        if (name === null){
            alert("You must enter your name");
        } else {
            var highScoreData = {
                name: name,
                score: score
            }

            // console.log(highScoreData)
            }
            //save highScoreData to local storage, to be displayed on highscores page
            //creat new array that high score data gets added to the converted to string and saved to local storage
            var scoreList = localStorage.getItem("scoreList");
            if (scoreList === null) {
                scoreList = [];
            } else {
                scoreList = JSON.parse(scoreList);
                // console.log("scoreList")
                // console.log(scoreList)
            }
            scoreList.push(highScoreData);
            var newEntry = JSON.stringify(scoreList)
            localStorage.setItem("scoreList", newEntry)
            }}

     //View highscires, add event listener to viewhighscores link
     var highscoreBtn = document.querySelector("#highscore")
     var highscoreList = ""
    
     highscoreBtn.addEventListener('click', viewHighscoresFunction)

     function restartBtn(){
        var restartBtn = document.createElement("button");
        restartBtn.setAttribute("type", "submit")
        restartBtn.setAttribute("id", "restartBtn");
        restartBtn.innerText = "Restart Quiz!"
        mainQuestions.appendChild(restartBtn)
        questionIndex = 0
        questions = questions
        restartBtn.addEventListener('click', reload)
     }

     function reload(){
        window.location.reload()
     }

     //populate questions box with title and new list
     function viewHighscoresFunction (){
         mainQuestions.innerHTML = ""
         createList.innerHTML = ""
         //highscoreList = localStorage.getItem(scoreList)
         if (localStorage["scoreList"] === undefined){
             highscoreList = "" 
         } else {highscoreList = localStorage.getItem("scoreList")}
         if (highscoreList === ""){
             var highscorePrompt = document.createElement("h1");
             highscorePrompt.setAttribute('id', 'noScores');
             highscorePrompt.textContent = "No scores submitted, Complete the quiz to enter your name!";
             mainQuestions.appendChild(highscorePrompt);
             restartBtn()
             
         } else {
             var highscoreTitle = document.createElement("h1")
             highscoreTitle.setAttribute("id", "highscoreTitle")
             highscoreTitle.textContent = "High Scores"
             mainQuestions.appendChild(highscoreTitle)

             highscoreList = JSON.parse(highscoreList);
             highscoreArrayStopLength = Math.min(4, highscoreList.length)
             console.log(highscoreArrayStopLength)

            //  console.log(highscoreList)
            //  console.log(highscoreList[0])
             //for loop top 5 high scores
             for (let index = 0; index <= highscoreArrayStopLength; index++) {
                 if (index === highscoreArrayStopLength) {break;} else {
                 var createHighscore = document.createElement("li")
                 createHighscore.setAttribute("id", "highscoreList")
                 createHighscore.textContent = "Legend = " + highscoreList[index].name +" Score ="+ highscoreList[index].score
                 mainQuestions.appendChild(createHighscore)
                 }}restartBtn()     
                 
             }

         }

     //}
     //fill list with information saved in local storage   
    //create restart button
