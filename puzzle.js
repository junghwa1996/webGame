// puzzle.js
function checkPuzzleAnswer() {
  let answer = document.getElementById('puzzleInput').value;
  if (answer === "correctAnswer") {
      alert("Correct! You solved the puzzle.");
      // Trigger next step in the game
  } else {
      alert("Incorrect, try again.");
  }
}

// Event listener for puzzle submission
document.getElementById('submitPuzzleButton').addEventListener('click', checkPuzzleAnswer);