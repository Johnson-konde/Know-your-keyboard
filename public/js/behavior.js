var list_of_letters = ["P", "L", "M", "O", "K", "N", "I", "J", "B", "U", "H", "V", "Y", "G", "C", "T", "F", "X", "R", "D", "Z", "E", "S", "W", "A", "Q"];
var letters_count = [];
var correctLetters = [];
var wrongLetters = [];
var pousing_letter = []
var rightCount = 0;
var wrongCount = 0;


var randomLetter = getRandomLetter();
var intervalID;  // Declare intervalID but don't initialize it yet
var isPaused = false;  // Track if the game is paused

// Function to get a random letter
function getRandomLetter() {
  return list_of_letters[Math.floor(Math.random() * list_of_letters.length)];
}

// Start keypress listener
document.addEventListener("keypress", startingKey);

function startingKey() {
  document.querySelector("h3").innerHTML = randomLetter;
  document.querySelector(".second-h2").innerHTML = "Press a key to match the letter!";
  document.querySelector(".number").innerHTML = rightCount;
  document.querySelector(".number2").innerHTML = wrongCount;
  letters_count.push(randomLetter);
  document.removeEventListener("keypress", startingKey);

  startTimer();
}

// Function to start the interval
function startTimer() {
  if (!intervalID) {
    intervalID = setInterval(() => {
      if (!isPaused) {
        randomLetter = getRandomLetter();
        document.querySelector("h3").innerHTML = randomLetter;
        letters_count.push(randomLetter);
        var letter_change_sound = new Audio("/sounds/switch-1.mp3");
        letter_change_sound.play();
      }
    }, 1000);
  }
}

// Function to stop the timer
function stopTimer() {
  if (intervalID) {
    clearInterval(intervalID);
    intervalID = null;
  }
}

// Function to pause/resume the game
document.addEventListener("keydown", function(event) {
  if (event.code === "Space") {
    isPaused = !isPaused;

    if (isPaused) {
      stopTimer();
      stopAllSounds();
    } else {
      startTimer();
    }
  }
});

// Function to stop all playing sounds
function stopAllSounds() {
  var audios = document.getElementsByTagName("audio");
  for (var i = 0; i < audios.length; i++) {
    audios[i].pause();
    audios[i].currentTime = 0; // Reset sound
  }
}

// Function to count correct and incorrect keypresses
document.addEventListener("keypress", function(event) {

  var is_space = pousing_letter[pousing_letter.length - 1]
  pousing_letter.push(event.code);
  console.log(is_space);

  if (isPaused) return; // Don't process input when paused
  var current_letter_index = letters_count.length - 1;
  var current_letter = letters_count[current_letter_index];
  if (event.key.toUpperCase() === current_letter) {
    var sound = new Audio("/sounds/yellow.mp3");
    sound.play();
    rightCount++;
  } else { 
    if (letters_count.length > 1 && is_space !== "Space") {
      document.querySelector(".box").style.backgroundColor = "red";
    
      setTimeout(function() {
        document.querySelector(".box").style.backgroundColor = "white";
      }, 100);
  
      var wrong_sound = new Audio("/sounds/wrong.mp3");
      wrong_sound.play();
      wrongCount++;
    }
    console.log(current_letter);
  }

  // Update the counts
  document.querySelector(".number").innerHTML = rightCount;
  document.querySelector(".number2").innerHTML = wrongCount;
});
