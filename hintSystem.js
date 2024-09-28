// hintSystem.js
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