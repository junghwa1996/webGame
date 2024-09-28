// notepad.js
let notes = [];

function addNote() {
    let note = prompt("Write your note:");
    if (note) {
        notes.push(note);
        displayNotes();
    }
}

function displayNotes() {
    let noteDisplay = document.getElementById('noteDisplay');
    noteDisplay.innerHTML = "";
    notes.forEach(note => {
        let noteElement = document.createElement('div');
        noteElement.innerText = note;
        noteDisplay.appendChild(noteElement);
    });
}

// Event listener for adding a new note
document.getElementById('addNoteButton').addEventListener('click', addNote);