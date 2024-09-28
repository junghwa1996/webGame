// inventory.js
let inventory = [
  { item: "Key", type: "key", description: "This key opens the back door." },
  { item: "Clue", type: "clue", description: "A cryptic note saying: 'The answer lies within the code 42.'" }
];

function displayInventory() {
  let inventoryDisplay = document.getElementById('inventoryDisplay');
  inventoryDisplay.innerHTML = ""; // Clear previous display
  inventory.forEach((itemObj, index) => {
      let itemElement = document.createElement('div');
      itemElement.innerText = itemObj.item;
      itemElement.className = "inventoryItem";
      itemElement.addEventListener('click', () => showItemDetails(index)); // Show item details on click
      inventoryDisplay.appendChild(itemElement);
  });
}

function showItemDetails(index) {
  const item = inventory[index];
  alert(`${item.item} - ${item.description}`);
}

// Initialize inventory display
displayInventory();