// Questions-answers-correct choices embedded in triviaQuestions data object

var triviaQuestions = [{
   question: "1. The PartyParrot is real! What species is our favorite bird? (Hint: It's the largest species of parrot, by weight)",
   answers: ["Kea", "Kakapo (Owl Parrot)", "Austral (Emerald) Parakeet", "Thick-billed Parrot"],
   rightAnswer: 1
},{
   question: "2. To which one of these taxonomic superfamilies does the Cockatoo belong?",
   answers: ["Psittacoidea", "Galliformes", "Cacatuoidea", "Strigopoidea"],
   rightAnswer: 2
},{
   question: "3. What is the native continent of the budgie, AKA the parakeet?",
   answers: ["North America", "South America", "Africa", "Australia"],
   rightAnswer: 3
},{
   question: "4. What is the only species of parrot that lives in an Alpine mountain climate?",
   answers: ["Kea", "Grey Parrot", "Hyacinth Macaw", "Ultramarine Lorikeet"],
   rightAnswer: 0
},{
   question: "5. Macaws can get pretty big, but which species of Macaw is the biggest?",
   answers: ["Red-and-Green Macaw", "Great Green Macaw", "Hyacinth Macaw", "Glaucous Macaw"],
   rightAnswer: 2
},{
   question: "6. There is a unique black-feather parrot species from New Guinea that has natural drumming skills! What is it called?",
   answers: ["Australian King Parrot", "Sulfur-crested Cockatoo", "St. Thomas Conure", "Palm Cockatoo"],
   rightAnswer: 3
},{
   question: "7. What escaped former-pet parrot can you find living within feral communities in Brooklyn, New York?",
   answers: ["Monk Parakeet", "Cockatiel", "Rosella", "Horned Parakeet"],
   rightAnswer: 0
},{
   question: "8. According to Guinness World Records, the world's oldest parrot, a cockatoo named Cookie, lived to be about how old?",
   answers: ["79 years old", "a little over 99 years old", "82 to 83 years old", "almost 103 years old!"],
   rightAnswer: 2
},{
   question: "9. All parties must come to an end... Which of these parrots is now extinct?",
   answers: ["Glaucous Macaw", "Major Mitchell's Cockatoo", "Edward's Fig Parrot", "Shell Parakeet"],
   rightAnswer: 0
},{
   question: "10. Which one of these statements below is true about most PartyParrots? (you may be surprised!)",
   answers: ["They are omnivores", "They are monogamous and form life-long mating pairs", "They don't build nests", "All of the above"],
   rightAnswer: 3
}];

// Second array handles .GIFs seen on the answer page after each question
var picResponse = ["question-one", "question-two", "qThree", "qFour", "qFive", "qSix", "qSeven", "qEight", "qNine", "qTen"];
var rightPick = "";
var wrongPick = "";
var noAnswer = "";
var round = "";

// handles first button on start page
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

// Creates each new question page an registers right and 
// wrong guesses plus out-of-time conditions.
// Most of game's logic is here
function nextQuestion() {
   $("#answer-page").hide();
   $("#question-page").show();
   $("#time-left").text("");
   var yourGuess = "";
   var seconds = 16;
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

// Make's each page after a questions is answered or unanswered. Each page is
// different depending on player being right, wrong or out of time
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
   
   $("#reward-pic").html("<img src='assets/images/" + picResponse[round] + ".gif' />");

   if(round === 9) {
      setTimeout(finalScore, 4500);
   } else {
      round +=1;
      setTimeout(nextQuestion, 4500);
   }


}

// Creates the final scoreboard and makes another button 
// that allows the player to restart.
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
