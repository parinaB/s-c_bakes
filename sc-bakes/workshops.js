const wform = document.getElementById("workshopForm");
const wpeople = document.getElementById("wpeople");
const totalPriceEl = document.getElementById("totalPrice");
const wmsg = document.getElementById("wmsg");
const wdate = document.getElementById("wdate");
const wslot = document.getElementById("wslot");
const pricePerPerson = 699;

function updateTotalPrice(){ totalPriceEl.textContent=`₹${pricePerPerson*(parseInt(wpeople.value)||1)}`; }
wpeople.addEventListener("input",updateTotalPrice);
updateTotalPrice();

wform.addEventListener("submit",(e)=>{
  e.preventDefault();
  const name=document.getElementById("wname").value;
  const people=parseInt(wpeople.value);
  const date=wdate.value;
  const slot=wslot.value;
  const total=pricePerPerson*people;

  if(!name||!people||!date||!slot){ wmsg.textContent="Please fill all fields!"; return; }

  const workshopBookings = JSON.parse(localStorage.getItem('workshopBookings')) || [];
  workshopBookings.push({ name,date,people,slot,total,time:new Date().toLocaleString() });
  localStorage.setItem('workshopBookings',JSON.stringify(workshopBookings));

  wmsg.textContent=`Booking confirmed for ${name}! See you on ${date} at ${slot}. Total: ₹${total}`;
  wform.reset();
  updateTotalPrice();
});
