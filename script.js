$(document).ready(function() {
    
    // Custom validation method for phone number
    $.validator.addMethod("phoneUS", function(phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || phone_number.length > 9 &&
            phone_number.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
    }, "Please enter a valid phone number");

    // Custom validation for at least one skill checkbox
    $.validator.addMethod("atLeastOneSkill", function(value, element) {
        return $("input[name='skills[]']:checked").length > 0;
    }, "Please select at least one skill");

    // Custom validation for file size
    $.validator.addMethod("fileSize", function(value, element, param) {
        if (element.files.length === 0) {
            return true;
        }
        return element.files[0].size <= param;
    }, "File size must not exceed 5MB");

    // Initialize form validation
    $("#registrationForm").validate({
        rules: {
            firstName: {
                required: true,
                minlength: 2,
                maxlength: 50
            },
            lastName: {
                required: true,
                minlength: 2,
                maxlength: 50
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                phoneUS: true
            },
            dob: {
                required: true,
                date: true
            },
            gender: {
                required: true
            },
            address: {
                required: true,
                minlength: 5
            },
            city: {
                required: true,
                minlength: 2
            },
            state: {
                required: true,
                minlength: 2
            },
            zipCode: {
                required: true,
                minlength: 5,
                maxlength: 10
            },
            country: {
                required: true
            },
            qualification: {
                required: true
            },
            institution: {
                required: true,
                minlength: 3
            },
            fieldOfStudy: {
                required: true,
                minlength: 2
            },
            graduationYear: {
                required: true,
                min: 1950,
                max: 2030
            },
            experience: {
                min: 0,
                max: 50
            },
            "skills[]": {
                atLeastOneSkill: true
            },
            resume: {
                extension: "pdf",
                fileSize: 5242880 // 5MB in bytes
            },
            terms: {
                required: true
            }
        },
        messages: {
            firstName: {
                required: "Please enter your first name",
                minlength: "First name must be at least 2 characters",
                maxlength: "First name cannot exceed 50 characters"
            },
            lastName: {
                required: "Please enter your last name",
                minlength: "Last name must be at least 2 characters",
                maxlength: "Last name cannot exceed 50 characters"
            },
            email: {
                required: "Please enter your email address",
                email: "Please enter a valid email address"
            },
            phone: {
                required: "Please enter your phone number"
            },
            dob: {
                required: "Please enter your date of birth"
            },
            gender: {
                required: "Please select your gender"
            },
            address: {
                required: "Please enter your address",
                minlength: "Address must be at least 5 characters"
            },
            city: {
                required: "Please enter your city"
            },
            state: {
                required: "Please enter your state"
            },
            zipCode: {
                required: "Please enter your ZIP code",
                minlength: "ZIP code must be at least 5 characters"
            },
            country: {
                required: "Please select your country"
            },
            qualification: {
                required: "Please select your qualification"
            },
            institution: {
                required: "Please enter your institution name"
            },
            fieldOfStudy: {
                required: "Please enter your field of study"
            },
            graduationYear: {
                required: "Please enter your graduation year",
                min: "Please enter a valid year",
                max: "Please enter a valid year"
            },
            resume: {
                extension: "Only PDF files are allowed"
            },
            terms: {
                required: "You must agree to the terms and conditions"
            }
        },
        errorPlacement: function(error, element) {
            if (element.attr("type") === "radio" || element.attr("type") === "checkbox") {
                error.insertAfter(element.closest('.radio-group, .checkbox-group, .terms-label'));
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function(element) {
            $(element).closest('.form-group').addClass('error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('error');
        },
        submitHandler: function(form) {
            // Show loading spinner
            $('#loadingSpinner').fadeIn();
            
            // Submit form via AJAX (optional) or regular submission
            // For demonstration, we'll use regular form submission
            form.submit();
        }
    });

    // Real-time validation feedback
    $('input, select, textarea').on('blur', function() {
        $(this).valid();
    });

    // Phone number formatting
    $('#phone').on('input', function() {
        let value = $(this).val().replace(/\D/g, '');
        if (value.length > 3 && value.length <= 6) {
            value = value.slice(0, 3) + '-' + value.slice(3);
        } else if (value.length > 6) {
            value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
        }
        $(this).val(value);
    });

    // File upload validation feedback
    $('#resume').on('change', function() {
        const file = this.files[0];
        if (file) {
            const fileSize = file.size / 1024 / 1024; // in MB
            if (fileSize > 5) {
                alert('File size exceeds 5MB. Please choose a smaller file.');
                $(this).val('');
            }
        }
    });

    // Smooth scroll to first error
    $("#registrationForm").on("submit", function() {
        if (!$(this).valid()) {
            $('html, body').animate({
                scrollTop: $('.error:first').offset().top - 100
            }, 500);
            return false;
        }
    });

    // Reset form confirmation
    $('button[type="reset"]').on('click', function(e) {
        if (!confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
            e.preventDefault();
        } else {
            $('.form-group').removeClass('error');
            $('.error-message').text('');
        }
    });

    // Add animation to form sections on scroll
    $(window).on('scroll', function() {
        $('.form-section').each(function() {
            const sectionTop = $(this).offset().top;
            const scrollTop = $(window).scrollTop();
            const windowHeight = $(window).height();
            
            if (scrollTop + windowHeight > sectionTop + 100) {
                $(this).css('opacity', '1');
            }
        });
    });

});
