// timer.js
let timeLimit = 60 * 60; // 60 minutes

function startTimer() {
    let timer = setInterval(function() {
        timeLimit--;
        document.getElementById('timerDisplay').innerText = formatTime(timeLimit);

        if (timeLimit <= 0) {
            clearInterval(timer);
            alert("Time's up! Game over.");
            // Add game over logic here
        }
    }, 1000);
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
}

// Call startTimer() when the game begins