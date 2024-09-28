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

function toggleNote() {
  const noteSection = document.getElementById('noteSection');
  noteSection.style.display = (noteSection.style.display === 'none') ? 'block' : 'none';
}

function toggleHint() {
  const hintSection = document.getElementById('hintSection');
  hintSection.style.display = (hintSection.style.display === 'none') ? 'block' : 'none';
}

function toggleInventory() {
  const inventorySection = document.getElementById('inventorySection');
  inventorySection.style.display = (inventorySection.style.display === 'none') ? 'block' : 'none';
}

// Show the hint popup when the hint icon is clicked
function toggleHint() {
  document.getElementById('hintPopup').style.display = 'block';
}

// Close the hint popup
function closeHintPopup() {
  document.getElementById('hintPopup').style.display = 'none';
}

// Hint logic based on puzzle name
function getHint() {
  const puzzleName = document.getElementById('puzzleNameInput').value.toLowerCase();
  let hintMessage = "";

  switch(puzzleName) {
      case "puzzle1":
          hintMessage = "Puzzle 1 Hint: Try looking for the hidden code under the table.";
          break;
      case "puzzle2":
          hintMessage = "Puzzle 2 Hint: The key is in the picture frame.";
          break;
      case "puzzle3":
          hintMessage = "Puzzle 3 Hint: Combine the numbers in the book to find the combination.";
          break;
      default:
          hintMessage = "No hints available for this puzzle.";
  }

  alert(hintMessage);
  closeHintPopup();  // Close the popup after displaying the hint
}