if (typeof timeLimit === 'undefined') {
  timeLimit = 60 * 60;  // 60 minutes in seconds
}


let timerInterval;

function startTimer() {
  timerInterval = setInterval(function() {
      timeLimit--;
      displayTime();

      if (timeLimit <= 0) {
          clearInterval(timerInterval);
          showBadEnding();
      }
  }, 1000);
}

function displayTime() {
  const minutes = Math.floor(timeLimit / 60);
  const seconds = timeLimit % 60;
  document.getElementById('timerDisplay').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function subtractTime(amount) {
  timeLimit -= amount * 60;  // Subtract 'amount' minutes in seconds
  if (timeLimit < 0) {
      timeLimit = 0;
  }
  displayTime();
}

function showBadEnding() {
  document.getElementById('roomScreen').style.display = 'none';
  document.getElementById('badEndingScreen').style.display = 'block';
  document.getElementById('badEndingMessage').innerText = "Time's up! You couldn't solve the mystery.";
}

// Call this function when entering the room
function enterRoom() {
  document.getElementById('roomScreen').style.display = 'block';
  startTimer();  // Start the timer when the player enters the room
}

document.getElementById('startRoomButton').addEventListener('click', function() {
  enterRoom();
});

// Call this when a puzzle answer is incorrect
function incorrectAnswer() {
  subtractTime(5);  // Subtract 5 minutes
  alert("Incorrect answer! 5 minutes deducted.");
}


function startGame() {
  document.getElementById('introScreen').style.display = 'none';
  document.getElementById('storyScreen').style.display = 'block';
};

function restartGame() {
  // Reset game variables
  hintCount = 3;
  obtainedHints = [];
  inventory = [];
  notes = [];
  timeLimit = 60 * 60;  // Reset the timer to 60 minutes

  // Clear any displayed hints, notes, and inventory
  document.getElementById('inventoryDisplay').innerHTML = '';
  document.getElementById('noteContainer').innerHTML = '';
  document.getElementById('previousHintsDropdown').innerHTML = '<option value="">Select a hint</option>';
  document.getElementById('previousHintDisplay').innerText = '';
  document.getElementById('hintStatus').innerText = `Hints remaining: ${hintCount}`;

  // Re-enable the hint button and input field
  document.getElementById('getHintButton').disabled = false;
  document.getElementById('puzzleNameInput').disabled = false;

  // Reset story and UI elements
  currentStoryIndex = 0;
  document.getElementById('storyText').innerText = "You are a detective...";
  document.getElementById('nextButton').style.display = 'block';
  document.getElementById('skipButton').style.display = 'block';
  document.getElementById('startRoomButton').style.display = 'none';

  // Hide room and bad ending screens
  document.getElementById('roomScreen').style.display = 'none';
  document.getElementById('badEndingScreen').style.display = 'none';

  // Show intro screen
  document.getElementById('introScreen').style.display = 'block';

  // Stop any ongoing timers
  clearInterval(timerInterval);
}

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
      incorrectAnswer();
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


let currentStoryIndex = 0;
const storyLines = [
    "You are a detective tasked with solving a 10-year-old unsolved case.",
    "The victim was a wealthy businessman who disappeared mysteriously.",
    "New evidence has surfaced, and it's up to you to solve the mystery."
];

function displayStory() {
    const storyElement = document.getElementById('storyText');
    if (currentStoryIndex < storyLines.length) {
        storyElement.innerText = storyLines[currentStoryIndex];
        currentStoryIndex++;
    } else {
        endStory();  // No more content, show the Start Room button
    }
}

function endStory() {
    // Hide the Next and Skip buttons, show the Start Room button
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('skipButton').style.display = 'none';
    document.getElementById('startRoomButton').style.display = 'block';
}

function skipStory() {
    // Immediately go to the room, bypassing the story
    document.getElementById('storyScreen').style.display = 'none';
    enterRoom();  // Start the game room
}

function startRoom() {
    document.getElementById('storyScreen').style.display = 'none';
    enterRoom();  // Start the game room
}

// Enter the room and start the timer
function enterRoom() {
    document.getElementById('roomScreen').style.display = 'block';
    startTimer();  // Start the timer when the player enters the room
}