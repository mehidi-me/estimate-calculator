<?php
header("Content-Type: application/json");

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['user'], $data['breakdown'], $data['totalCosting'])) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

$user = $data['user'];
$breakdown = $data['breakdown'];
$totalCosting = $data['totalCosting'];

// Format user info
$userInfoHtml = "<h3>User Information:</h3>";
$userInfoHtml .= "<p><strong>Name:</strong> {$user['name']}</p>";
$userInfoHtml .= "<p><strong>Email:</strong> {$user['email']}</p>";
$userInfoHtml .= "<p><strong>Phone:</strong> {$user['phone']}</p>";
$userInfoHtml .= "<p><strong>Item Description:</strong> {$user['description']}</p>";

// Format breakdown data into HTML
$breakdownHtml = "<h3>Order Breakdown:</h3><ul>";
foreach ($breakdown as $item) {
    $breakdownHtml .= "<li><strong>{$item['label']}:</strong> {$item['value']}</li>";
}
$breakdownHtml .= "</ul>";

// Email details
$adminEmail = "www.mehidi.me@gmail.com, agentmh47@gmail.com, salessupport@dfstouch.com"; // Change to your admin email
$subject = "New Order Breakdown & Estimate";
$headers = "From: info@esoftenv.com\r\n";
$headers .= "Reply-To: info@esoftenv.com\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// Email message
$message = "
<html>
<head>
    <title>New Order Estimate</title>
</head>
<body>
    $userInfoHtml
    $breakdownHtml
    <p><strong>Total Costing:</strong> $totalCosting USD</p>
</body>
</html>
";

// Send email to admin
if (mail($adminEmail, $subject, $message, $headers)) {
    echo json_encode(["status" => "success", "message" => "Email sent successfully to admin!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to send email."]);
}
?>
