$(document).ready(function() {
  $('#applicationForm').on('submit', function(e) {
    const phone = $('input[name="phone"]').val();
    if (!/^[0-9]{10}$/.test(phone)) {
      alert('Please enter a valid 10-digit phone number');
      e.preventDefault();
    }
  });
});
