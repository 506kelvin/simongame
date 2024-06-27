// Array of button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Array to store the game pattern
var gamePattern = [];

// Array to store the user pattern
var userClickedPattern = [];

// Variable to keep track of the game level
var level = 0;

// Variable to keep track of whether the game has started
var started = false;

// Function to generate the next sequence
function nextSequence() {
  // Reset the userClickedPattern for the next level
  userClickedPattern = [];

  // Increase the level by 1
  level++;

  // Update the h1 with the current level
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Select the button with the same id as randomChosenColour
  var button = $("#" + randomChosenColour);

  // Animate a flash effect on the selected button
  button.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play the sound for the selected button color
  playSound(randomChosenColour);

  console.log(gamePattern);
}

// Function to play the sound for the selected button color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to animate button press
function animatePress(currentColour) {
  var button = $("#" + currentColour);
  button.addClass("pressed");
  setTimeout(function() {
    button.removeClass("pressed");
  }, 100);
}

// Function to check the user's answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    // Check if the user has finished their sequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong"); // Play wrong sound
    $("body").addClass("game-over"); // Apply game-over class to body
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200); // Remove game-over class after 200ms
    $("#level-title").text("Game Over, Press Any Key to Restart"); // Update h1 title
    
    // Call startOver to reset the game
    startOver();
  }
}

// Function to reset the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Detect when a keyboard key has been pressed and start the game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Add click event to buttons to test if they are clickable
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour); // Add the clicked color to the user's pattern
  playSound(userChosenColour); // Play the sound for the clicked button
  animatePress(userChosenColour); // Animate the button press

  // Call checkAnswer() after a user has clicked and chosen their answer
  checkAnswer(userClickedPattern.length - 1);

  console.log(userClickedPattern);
});
