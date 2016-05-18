// Create Question

var question1 = new Question("What is my name", [ "Raph", "Raphael" ], "Raph");
var question2 = new Question("What is my age", [ "22", "23" ], "22");
var questions = [question1, question2];


var quiz = new Quiz(questions);
var questionnary = document.getElementById("questionnary");
questionnary.style.visibility = "hidden";
var startButton = document.getElementById("start");

startButton.onclick = function() {
	questionnary.style.visibility = "visible";
	QuizUI.displayNext();
	startButton.style.visibility = "hidden";
}
// Display quiz
