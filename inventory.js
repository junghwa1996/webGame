let inventory = [
  { item: "Key", type: "key", description: "This key opens the back door.", image: "images/key.png" },
  { item: "Clue", type: "clue", description: "A cryptic note saying: 'The answer lies within the code 42.'", image: "images/clue.png" }
];

function displayInventory() {
  let inventoryDisplay = document.getElementById('inventoryDisplay');
  inventoryDisplay.innerHTML = ""; // Clear previous display
  inventory.forEach((itemObj, index) => {
      let itemElement = document.createElement('div');
      
      // Create image element
      let itemImage = document.createElement('img');
      itemImage.src = itemObj.image;
      itemImage.alt = itemObj.item;
      itemImage.className = "inventoryImage";

      // Append image and item name
      itemElement.appendChild(itemImage);
      let itemName = document.createElement('div');
      itemName.innerText = itemObj.item;
      itemElement.appendChild(itemName);

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