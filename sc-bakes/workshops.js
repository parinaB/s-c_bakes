// Constants
const pricePerPerson = 699;

// Get form elements
const wform = document.getElementById("workshopForm");
const wpeople = document.getElementById("wpeople");
const totalPriceEl = document.getElementById("totalPrice");
const wmsg = document.getElementById("wmsg");
const wdate = document.getElementById("wdate");
const wslot = document.getElementById("wslot");

// Function to update total price
function updateTotalPrice() {
  const num = parseInt(wpeople.value) || 1;
  totalPriceEl.textContent = `₹${pricePerPerson * num}`;
}

// Update total price on number of people change
wpeople.addEventListener("input", updateTotalPrice);

// Initial total price
updateTotalPrice();

// Handle form submission
wform.addEventListener("submit", async function(e) {
  e.preventDefault(); // prevent page reload

  const name = document.getElementById("wname").value;
  const people = parseInt(wpeople.value);
  const date = wdate.value;
  const slot = wslot.value;

  if (!name || !date || !slot || !people) {
    wmsg.textContent = "Please fill all fields!";
    return;
  }

  const total = pricePerPerson * people;
  
  try {
    // Send booking data to backend
    const response = await fetch('http://localhost:5000/save-workshop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        date: date,
        people: people,
        slot: slot,
        total: total
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      wmsg.textContent = `Booking confirmed for ${name}! See you on ${date} at ${slot}. Total: ₹${total}`;
      // Reset form after booking
      wform.reset();
      updateTotalPrice();
    } else {
      wmsg.textContent = 'Error saving booking: ' + result.message;
    }
  } catch (error) {
    console.error('Booking error:', error);
    wmsg.textContent = 'Error connecting to server. Please try again.';
  }
});
