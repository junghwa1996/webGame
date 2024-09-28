// note.js

let noteCount = 0;

function createNote() {
    noteCount++;
    const note = document.createElement('div');
    note.className = 'note';
    note.innerText = 'New Note ' + noteCount;
    note.setAttribute('draggable', 'true');
    note.style.position = 'absolute';
    note.style.left = '100px';
    note.style.top = '100px';
    note.ondragstart = dragNote;
    document.getElementById('noteContainer').appendChild(note);
}

function dragNote(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function dropNote(event) {
    event.preventDefault();
    const note = document.querySelector('.note');
    const x = event.clientX;
    const y = event.clientY;
    note.style.left = `${x}px`;
    note.style.top = `${y}px`;
}

// Add drag and drop functionality to the note container
document.getElementById('noteContainer').addEventListener('dragover', allowDrop);
document.getElementById('noteContainer').addEventListener('drop', dropNote);