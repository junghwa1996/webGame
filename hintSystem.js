let hintCount = 3;

function useHint() {
    if (hintCount > 0) {
        hintCount--;
        alert("Hint used! You have " + hintCount + " hints remaining.");
        // Display actual hint logic here
    } else {
        alert("No more hints available!");
    }
}

function showHintPopup() {
  document.getElementById('hintPopup').style.display = 'block';
  document.getElementById('popupOverlay').style.display = 'block';  // Darken background
}

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
  puzzleNameInput.disabled = true;
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
  document.getElementById('popupOverlay').style.display = 'none';
  document.getElementById('hintPopup').style.display = 'none';
  document.getElementById('puzzleNameInput').value = '';  // Reset input field

  // If all hints have been used, keep the input and message disabled
  if (hintCount === 0) {
      document.getElementById('hintTitle').innerText = 'All hints used';
      document.getElementById('hintMessage').innerText = 'You have used all your hints.';
      document.getElementById('puzzleNameInput').disabled = true;  // Keep input disabled
  } else {
      document.getElementById('hintTitle').innerText = 'Request a Hint';  // Reset title
      document.getElementById('hintMessage').innerText = 'Enter the name of the puzzle for which you need a hint:';  // Reset message
      document.getElementById('puzzleNameInput').disabled = false;  // Enable input again if hints remain
  }
}