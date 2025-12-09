document.addEventListener('DOMContentLoaded', () => {
  const cartTable = document.getElementById('cart-table').querySelector('tbody');
  const totalSumEl = document.getElementById('total-sum');
  const checkoutBtn = document.getElementById('checkout-btn');
  const backBtn = document.getElementById('back-btn');

  // Load cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = 0;

  // Populate cart table
  function populateCart() {
    cartTable.innerHTML = '';
    total = 0;

    if (cart.length === 0) {
      cartTable.innerHTML = '<tr><td colspan="4" style="text-align:center;">Your cart is empty</td></tr>';
      totalSumEl.textContent = '₹0';
      return;
    }

    cart.forEach(item => {
      const row = document.createElement('tr');
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      row.innerHTML = `
        <td><img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover;"></td>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>₹${itemTotal.toFixed(2)}</td>
      `;
      cartTable.appendChild(row);
    });

    totalSumEl.textContent = `₹${total.toFixed(2)}`;
  }

  // Back button
  backBtn.addEventListener('click', () => {
    window.history.back();
  });

  // Checkout button
  checkoutBtn.addEventListener('click', async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    try {
      // Send cart data to backend
      const response = await fetch('http://localhost:5000/save-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'checkout',
          items: cart,
          total: total
        })
      });

      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        // If response is not JSON, get text instead
        const text = await response.text();
        throw new Error(`Server error: ${text || response.statusText}`);
      }
      
      if (response.ok) {
        alert('Checkout successful! Your order has been placed.');
        // Clear cart
        localStorage.removeItem('cart');
        cart = [];
        populateCart();
      } else {
        alert('Error during checkout: ' + (result.message || result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Checkout error:', error);
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        alert('Cannot connect to server. Please make sure the backend server is running on port 5000.');
      } else {
        alert('Error during checkout: ' + error.message);
      }
    }
  });

  // Initial population
  populateCart();
});
