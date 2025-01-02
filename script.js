let randomNumber = Math.floor(Math.random() * 100) + 1;
let maxAttempts = 10;
let attempts = 0;

const userInput = document.getElementById("user-guess");
const submitButton = document.getElementById("submit-guess");
const feedback = document.getElementById("feedback");
const attemptsRemaining = document.getElementById("attempts-remaining");
const gameOverMessage = document.getElementById("game-over");
const restartButton = document.getElementById("restart-game");

// Function to handle the guess
function handleGuess() {
  const userGuess = parseInt(userInput.value);

  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    feedback.textContent = "Please enter a valid number between 1 and 100.";
    return;
  }

  attempts++;
  const remainingAttempts = maxAttempts - attempts;

  let difference = Math.abs(randomNumber - userGuess);

  if (userGuess < randomNumber) {
    if (difference > 10) {
      feedback.textContent = `${userGuess} is too low! The number is much higher.`;
    } else {
      feedback.textContent = `${userGuess} is low! You're getting close!`;
    }
  } else if (userGuess > randomNumber) {
    if (difference > 10) {
      feedback.textContent = `${userGuess} is too high! The number is much lower.`;
    } else {
      feedback.textContent = `${userGuess} is high! You're getting close!`;
    }
  } else {
    feedback.textContent = `🎉 Congratulations! You guessed the number ${randomNumber}!`;
    feedback.style.color = "green";
    gameOverMessage.textContent = "You win!";
    gameOverMessage.classList.remove("hidden");
    submitButton.disabled = true;
    restartButton.classList.remove("hidden");
    enableSpacebarRestart();
    return;
  }

  attemptsRemaining.textContent = `You have ${remainingAttempts} attempts remaining.`;

  if (remainingAttempts === 0) {
    feedback.textContent = `❌ Game over! The correct number was ${randomNumber}.`;
    gameOverMessage.textContent = "You lose!";
    gameOverMessage.classList.remove("hidden");
    submitButton.disabled = true;
    restartButton.classList.remove("hidden");
    enableSpacebarRestart();
  }

  userInput.value = ""; // Clear the input field
}

// Add event listener for the button click
submitButton.addEventListener("click", handleGuess);

// Add event listener for the "Enter" key press during gameplay
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleGuess();
  }
});

// Restart game logic
function restartGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  feedback.textContent = "";
  feedback.style.color = "black";
  attemptsRemaining.textContent = "You have 10 attempts remaining.";
  gameOverMessage.textContent = "";
  gameOverMessage.classList.add("hidden");
  submitButton.disabled = false;
  restartButton.classList.add("hidden");
  userInput.value = "";
  disableSpacebarRestart();
}

// Enable restarting the game with the Spacebar
function enableSpacebarRestart() {
  document.addEventListener("keydown", restartOnSpacebar);
}

// Disable restarting the game with the Spacebar
function disableSpacebarRestart() {
  document.removeEventListener("keydown", restartOnSpacebar);
}

// Function to handle restart on Spacebar press
function restartOnSpacebar(event) {
  if (event.code === "Space") {
    event.preventDefault(); // Prevent scrolling on Spacebar press
    restartGame();
  }
}

// Add event listener for the restart button click
restartButton.addEventListener("click", restartGame);
