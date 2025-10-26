$(document).ready(function() {
    $('#registrationForm').on('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        // Basic client-side validation
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const phone = $('#phone').val().trim();
        const address = $('#address').val().trim();

        if (!name || !email || !phone || !address) {
            $('#result').removeClass('success').addClass('error').html('All fields are required.').show();
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#result').removeClass('success').addClass('error').html('Please enter a valid email.').show();
            return;
        }

        // AJAX submission
        $.ajax({
            url: 'process.php',
            type: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                $('#registrationForm').hide(); // Hide form on success
                $('#result').removeClass('error').addClass('success').html(response).show();
            },
            error: function() {
                $('#result').removeClass('success').addClass('error').html('Submission failed. Please try again.').show();
            }
        });
    });
});