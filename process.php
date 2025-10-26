<?php
// Start session
session_start();

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitize and validate input data
    function sanitizeInput($data)
    {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    // Personal Information
    $firstName = sanitizeInput($_POST['firstName']);
    $lastName = sanitizeInput($_POST['lastName']);
    $email = sanitizeInput($_POST['email']);
    $phone = sanitizeInput($_POST['phone']);
    $dob = sanitizeInput($_POST['dob']);
    $gender = sanitizeInput($_POST['gender']);

    // Address Information
    $address = sanitizeInput($_POST['address']);
    $city = sanitizeInput($_POST['city']);
    $state = sanitizeInput($_POST['state']);
    $zipCode = sanitizeInput($_POST['zipCode']);
    $country = sanitizeInput($_POST['country']);

    // Educational Background
    $qualification = sanitizeInput($_POST['qualification']);
    $institution = sanitizeInput($_POST['institution']);
    $fieldOfStudy = sanitizeInput($_POST['fieldOfStudy']);
    $graduationYear = sanitizeInput($_POST['graduationYear']);

    // Professional Information
    $experience = isset($_POST['experience']) ? sanitizeInput($_POST['experience']) : 'Not specified';
    $skills = isset($_POST['skills']) ? $_POST['skills'] : [];

    // Additional Information
    $comments = isset($_POST['comments']) ? sanitizeInput($_POST['comments']) : 'None';
    $terms = isset($_POST['terms']) ? 'Accepted' : 'Not Accepted';

    // Handle file upload
    $resumeFileName = 'Not uploaded';
    if (isset($_FILES['resume']) && $_FILES['resume']['error'] == 0) {
        $targetDir = "uploads/";

        // Create uploads directory if it doesn't exist
        if (!file_exists($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        $fileName = basename($_FILES["resume"]["name"]);
        $targetFilePath = $targetDir . time() . '_' . $fileName;
        $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));

        // Check if file is PDF
        if ($fileType == "pdf") {
            // Check file size (5MB max)
            if ($_FILES["resume"]["size"] <= 5242880) {
                if (move_uploaded_file($_FILES["resume"]["tmp_name"], $targetFilePath)) {
                    $resumeFileName = $fileName;
                }
            }
        }
    }

    // Calculate age from date of birth
    $dobDate = new DateTime($dob);
    $today = new DateTime();
    $age = $today->diff($dobDate)->y;

    // Store data in session for display (in production, save to database)
    $_SESSION['registration_data'] = [
        'firstName' => $firstName,
        'lastName' => $lastName,
        'email' => $email,
        'phone' => $phone,
        'dob' => $dob,
        'age' => $age,
        'gender' => $gender,
        'address' => $address,
        'city' => $city,
        'state' => $state,
        'zipCode' => $zipCode,
        'country' => $country,
        'qualification' => $qualification,
        'institution' => $institution,
        'fieldOfStudy' => $fieldOfStudy,
        'graduationYear' => $graduationYear,
        'experience' => $experience,
        'skills' => $skills,
        'comments' => $comments,
        'resumeFileName' => $resumeFileName,
        'submissionDate' => date('F j, Y, g:i a')
    ];

    // Redirect to success page
    header("Location: success.php");
    exit();

} else {
    // If accessed directly, redirect to form
    header("Location: index.html");
    exit();
}
?>