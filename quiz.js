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
    mainQuestions.appendChild(createAnswerSection)
}
//create quiz complete function
//must log score to the local storage, along with name and add it to the highscores page
//add restart botton
function quizCompleteFunction (){
    //clear text and stop timer

    //create a label to tell user to enter name for highscore
    //creat input for names
    //store name to local storage
    //restart button

}

