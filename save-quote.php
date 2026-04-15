<?php
// Enable error reporting for debugging (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set response header
header('Content-Type: application/json');

// Log errors to file for debugging
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/quotes/php_errors.log');

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get form data
$phoneNumber = isset($_POST['phoneNumber']) ? sanitize_input($_POST['phoneNumber']) : '';
$product = isset($_POST['product']) ? sanitize_input($_POST['product']) : '';
$quantity = isset($_POST['quantity']) ? sanitize_input($_POST['quantity']) : '';
$timestamp = isset($_POST['timestamp']) ? sanitize_input($_POST['timestamp']) : date('Y-m-d H:i:s');

// Validate required fields
if (empty($phoneNumber) || empty($product) || empty($quantity)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

// Validate phone number (basic validation)
if (!preg_match('/^[0-9]{10}$|^\+91[0-9]{10}$/', preg_replace('/[^0-9+]/', '', $phoneNumber))) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid phone number']);
    exit;
}

// Validate quantity (must be positive number)
if (!is_numeric($quantity) || $quantity <= 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid quantity']);
    exit;
}

// Create the quote data
$quoteData = "
================================================================================
QUOTE REQUEST
================================================================================
Date: {$timestamp}
Phone Number: {$phoneNumber}
Product: {$product}
Quantity: {$quantity}
================================================================================

";

// Define file path - create a quotes folder if it doesn't exist
$quotesDir = __DIR__ . '/quotes';
if (!is_dir($quotesDir)) {
    mkdir($quotesDir, 0755, true);
}

// Create filename with date and phone number for easy reference
$filename = $quotesDir . '/quote_' . date('Y-m-d') . '_' . preg_replace('/[^0-9]/', '', $phoneNumber) . '.txt';

// Check if file already exists with this data (to avoid duplicates within same day)
// If it does, append to it. Otherwise, create new file
if (file_exists($filename)) {
    // Append to existing file
    $result = file_put_contents($filename, $quoteData, FILE_APPEND | LOCK_EX);
} else {
    // Create new file with header
    $header = "AJANTA PAPER MART - QUOTE REQUESTS LOG\n" .
              "Generated Date: " . date('Y-m-d H:i:s') . "\n" .
              "================================================================================\n\n";
    $result = file_put_contents($filename, $header . $quoteData, LOCK_EX);
}

// Also save to a master log file for all quotes
$masterLog = $quotesDir . '/all_quotes.txt';
$masterData = "Date: {$timestamp} | Phone: {$phoneNumber} | Product: {$product} | Quantity: {$quantity}\n";
file_put_contents($masterLog, $masterData, FILE_APPEND | LOCK_EX);

if ($result !== false) {
    // Success - return response
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Quote request saved successfully',
        'reference' => basename($filename),
        'details' => [
            'phone' => $phoneNumber,
            'product' => $product,
            'quantity' => $quantity,
            'timestamp' => $timestamp
        ]
    ]);
} else {
    // Error - file couldn't be written
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to save quote request. Please try again later.'
    ]);
}

/**
 * Sanitize input to prevent injection attacks
 */
function sanitize_input($input) {
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    return $input;
}
?>
