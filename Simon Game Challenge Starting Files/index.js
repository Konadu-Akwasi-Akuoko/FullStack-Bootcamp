$(document).ready(() => {
  let randomNumber;
  let randomChosenColor;
  let buttonColors = ["red", "blue", "green", "yellow"];
  let gamePattern = [];
  let userChosenColor;
  let firstClick = false;
  let level = -1;
  let indexToCheck = 0;

  // Generate random number between 0 and 3 and choose a
  // random color from the array, and flash the appropriate tile
  function nextSequence() {
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    //Show which color was chosen by flashing the appropriate tile
    $(`#${randomChosenColor}`).fadeTo(200, 0);
    $(`#${randomChosenColor}`).fadeTo(200, 1);
    gamePattern.push(randomChosenColor);
    indexToCheck = 0;
    level++;
    $("#level-title").text(`Level ${level}`);
  }

  function playSound(chosenColor) {
    new Audio(`/sounds/${chosenColor}.mp3`).play();
  }

  function animatePress(currentColor) {
    $(currentColor).addClass("pressed");
    setTimeout(function () {
      $(currentColor).removeClass("pressed");
    }, 100);
  }

  // Check if the user clicked the correct color
  function checkAnswer(buttonColor) {
    let gamePatternLength = gamePattern.length - 1;
    // Check the color to see if it matches the color in the game pattern and
    // indexToCheck is not equal to the length of the game pattern
    if (
      indexToCheck != gamePatternLength &&
      buttonColor === gamePattern[indexToCheck]
    ) {
      indexToCheck++;
    }
    // If IndexToCheck is equal to the length of the gamePattern.length,
    // check the color and call nextSequence after 500 milliseconds
    else if (
      buttonColor === gamePattern[indexToCheck] &&
      indexToCheck === gamePatternLength
    ) {
      setTimeout(() => {
        nextSequence();
      }, 500);
    } else {
      new Audio("sounds/wrong.mp3").play();
      $("body").addClass("game-over");
      setTimeout(() => {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      restartGame();
    }
  }

  function restartGame() {
    level = -1;
    gamePattern = [];
    firstClick = false;
    indexToCheck = 0;
  }

  $(document).keydown(function (e) {
    if (firstClick) {
      //
    } else {
      //call nextSequence
      nextSequence();
      firstClick = true;
    }
  });

  $(".btn").click(function () {
    playSound(this.id);
    userChosenColor = $(this).attr("id");
    animatePress(this);
    checkAnswer(userChosenColor);
  });
});
