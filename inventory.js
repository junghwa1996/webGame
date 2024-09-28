let inventory = [];

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

  // Update the popup with item details
  document.getElementById('itemPopupTitle').innerText = item.item;
  document.getElementById('itemPopupImage').src = item.image;
  document.getElementById('itemPopupDescription').innerText = item.description;

  // Show the item popup and darken the background
  document.getElementById('itemPopup').style.display = 'block';
  document.getElementById('popupOverlay').style.display = 'block';
}

function closeItemPopup() {
  // Close the item popup and restore background
  document.getElementById('itemPopup').style.display = 'none';
  document.getElementById('popupOverlay').style.display = 'none';
}

// Initialize inventory display
displayInventory();