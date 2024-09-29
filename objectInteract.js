// objectInteract.js
function findClue() {
  const clue = { item: "Clue", type: "clue", description: "A cryptic note saying: 'The answer lies within the code 42.'", image: "images/clue.png" };
  addItemToInventory(clue);
  showAcquisitionPopup(clue.item, clue.image);  // Show popup for item acquisition
}

function findKey() {
  const key = { item: "Key", type: "key", description: "This key opens the back door.", image: "images/key.png" };
  addItemToInventory(key);
  showAcquisitionPopup(key.item, key.image);  // Show popup for item acquisition
}

// function findDoor() {
//   const door = { item: "Door", type: "door", description: "The main exit door, it's locked.", image: "images/door.png" };
//   showAcquisitionPopup(door.item, door.image);  // Show popup for door
// }

// function findLock() {
//   const lock = { item: "Lock", type: "lock", description: "A sturdy lock. It requires a specific key to open.", image: "images/lock.png" };
//   showAcquisitionPopup(lock.item, lock.image);  // Show popup for lock
// }

function interactWithDoor() {
  const hasKey = inventory.some(item => item.type === 'key');

  if (hasKey) {
      // Show success popup and transition to Good Ending
      showAcquisitionPopup('Door', 'images/door.png', 'The door is unlocked! You escaped successfully.');
      setTimeout(showGoodEnding, 3000);  // Transition to good ending after a short delay
  } else {
      // Show failure popup if key is missing
      showAcquisitionPopup('Door', 'images/door.png', 'Key not found!');
  }
}

function interactWithLock() {
  const lockIndex = inventory.findIndex(item => item.type === 'lockKey');

  if (lockIndex !== -1) {
      // Show success popup and hide the lock
      showAcquisitionPopup('Lock', 'images/lock.png', 'The lock is unlocked! You found a hidden item.');
      
      // Remove the lock from the room
      document.getElementById('lockObject').style.display = 'none';

      // Remove the second key from inventory
      inventory.splice(lockIndex, 1);
      displayInventory();  // Update inventory display

      // Add hidden item to inventory
      const hiddenItem = { item: "Hidden Artifact", type: "artifact", description: "A mysterious artifact", image: "images/artifact.png" };
      addItemToInventory(hiddenItem);
  } else {
      // Show failure popup if second key is missing
      showAcquisitionPopup('Lock', 'images/lock.png', 'Key not found!');
  }
}

function findSecondKey() {
  const secondKey = { item: "Second Key", type: "lockKey", description: "A key that might open the door or the lock.", image: "images/secondKey.png" };
  addItemToInventory(secondKey);
  showAcquisitionPopup(secondKey.item, secondKey.image);  // Show popup for second key
}

function addItemToInventory(item) {
  const isDuplicate = inventory.some(invItem => invItem.item === item.item);


  if (!isDuplicate) {
    inventory.push(item);
    displayInventory();  // Update inventory display

    // Try to hide the item in the room after acquisition
    const itemElement = document.getElementById(`${item.type}Object`);
    if (itemElement) {
        itemElement.style.display = 'none';  // Hide the item only if it exists in the DOM
    } else {
        console.warn(`${item.type}Object element not found in the DOM`);
    }
  } else {
      alert(`${item.item} is already in your inventory.`);
  }
}

function showAcquisitionPopup(itemName, itemImage, message) {
  const popupTitle = document.getElementById('acquisitionPopupTitle');
  const popupImage = document.getElementById('acquisitionPopupImage');
  const popupDescription = document.getElementById('acquisitionPopupDescription');

  if (popupTitle && popupImage && popupDescription) {
      // Update popup with item details and message
      popupTitle.innerText = `${itemName}`;
      popupImage.src = itemImage;
      popupDescription.innerText = message;

      // Show the acquisition popup and darken the background
      document.getElementById('acquisitionPopup').style.display = 'block';
      document.getElementById('popupOverlay').style.display = 'block';

      // Automatically close the popup after 3 seconds
      setTimeout(closeAcquisitionPopup, 3000);
  } else {
      console.error("Popup elements not found");
  }
}

function closeAcquisitionPopup() {
  // Close the acquisition popup and remove background overlay
  document.getElementById('acquisitionPopup').style.display = 'none';
  document.getElementById('popupOverlay').style.display = 'none';
}