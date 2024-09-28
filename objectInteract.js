// objectInteract.js
function findClue() {
  const clue = { item: "Clue", type: "clue", description: "A cryptic note saying: 'The answer lies within the code 42.'", image: "images/clue.png" };
  addItemToInventory(clue);
  alert("You found a clue! It has been added to your inventory.");
}

function findKey() {
  const key = { item: "Key", type: "key", description: "This key opens the back door.", image: "images/key.png" };
  addItemToInventory(key);
  alert("You found a key! It has been added to your inventory.");
}

function addItemToInventory(item) {
  inventory.push(item);
  displayInventory(); // Refresh inventory display
}