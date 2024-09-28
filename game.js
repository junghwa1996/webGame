// game.js

function startGame() {
  document.getElementById('introScreen').style.display = 'none';
  document.getElementById('storyScreen').style.display = 'block';
}

function goToRoom() {
  document.getElementById('storyScreen').style.display = 'none';
  document.getElementById('roomScreen').style.display = 'block';
}