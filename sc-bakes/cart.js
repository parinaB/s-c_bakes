document.addEventListener('DOMContentLoaded', () => {
  const cartTable = document.getElementById('cart-table').querySelector('tbody');
  const totalSumEl = document.getElementById('total-sum');
  const checkoutBtn = document.getElementById('checkout-btn');
  const backBtn = document.getElementById('back-btn');

  // Load cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = 0;

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

  backBtn.addEventListener('click', () => window.history.back());

  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return alert('Your cart is empty!');

    // Save to localStorage orders
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({ type: 'checkout', items: cart, total: total, date: new Date().toLocaleString() });
    localStorage.setItem('orders', JSON.stringify(orders));

    alert('Checkout successful! Your order has been placed.');
    cart = [];
    localStorage.removeItem('cart');
    populateCart();
  });

  populateCart();
});
