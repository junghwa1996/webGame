// note.js

let noteCount = 0;

function createNote() {
  const note = document.createElement('div');
  note.className = 'note';
  note.innerText = 'New Note';
  note.style.position = 'absolute';
  note.style.left = '100px';
  note.style.top = '100px';

  // Mouse events for dragging
  note.onmousedown = dragMouseDown;
  document.getElementById('noteContainer').appendChild(note);
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