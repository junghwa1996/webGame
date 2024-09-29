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

function findDoor() {
  const door = { item: "Door", type: "door", description: "The main exit door, it's locked.", image: "images/door.png" };
  showAcquisitionPopup(door.item, door.image);  // Show popup for door
  // alert("The door is locked. Find the key to open it.");  // Interaction logic for the door
}

function findLock() {
  const lock = { item: "Lock", type: "lock", description: "A sturdy lock. It requires a specific key to open.", image: "images/lock.png" };
  addItemToInventory(lock);
  showAcquisitionPopup(lock.item, lock.image);  // Show popup for lock
}

function findSecondKey() {
  const secondKey = { item: "Second Key", type: "key", description: "A key that might open the door or the lock.", image: "images/secondKey.png" };
  addItemToInventory(secondKey);
  showAcquisitionPopup(secondKey.item, secondKey.image);  // Show popup for second key
}

function addItemToInventory(item) {
  const isDuplicate = inventory.some(invItem => invItem.item === item.item);

  if (!isDuplicate) {
      inventory.push(item);
      displayInventory();  // Update inventory display

      // Hide the item in the room after acquisition
      document.getElementById(`${item.type}Object`).style.display = 'none';
  } else {
      alert(`${item.item} is already in your inventory.`);
  }
}

function showAcquisitionPopup(itemName, itemImage) {
  // Update popup with item details
  document.getElementById('acquisitionPopupTitle').innerText = `You have acquired: ${itemName}`;
  document.getElementById('acquisitionPopupImage').src = itemImage;

  // Display the acquisition popup
  document.getElementById('acquisitionPopup').style.display = 'block';
  document.getElementById('popupOverlay').style.display = 'block';

  // Automatically close the popup after 3 seconds
  setTimeout(closeAcquisitionPopup, 3000);
}

function closeAcquisitionPopup() {
  // Close the acquisition popup and remove background overlay
  document.getElementById('acquisitionPopup').style.display = 'none';
  document.getElementById('popupOverlay').style.display = 'none';
}