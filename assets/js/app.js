$(document).ready(function() {
// Create a function that creates the start button and initial screen

function initialScreen() {
  startScreen = "<p class='text-center main-button-container'><a class='btn btn-lg btn-block start-button' href='#' role='button'>Start Game!</a></p>";
  $(".mainArea").html(startScreen);
}

initialScreen();

//Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...

$("body").on("click", ".start-button", function(event){
  generateHTML();

  timerWrapper();

}); // Closes start-button click

$("body").on("click", ".answer", function(event){
  //answeredQuestion = true;
  selectedAnswer = $(this).text();
  if(selectedAnswer === correctAnswers[questionCounter]) {
    //alert("correct");

    clearInterval(theClock);
    generateWin();
  }
  else {
    //alert("wrong answer!");
    clearInterval(theClock);
    generateLoss();
  }
}); // Close .answer click

$("body").on("click", ".reset-button", function(event){
  resetGame();
}); // Closes reset-button click

});  //  Closes jQuery wrapper

function generateLossDueToTimeOut() {
  unansweredTally++;
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/img/x.png'>";
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 3000);  //  change to 4000 or other amount
}

function generateWin() {
  correctTally++;
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-right' src='assets/img/y.png'>";
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 3000);  //  change to 4000 or other amount
}

function generateLoss() {
  incorrectTally++;
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/img/x.png'>";
  $(".mainArea").html(gameHTML);
  setTimeout(wait, 3000); //  change to 4000 or other amount
}

function generateHTML() {
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
  $(".mainArea").html(gameHTML);
}

function wait() {
  if (questionCounter < 7) {
  questionCounter++;
  generateHTML();
  counter = 20;
  timerWrapper();
  }
  else {
    finalScreen();
  }
}

function timerWrapper() {
  theClock = setInterval(twentySeconds, 1000);
  function twentySeconds() {
    if (counter === 0) {
      clearInterval(theClock);
      generateLossDueToTimeOut();
    }
    if (counter > 0) {
      counter--;
    }
    $(".timer").html(counter);
  }
}

function finalScreen() {
  gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-lg btn-block reset-button' href='#' role='button'>Play Again!</a></p>";
  $(".mainArea").html(gameHTML);
}

function resetGame() {
  questionCounter = 0;
  correctTally = 0;
  incorrectTally = 0;
  unansweredTally = 0;
  counter = 20;
  generateHTML();
  timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 20;
var questionArray = ["Who wrote the programming language JavaScript?", "How long did it take to write JavaScript?", "Before being renamed to JavaScript, what was the language originally named?", "What year was JavaScript released?", "Which one of the following is NOT a JavaScript syntax?", "JavaScript is one of three core technologies for the www. What are the other two?", "Plain JS, JavaScript not extended by any frameworks or additional libraries refers to what?", "Which of the following is NOT a JavaScript framework?"];
var answerArray = [["Mark Zukerberg", "Marc Andreessen", "Brendan Eich", "Steve Jobs"], ["10 Days","10 Weeks","10 Months","10 Years"], ["LiveScript", "Mocha", "Java", "Scripting"], ["1990","1995","2001","2007"], ["function( )", "var = [ ]", "getElementById( )", "$( )"], ["Bootstrap/CSS","JQuery/AJAX","HTML/CSS","HTML/XML"], ["Neapolitan JS", "Chocolate JS", "Vanilla JS", "Standard JS"], ["Vue.js","Meteor.js","Ember.js","Java.js"]];
var correctAnswers = ["C. Brendan Eich", "A. 10 Days", "B. Mocha", "B. 1995", "D. $( )", "C. HTML/CSS", "C. Vanilla JS", "D. Java.js"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
