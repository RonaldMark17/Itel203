document.getElementById("menu-btn").addEventListener("click", function () {
  var menu = document.getElementById("mobile-menu");
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
  } else {
    menu.classList.add("hidden");
  }
});

const cartItems = [];
const cartTotal = document.getElementById("cart-total");
const cartItemsList = document.getElementById("cart-items");

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function () {
    const product = this.getAttribute("data-product");
    const price = parseFloat(this.getAttribute("data-price"));
    const image = this.getAttribute("data-image");

    const existingItem = cartItems.find((item) => item.product === product);
    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.totalPrice += price;
    } else {
      cartItems.push({ product, price, image, quantity: 1, totalPrice: price });
    }
    updateCart();
  });
});

function updateCart() {
  cartItemsList.innerHTML = "";
  let total = 0;

  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "mb-5",
      "flex-col",
      "md:flex-row",
      "p-4",
      "border-b",
      "border-gray-200",
      "space-y-4",
      "md:space-y-0",
      "md:space-x-4"
    );
    li.innerHTML = `
            <img src="${item.image}" alt="Image of ${
      item.product
    }" class="w-16 h-16 object-cover rounded-lg mb-2 md:mb-0">
            <span class="flex-1 text-center md:text-left font-medium">${
              item.product
            }</span>
            <span class="flex-1 text-center md:text-left text-gray-600">₱${
              item.price
            }</span>
            <input type="number" min="1" value="${
              item.quantity
            }" class="quantity-input w-16 text-center border border-gray-300 rounded-lg mb-2 md:mb-0" data-product="${
      item.product
    }">
            <span class="flex-1 text-center md:text-left text-gray-600">Total: ₱${item.totalPrice.toFixed(
              2
            )}</span>
            <button class="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 remove-from-cart" data-product="${
              item.product
            }">Remove</button>
        `;
    cartItemsList.appendChild(li);
    total += item.totalPrice;
  });

  cartTotal.textContent = total.toFixed(2);

  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", function () {
      const product = this.getAttribute("data-product");
      const quantity = parseInt(this.value);
      const item = cartItems.find((i) => i.product === product);
      if (item) {
        item.quantity = quantity;
        item.totalPrice = item.price * quantity;
        updateCart();
      }
    });
  });

  document.querySelectorAll(".remove-from-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const product = this.getAttribute("data-product");
      const index = cartItems.findIndex((item) => item.product === product);
      if (index > -1) {
        cartItems.splice(index, 1);
        updateCart();
      }
    });
  });
}
document.getElementById("purchase-btn").addEventListener("click", function () {
  if (cartItems.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Empty Cart",
      text: "Your cart is empty! Please add items to your cart before purchasing.",
    });
  } else {
    Swal.fire({
      icon: "success",
      title: "Purchase Successful",
      text: "Thank you for your purchase!",
    });
    cartItems.length = 0;
    updateCart();
  }
});
let currentIndex = 0;
const carouselInner = document.getElementById("carousel-inner");
const carouselIndicators = document.getElementById("carousel-indicators");
const carouselItems = document.querySelectorAll(".carousel-item");
const totalItems = carouselItems.length;
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
function updateCarousel() {
  carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
  carouselIndicators
    .querySelectorAll(".carousel-indicator")
    .forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex);
    });
}
prevBtn.addEventListener("click", function () {
  currentIndex = (currentIndex - 1 + totalItems) % totalItems;
  updateCarousel();
});
nextBtn.addEventListener("click", function () {
  currentIndex = (currentIndex + 1) % totalItems;
  updateCarousel();
});
carouselIndicators
  .querySelectorAll(".carousel-indicator")
  .forEach((indicator, index) => {
    indicator.addEventListener("click", function () {
      currentIndex = index;
      updateCarousel();
    });
  });
updateCarousel();


document.getElementById('contact').addEventListener('submit', function(event) {
    event.preventDefault();
    Swal.fire({
        title: 'Message Sent!',
        text: 'Thank you for contacting us. We will get back to you soon.',
        icon: 'success',
        confirmButtonText: 'OK'
    });
});

