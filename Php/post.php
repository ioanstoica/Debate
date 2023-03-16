<?php
// connect to the database
$servername = "localhost";
$username = "ioan";
$password = "87654321";
$dbname = "debate";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully" . "<br>";
echo "text: " . $_POST["text"] . "<br>";
// send "text" to the database
$sql = "INSERT INTO `comments` (`text`) VALUES ('" . $_POST["text"] . "')";
$result = $conn->query($sql);

$conn->close();

// reloaad the page
header("Location: index.php#form");
