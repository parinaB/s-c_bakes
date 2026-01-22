const form = document.getElementById("selfForm");
const peopleInput = document.getElementById("speople");
const totalPriceEl = document.getElementById("totalPrice");
const pricePerPerson = 699;

peopleInput.addEventListener("input", () => {
  totalPriceEl.textContent = `₹${pricePerPerson * (peopleInput.value || 1)}`;
});

form.addEventListener("submit",(e)=>{
  e.preventDefault();

  const name=document.getElementById("sname").value;
  const date=document.getElementById("sdate").value;
  const people=parseInt(peopleInput.value);
  const flavour=document.getElementById("sflavour").value;
  const size=document.getElementById("ssize").value;
  const total=pricePerPerson*people;

  if(!name||!date||!people||!flavour||!size) return alert("Please fill all fields");

  const selfFunBookings = JSON.parse(localStorage.getItem('selfFunBookings')) || [];
  selfFunBookings.push({ name,date,people,flavour,size,total,time:new Date().toLocaleString() });
  localStorage.setItem('selfFunBookings',JSON.stringify(selfFunBookings));

  alert(`Booking confirmed!\nName:${name}\nDate:${date}\nPeople:${people}\nFlavour:${flavour}\nSize:${size}\nTotal:₹${total}`);
  form.reset();
  totalPriceEl.textContent=`₹${pricePerPerson}`;
});
