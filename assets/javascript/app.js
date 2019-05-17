var triviaQuestions = [{
   question: "This is question one",
   answers: ["first answer one", "first answer two", "first answer three", "first answer four"],
   rightAnswer: 1
},{
   question: "This is question two",
   answers: ["second answer one", "second answer two", "second answer three", "second answer four"],
   rightAnswer: 2
},{
   question: "This is question three",
   answers: ["third answer one", "third answer two", "third answer three", "third answer four"],
   rightAnswer: 3
},{
   question: "This is question four",
   answers: ["fourth answer one", "fourth answer two", "fourth answer three", "fourth answer four"],
   rightAnswer: 0
},{
   question: "This is question five",
   answers: ["fifth answer one", "fifth answer two", "fifth answer three", "fifth answer four"],
   rightAnswer: 2
},{
   question: "This is question six",
   answers: ["sixth answer one", "sixth answer two", "sixth answer three", "sixth answer four"],
   rightAnswer: 3
},{
   question: "This is question seven",
   answers: ["seventh answer one", "seventh answer two", "seventh answer three", "seventh answer four"],
   rightAnswer: 0
},{
   question: "This is question eight",
   answers: ["eighth answer one", "eighth answer two", "eighth answer three", "eighth answer four"],
   rightAnswer: 2
},{
   question: "This is question nine",
   answers: ["ninth answer one", "ninth answer two", "ninth answer three", "ninth answer four"],
   rightAnswer: 0
},{
   question: "This is question ten",
   answers: ["tenth answer one", "tenth answer two", "tenth answer three", "tenth answer four"],
   rightAnswer: 3
}];

var picResponse = ["qOne", "qTwo", "qThree", "qFour", "qFive", "qSix", "qSeven", "qEight", "qNine", "qTen"];
var rightPick = "";
var wrongPick = "";
var noAnswer = "";
var round = "";


$(document).on("click", "#start-game", function() {
   $("#begin-page").hide();
   newGame();
});

function newGame() {
   rightPick = 0;
   wrongPick = 0;
   round = 0;
   $("#end-page").hide();
   nextQuestion();
}

function nextQuestion() {
   $("#answer-page").hide();
   $("#question-page").show();
   $("#time-left").text("");
   var yourGuess = "";
   var seconds = 20;
   var time = setInterval(function() {
      seconds -=1;
      console.log(seconds);
      $("#time-left").text("Time left: " + seconds + " seconds!");
      if (seconds < 0) {
         clearInterval(time);
         yourGuess = null;
         getAnswer(yourGuess);
      }
   }, 1000);

   $("#your-question").html("<h3>" + triviaQuestions[round].question + "</h3>");
   $("#answer-list").html("");
   for (var i = 0; i < 4; i++) {
      var answerPick = $("<div>");
      answerPick.text(triviaQuestions[round].answers[i]);
      answerPick.attr({"value":i});
      answerPick.addClass("pick-one");
      $("#answer-list").append(answerPick);

   }

   
   $(".pick-one").on("click", function() {
      clearInterval(time);
      if ($(this).attr("value") == triviaQuestions[round].rightAnswer) {
         console.log("you are CORRECT!!");
         yourGuess = true;
         getAnswer(yourGuess);
      } else {
         console.log("Wrong!");
         yourGuess = false;
         getAnswer(yourGuess);
      }
      
   })

}

function getAnswer (yourGuess) {
   $("#question-page").hide();
   $("#answer-page").show();
   console.log("The answer you gave was...");
   if (yourGuess === true) {
      console.log("right!");
      rightPick +=1;
      $("#right-wrong").html("<h2>" + "That is Correct!!" + "</h2>");
      $("#correct-choice").html("");
   } else if (yourGuess === false) {
      console.log("wrong");
      wrongPick +=1;
      $("#right-wrong").html("<h2>" + "No, that is wrong..." + "</h2>");
      $("#correct-choice").html("<p>" + "the right choice was: " + triviaQuestions[round].answers[triviaQuestions[round].rightAnswer] + "</p>");
   } else if (yourGuess === null) {
      console.log("none, out of time");
      wrongPick +=1;
      $("#right-wrong").html("<h2>" + "Uh-oh! Out of time" + "</h2>");
      $("#correct-choice").html("<p>" + "the right choice was: " + triviaQuestions[round].answers[triviaQuestions[round].rightAnswer] + "</p>");
   }

   if(round === 9) {
      setTimeout(finalScore, 4000);
   } else {
      round +=1;
      setTimeout(nextQuestion, 4000);
   }


}

function finalScore() {
   var newBtn = $("<input/>").attr({ 
      type: "button",
      class: "btn btn-primary",
      id: "restart-game", 
      value:"Try Again?" 
   });
   
   $(document).on("click", "#restart-game", function() {
      $("#begin-page").hide();
      newGame();
   });
   
   $("#answer-page").hide();
   $("#end-page").show();
   $("#game-outcome").html("<h2>" + "Let's see how you scored" + "</h2>");
   $("#right-guesses").html("<p>" + "You got " + rightPick + " questions right" + "</p>");
   $("#wrong-guesses").html("<p>" + "You got " + wrongPick + " questions wrong" + "</p>");
   $("#final-score").html("<p><strong>" + "Your final score is " + rightPick + "/" + triviaQuestions.length + "</strong></p>");
   $("#another-game").append(newBtn);
}
