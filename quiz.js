//Declare Variabls
var startQuiz = document.getElementById("startQuiz");
var timeElement = document.getElementById("timer");
var secondsLeft = 75;
var score = 0;

//Timer Function
function startTimer (){
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeElement.textContent = "You have " + secondsLeft + " seconds left!";

        if (secondsLeft === 0){
            clearInterval(timerInterval)
            sendMessage()
        }

        return

    }, 1000);
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

var mainQuestions = document.querySelector("#questions")


//click event listener
startQuiz.addEventListener('click', startTimer)