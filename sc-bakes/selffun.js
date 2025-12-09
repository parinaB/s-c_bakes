const form = document.getElementById("selfForm");
const peopleInput = document.getElementById("speople");
const totalPriceEl = document.getElementById("totalPrice");
const pricePerPersonEl = document.getElementById("pricePerPerson");
const msg = document.getElementById("smsg");

const pricePerPerson = 699;

// Update total price dynamically
peopleInput.addEventListener("input", () => {
  const total = pricePerPerson * peopleInput.value;
  totalPriceEl.textContent = `₹${total}`;
});

// Form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("sname").value;
  const date = document.getElementById("sdate").value;
  const people = parseInt(peopleInput.value);
  const flavour = document.getElementById("sflavour").value;
  const size = document.getElementById("ssize").value;
  const slot = "Self-Fun Session";

  if (!name || !date || !people || !flavour || !size) {
    alert("Please fill all fields");
    return;
  }

  const total = pricePerPerson * people;

  try {
    // Send booking data to backend
    const response = await fetch('http://localhost:5000/save-self-fun', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        date: date,
        people: people,
        flavour: flavour,
        size: size,
        total: total
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      // Show confirmation popup
      alert(`Booking confirmed!\nName: ${name}\nDate: ${date}\nPeople: ${people}\nSession: ${slot}\nFlavour: ${flavour}\nSize: ${size}\nTotal: ₹${total}`);
      
      // Reset form
      form.reset();
      totalPriceEl.textContent = `₹${pricePerPerson}`;
      msg.textContent = ""; // clear any previous messages
    } else {
      alert('Error saving booking: ' + result.message);
    }
  } catch (error) {
    console.error('Booking error:', error);
    alert('Error connecting to server. Please try again.');
  }
});
