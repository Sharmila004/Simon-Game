var gamePattern = [];
var userClickedPattern = [];
var randomChosenColor;
var randomNumber;
var buttonColors = ["red", "blue", "green", "yellow"];
var userChoosenColor;
var started = false;
var level = 0;

function nextSequence() {
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSong(randomChosenColor);
  $("#level-title").text("Level " + level);
  level++;
  userClickedPattern = [];
}

function playSong(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSong("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over. Press any key to Restart.");
    startOver();
  }
}

$("button").click(function () {
  $("button").addClass("pressed");
  setTimeout(function () {
    $("button").removeClass("pressed");
  }, 100);
  if (!started == true) {
    nextSequence();
    started = true;
  }
});

$(document).ready(playSong(randomChosenColor));

$(".btn").click(function () {
  userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);
  $("#" + userChoosenColor).click(playSong(userChoosenColor));
  $("#" + userChoosenColor).click(animatePress(userChoosenColor));
  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
