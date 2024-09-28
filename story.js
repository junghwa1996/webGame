// story.js

const storyLines = [
  "You are a detective tasked with solving a 10-year-old unsolved case.",
  "The victim is a wealthy businessman who disappeared under mysterious circumstances.",
  "You have gathered the first clue. A cryptic note found in the victim's office.",
  "Now, you must decipher the note to uncover the next lead."
];

let currentStoryIndex = 0;

function displayStory() {
  const storyElement = document.getElementById('storyDisplay');
  // storyElement.innerText = storyLines[currentStoryIndex];
}

function nextStory() {
  if (currentStoryIndex < storyLines.length - 1) {
      currentStoryIndex++;
      displayStory();
  } else {
      alert("End of the story so far.");
  }
}

// document.getElementById('nextStoryButton').addEventListener('click', nextStory);

// Initial story display
displayStory();