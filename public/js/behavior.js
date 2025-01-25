
var list_of_letters = ["P", "L", "M", "O", "K", "N", "I", "J", "B", "U", "H", "V", "Y", "G", "C", "T", "F", "X", "R", "D", "Z", "E", "S", "W", "A", "Q"];
var letters_count = [];
var correctLetters = [];
var wrongLetters = [];
var rightCount = 0;
var wrongCount = 0;

var randomLetter = getRandomLetter();
var intervalID;  // Declare intervalID but don't initialize it yet

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

  // Start the interval after the first keypress
  if (!intervalID) {
    intervalID = setInterval(() => {
      randomLetter = getRandomLetter();
      document.querySelector("h3").innerHTML = randomLetter;
      letters_count.push(randomLetter);
      var letter_change_sound = new Audio("/sounds/switch-1.mp3");
      letter_change_sound.play();
    }, 1000);
  }
}

// Function to count the number of correct and incorrect keypresses
document.addEventListener("keypress", function(event) {
  var current_letter_index = letters_count.length - 1;
  var current_letter = letters_count[current_letter_index];
  
  if (event.key.toUpperCase() === current_letter) {
    var sound = new Audio("/sounds/yellow.mp3");
    sound.play();
    rightCount++;
  } else{ 
    if(letters_count.length > 1){
      document.querySelector(".box").style.backgroundColor = "red";
    
      setTimeout(function() {
        document.querySelector(".box").style.backgroundColor = "white";
        
    }, 100);
  
    var wrong_sound = new Audio("/sounds/wrong.mp3");
    wrong_sound.play();
    wrongCount++;
    }
  }

  // Update the counts
  document.querySelector(".number").innerHTML = rightCount;
  document.querySelector(".number2").innerHTML = wrongCount;
});

