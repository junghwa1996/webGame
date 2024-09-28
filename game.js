function startGame() {
  document.getElementById('introScreen').style.display = 'none';
  document.getElementById('storyScreen').style.display = 'block';
};

function goToRoom() {
  document.getElementById('storyScreen').style.display = 'none';
  document.getElementById('roomScreen').style.display = 'block';
};

// Show puzzle when puzzle item is clicked
function showPuzzle() {
  document.getElementById('puzzleScreen').style.display = 'block';
};

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
};

function toggleNote() {
  const noteSection = document.getElementById('noteSection');
  noteSection.style.display = (noteSection.style.display === 'none') ? 'block' : 'none';
};

function toggleHint() {
  const hintSection = document.getElementById('hintSection');
  hintSection.style.display = (hintSection.style.display === 'none') ? 'block' : 'none';
};

function toggleInventory() {
  const inventorySection = document.getElementById('inventorySection');
  inventorySection.style.display = (inventorySection.style.display === 'none') ? 'block' : 'none';
};

// Show the hint popup when the hint icon is clicked
function toggleHint() {
  document.getElementById('hintPopup').style.display = 'block';
};

// Close the hint popup
function closeHintPopup() {
  document.getElementById('hintPopup').style.display = 'none';
};

// Hint logic based on puzzle name
let viewedHints = [];
let obtainedHints = []; 

function getHint() {
  const puzzleName = document.getElementById('puzzleNameInput').value.toLowerCase();
  const hintTitle = document.getElementById('hintTitle');
  const hintMessage = document.getElementById('hintMessage');
  let hintText = "";

  // Check if the hint was already obtained
  if (obtainedHints.includes(puzzleName)) {
      hintTitle.innerText = `Hint for ${puzzleName}`;
      hintMessage.innerText = "You have already obtained this hint.";
      return;  // Do not count this hint again
  }

  if (hintCount > 0) {
      switch (puzzleName) {
          case "puzzle1":
              hintText = "Puzzle 1 Hint: Try looking for the hidden code under the table.";
              break;
          case "puzzle2":
              hintText = "Puzzle 2 Hint: The key is in the picture frame.";
              break;
          case "puzzle3":
              hintText = "Puzzle 3 Hint: Combine the numbers in the book to find the combination.";
              break;
          default:
              hintText = "No hints available for this puzzle.";
      }

      if (hintText !== "No hints available for this puzzle.") {
          obtainedHints.push(puzzleName);  // Add to obtained hints
          addHintToDropdown(puzzleName, hintText);  // Store the hint
          hintCount--;
          updateHintStatus();  // Update hint status in the popup
      }

      // Update the popup with the hint
      hintTitle.innerText = `Hint for ${puzzleName}`;
      hintMessage.innerText = hintText;

      // Disable Get Hint button if no hints remain
      if (hintCount === 0) {
          disableGetHintButton();
      }
  }
}

function disableGetHintButton() {
  const getHintButton = document.getElementById('getHintButton');
  getHintButton.disabled = true;
  document.getElementById('hintMessage').innerText = "You have used all your hints.";
}

function addHintToDropdown(puzzleName, hintText) {
  if (!viewedHints.includes(puzzleName)) {
      viewedHints.push(puzzleName);

      const dropdown = document.getElementById('previousHintsDropdown');
      const option = document.createElement('option');
      option.value = hintText;
      option.innerText = `Hint for ${puzzleName}`;
      dropdown.appendChild(option);
  }
};

function updateHintStatus() {
  const hintStatus = document.getElementById('hintStatus');
  hintStatus.innerText = `Hints remaining: ${hintCount}`;
}

// Show the previously viewed hint when selected from dropdown
document.getElementById('previousHintsDropdown').addEventListener('change', function() {
  const selectedHint = this.value;
  const previousHintDisplay = document.getElementById('previousHintDisplay');

  if (selectedHint) {
      previousHintDisplay.innerText = `Previously viewed hint: ${selectedHint}`;
  }
});

function closeHintPopup() {
  document.getElementById('hintPopup').style.display = 'none';
  document.getElementById('puzzleNameInput').value = '';  // Reset input field

  // If all hints have been used, retain the "All hints used" message
  if (hintCount === 0) {
      document.getElementById('hintTitle').innerText = 'All hints used';
      document.getElementById('hintMessage').innerText = 'You have used all your hints.';
  } else {
      document.getElementById('hintTitle').innerText = 'Request a Hint';  // Reset title
      document.getElementById('hintMessage').innerText = 'Enter the name of the puzzle for which you need a hint:';  // Reset message
  }
}