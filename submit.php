<?php
header('Content-Type: application/json'); // For AJAX response

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize inputs
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $address = htmlspecialchars(trim($_POST['address']));

    // Basic server-side validation (echo back for simplicity; in production, add more checks)
    if (empty($name) || empty($email) || empty($phone) || empty($address)) {
        echo json_encode(['error' => 'All fields are required.']);
        exit;
    }

    // Generate formatted HTML for display
    $formattedData = "
        <h2>Application Submitted Successfully!</h2>
        <div class='data-display'>
            <p><strong>Full Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Phone Number:</strong> $phone</p>
            <p><strong>Address:</strong> $address</p>
        </div>
        <p>Thank you for your application. We will contact you soon.</p>
    ";

    echo json_encode(['success' => $formattedData]);
} else {
    echo json_encode(['error' => 'Invalid request.']);
}
?>