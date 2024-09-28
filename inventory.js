// inventory.js
let inventory = [];

function addItem(item) {
    inventory.push(item);
    displayInventory();
}

function displayInventory() {
    let inventoryDisplay = document.getElementById('inventoryDisplay');
    inventoryDisplay.innerHTML = "";
    inventory.forEach(item => {
        let itemElement = document.createElement('div');
        itemElement.innerText = item;
        inventoryDisplay.appendChild(itemElement);
    });
}

// Example of adding items
addItem("Key");
addItem("Clue");