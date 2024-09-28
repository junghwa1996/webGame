// game.js

function startGame() {
  document.getElementById('introScreen').style.display = 'none';
  document.getElementById('storyScreen').style.display = 'block';
}

function goToRoom() {
  document.getElementById('storyScreen').style.display = 'none';
  document.getElementById('roomScreen').style.display = 'block';
}

// Show puzzle when puzzle item is clicked
function showPuzzle() {
  document.getElementById('puzzleScreen').style.display = 'block';
}

// Submit puzzle answer and check correctness
function submitPuzzle() {
  const answer = document.getElementById('puzzleInput').value.toLowerCase();
  const correctAnswer = "hiddenclue";  // Example puzzle answer

  if (answer === correctAnswer) {
      alert("Correct! You unlocked a hidden item.");
      const hiddenItem = { item: "Secret Document", type: "document", description: "A critical piece of evidence.", image: "images/document.png" };
      addItemToInventory(hiddenItem);  // Add hidden item to inventory
      document.getElementById('puzzleScreen').style.display = 'none';  // Hide puzzle after solving
  } else {
      alert("Incorrect, try again.");
  }
}