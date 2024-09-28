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