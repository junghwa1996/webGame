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
  // hintCount = 3;
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

function startRoom() {
    document.getElementById('storyScreen').style.display = 'none';
    enterRoom();  // Start the game room
}

// Enter the room and start the timer
function enterRoom() {
    document.getElementById('roomScreen').style.display = 'block';
    startTimer();  // Start the timer when the player enters the room
}