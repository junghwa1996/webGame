// puzzle.js
const correctAnswers = ["hiddenclue", "secretcode"];
let currentPuzzleIndex = 0;

function checkPuzzleAnswer() {
    const userAnswer = document.getElementById('puzzleInput').value.toLowerCase();
    if (userAnswer === correctAnswers[currentPuzzleIndex]) {
        alert("Correct! You've solved the puzzle.");
        nextPuzzle();
    } else {
        alert("Incorrect, try again.");
    }
}

function nextPuzzle() {
    currentPuzzleIndex++;
    if (currentPuzzleIndex < correctAnswers.length) {
        alert("Move on to the next puzzle.");
    } else {
        alert("You've completed all the puzzles!");
    }
}

document.getElementById('submitPuzzleButton').addEventListener('click', checkPuzzleAnswer);