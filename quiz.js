//Declare Variabls
var startQuiz = document.getElementById("startQuiz");
var timeElement = document.getElementById("timer");
var secondsLeft = 75;
var

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
//Question 1
startQuiz.addEventListener('click', startTimer)