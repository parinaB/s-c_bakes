document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedbackForm');
  const stars = document.querySelectorAll('.star');
  const ratingInput = document.getElementById('frating');
  const ratingText = document.getElementById('ratingText');
  const msgEl = document.getElementById('feedbackMsg');
  let selectedRating = 0;

  // Star rating functionality
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const rating = parseInt(star.dataset.rating);
      selectedRating = rating;
      ratingInput.value = rating;
      
      // Update star display
      stars.forEach((s, index) => {
        if (index < rating) {
          s.classList.add('active');
          s.textContent = '★';
        } else {
          s.classList.remove('active');
          s.textContent = '☆';
        }
      });

      // Update rating text
      const ratingLabels = {
        1: 'Poor',
        2: 'Fair',
        3: 'Good',
        4: 'Very Good',
        5: 'Excellent'
      };
      ratingText.textContent = ratingLabels[rating] || 'Click to rate';
    });

    // Hover effect
    star.addEventListener('mouseenter', () => {
      const rating = parseInt(star.dataset.rating);
      stars.forEach((s, index) => {
        if (index < rating) {
          s.textContent = '★';
          s.style.color = '#ffd700';
        } else {
          s.textContent = '☆';
          s.style.color = '#ddd';
        }
      });
    });
  });

  // Reset stars on mouse leave (if no rating selected)
  document.querySelector('.star-rating').addEventListener('mouseleave', () => {
    if (selectedRating === 0) {
      stars.forEach(s => {
        s.textContent = '☆';
        s.style.color = '#ddd';
      });
    } else {
      stars.forEach((s, index) => {
        if (index < selectedRating) {
          s.textContent = '★';
          s.style.color = '#ffd700';
        } else {
          s.textContent = '☆';
          s.style.color = '#ddd';
        }
      });
    }
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('fname').value.trim();
    const date = document.getElementById('fdate').value;
    const rating = ratingInput.value;
    const message = document.getElementById('fmessage').value.trim();

    if (!name || !date || !rating) {
      msgEl.textContent = 'Please fill all required fields!';
      msgEl.className = 'error';
      return;
    }

    try {
      // Send feedback to backend
      const response = await fetch('http://localhost:5000/save-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          date: date,
          rating: rating,
          message: message || 'No additional comments'
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        msgEl.textContent = 'Thank you for your feedback!';
        msgEl.className = 'success';
        
        // Reset form
        form.reset();
        selectedRating = 0;
        ratingInput.value = '';
        stars.forEach(s => {
          s.classList.remove('active');
          s.textContent = '☆';
          s.style.color = '#ddd';
        });
        ratingText.textContent = 'Click to rate';
        
        // Clear message after 3 seconds
        setTimeout(() => {
          msgEl.textContent = '';
          msgEl.className = '';
        }, 3000);
      } else {
        msgEl.textContent = 'Error submitting feedback: ' + (result.message || 'Unknown error');
        msgEl.className = 'error';
      }
    } catch (error) {
      console.error('Feedback error:', error);
      msgEl.textContent = 'Error connecting to server. Please try again.';
      msgEl.className = 'error';
    }
  });
});


