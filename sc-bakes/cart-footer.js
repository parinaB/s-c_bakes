document.addEventListener('DOMContentLoaded', () => {
  const cartFooter = document.getElementById('cart-footer');
  const cartTotal = document.getElementById('cart-total');

  let total = 0;

  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
    let quantity = 0;

    button.addEventListener('click', () => {
      const price = parseFloat(button.dataset.price);
      const name = button.dataset.name;
      const image = button.dataset.image;

      if (quantity === 0) {
        quantity = 1;
        total += price;

        // Change button to quantity selector
        button.innerHTML = `
          <button class="minus">-</button>
          <span class="qty">${quantity}</span>
          <button class="plus">+</button>
        `;

        attachQuantityEvents(button, name, image, price);
      }

      cartTotal.textContent = total.toFixed(2);

      if (cartFooter.classList.contains('hidden')) {
        cartFooter.classList.remove('hidden');
      }

      updateLocalStorage(name, image, price, quantity);
    });
  });

  function attachQuantityEvents(button, name, image, price) {
    const minusBtn = button.querySelector('.minus');
    const plusBtn = button.querySelector('.plus');
    const qtySpan = button.querySelector('.qty');

    let quantity = parseInt(qtySpan.textContent);

    minusBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (quantity > 0) {
        quantity--;
        total -= price;
        qtySpan.textContent = quantity;
        cartTotal.textContent = total.toFixed(2);

        updateLocalStorage(name, image, price, quantity);

        if (quantity === 0) {
          button.innerHTML = 'Add to Cart';
        }
      }
    });

    plusBtn.addEventListener('click', e => {
      e.stopPropagation();
      quantity++;
      total += price;
      qtySpan.textContent = quantity;
      cartTotal.textContent = total.toFixed(2);

      updateLocalStorage(name, image, price, quantity);
    });
  }

  function updateLocalStorage(name, image, price, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.name === name);

    if (existing) {
      if (quantity === 0) {
        cart = cart.filter(item => item.name !== name); // remove
      } else {
        existing.quantity = quantity;
      }
    } else if (quantity > 0) {
      cart.push({ name, image, price, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // View Cart button click
  const viewCartBtn = document.getElementById('view-cart-btn');
  viewCartBtn.addEventListener('click', () => {
    window.location.href = 'cart.html';
  });
});
