// note.js

let noteCount = 0;

function createNote() {
  const note = document.createElement('div');
  note.className = 'note';
  note.style.position = 'absolute';
  note.style.left = '100px';
  note.style.top = '100px';

  // Text area for editing the note content initially
  const noteInput = document.createElement('textarea');
  noteInput.placeholder = "Write your note here...";
  noteInput.className = 'noteInput';

  const completeButton = document.createElement('button');
  completeButton.innerText = 'Complete';
  completeButton.onclick = function() { completeNote(note, noteInput) };

  note.appendChild(noteInput);
  note.appendChild(completeButton);

  document.getElementById('noteContainer').appendChild(note);
  note.onmousedown = dragMouseDown;
}

function completeNote(note, noteInput) {
  // Replace input with plain text and add Edit/Delete buttons
  const noteContent = document.createElement('div');
  noteContent.className = 'noteContent';
  noteContent.innerText = noteInput.value || "No content";

  // Edit button to allow editing the note again
  const editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.onclick = function() { editNote(note, noteContent) };

  // Delete button to remove the note
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.onclick = function() { note.remove(); };

  // Clear existing elements and add note content, edit, and delete buttons
  note.innerHTML = '';
  note.appendChild(noteContent);
  note.appendChild(editButton);
  note.appendChild(deleteButton);
}

function editNote(note, noteContent) {
  // Switch back to textarea for editing
  const noteInput = document.createElement('textarea');
  noteInput.className = 'noteInput';
  noteInput.value = noteContent.innerText;

  const completeButton = document.createElement('button');
  completeButton.innerText = 'Complete';
  completeButton.onclick = function() { completeNote(note, noteInput) };

  // Replace the note content with the editable text area
  note.innerHTML = '';
  note.appendChild(noteInput);
  note.appendChild(completeButton);
}

let dragItem = null;
let offsetX = 0;
let offsetY = 0;

function dragMouseDown(event) {
    dragItem = event.target;
    offsetX = event.clientX - dragItem.getBoundingClientRect().left;
    offsetY = event.clientY - dragItem.getBoundingClientRect().top;

    document.onmousemove = elementDrag;
    document.onmouseup = stopDrag;
}

function elementDrag(event) {
    if (!dragItem) return;

    dragItem.style.left = (event.clientX - offsetX) + 'px';
    dragItem.style.top = (event.clientY - offsetY) - 215 + 'px';
}

function stopDrag() {
    document.onmousemove = null;
    document.onmouseup = null;
    dragItem = null; // Stop dragging when the mouse is released
}