document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedbackForm');
  const stars = document.querySelectorAll('.star');
  const ratingInput = document.getElementById('frating');
  const ratingText = document.getElementById('ratingText');
  const msgEl = document.getElementById('feedbackMsg');
  let selectedRating = 0;

  stars.forEach(star => {
    star.addEventListener('click', () => {
      const rating = parseInt(star.dataset.rating);
      selectedRating = rating;
      ratingInput.value = rating;

      stars.forEach((s, index) => {
        s.classList.toggle('active', index < rating);
        s.textContent = index < rating ? '★' : '☆';
      });

      const labels = { 1:'Poor',2:'Fair',3:'Good',4:'Very Good',5:'Excellent' };
      ratingText.textContent = labels[rating] || 'Click to rate';
    });

    star.addEventListener('mouseenter', () => {
      const rating = parseInt(star.dataset.rating);
      stars.forEach((s,index) => {
        s.textContent = index<rating?'★':'☆';
        s.style.color = index<rating?'#ffd700':'#ddd';
      });
    });
  });

  document.querySelector('.star-rating').addEventListener('mouseleave', () => {
    stars.forEach((s,index) => {
      s.textContent = index<selectedRating?'★':'☆';
      s.style.color = index<selectedRating?'#ffd700':'#ddd';
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('fname').value.trim();
    const date = document.getElementById('fdate').value;
    const rating = ratingInput.value;
    const message = document.getElementById('fmessage').value.trim();

    if(!name||!date||!rating){
      msgEl.textContent='Please fill all required fields!';
      msgEl.className='error';
      return;
    }

    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    feedbacks.push({ name, date, rating, message, time: new Date().toLocaleString() });
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

    msgEl.textContent='Thank you for your feedback!';
    msgEl.className='success';

    form.reset();
    selectedRating=0;
    ratingInput.value='';
    stars.forEach(s => { s.classList.remove('active'); s.textContent='☆'; s.style.color='#ddd'; });
    ratingText.textContent='Click to rate';
    setTimeout(()=>{ msgEl.textContent=''; msgEl.className=''; },3000);
  });
});
