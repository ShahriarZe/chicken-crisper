let cartItems = [];

function addToCart(itemName, itemPrice, itemImage, addButton) {
  const existingItem = cartItems.find(item => item.name === itemName);

  if (!existingItem) {
    cartItems.push({ name: itemName, price: itemPrice, quantity: 1, image: itemImage });
    updateCart();

    // Disable the button after adding to cart
    addButton.disabled = true;
  }
}

function updateCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";

  let totalPrice = 0;

  cartItems.forEach(item => {
    const listItem = document.createElement("li");
    listItem.style.display = "flex";
    listItem.style.alignItems = "center";
    listItem.style.justifyContent = "space-between";  // Separate items

    // Item Image
    const itemImage = document.createElement("img");
    itemImage.src = item.image;
    itemImage.alt = item.name;
    itemImage.style.width = "150px";
    listItem.appendChild(itemImage);

    // Item Details
    const itemDetails = document.createElement("span");
    itemDetails.textContent = `${item.name} - ${item.quantity} x ${item.price}$ `;
    listItem.appendChild(itemDetails);

    // Quantity Adjustment
    const buttonsContainer = document.createElement("div");
    buttonsContainer.style.display = "flex";
    buttonsContainer.style.alignItems = "center";

    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";
    decreaseButton.onclick = () => adjustQuantity(item.name, -1);
    buttonsContainer.appendChild(decreaseButton);

    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.onclick = () => adjustQuantity(item.name, 1);
    buttonsContainer.appendChild(increaseButton);

    // Remove Button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeFromCart(item.name);
    buttonsContainer.appendChild(removeButton);

    listItem.appendChild(buttonsContainer);

    cartList.appendChild(listItem);
    totalPrice += item.price * item.quantity;
  });

  const totalElement = document.createElement("li");
  totalElement.innerHTML = `<strong>Total: ${totalPrice}$</strong>`;
  cartList.appendChild(totalElement);
}

function adjustQuantity(itemName, quantityChange) {
  const existingItem = cartItems.find(item => item.name === itemName);

  if (existingItem) {
    existingItem.quantity += quantityChange;
    if (existingItem.quantity < 1) {
      existingItem.quantity = 1; // Prevent negative quantities
    }
  }

  updateCart();
}

function removeFromCart(itemName) {
  cartItems = cartItems.filter(item => item.name !== itemName);
  updateCart();
}
