<?php
/**
 * Created by PhpStorm.
 * User: ivovanderknaap
 * Date: 19/08/2016
 * Time: 00:56
 */

require_once('/Applications/XAMPP/htdocs/FoolishJokes/database/settings.php');

try {
    $connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_DATABASE);
} catch (Exception $e) {
    //Output JSON to the outside world with 501 error
    header("HTTP/1.1 500 Internal Server Error");
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
    exit;
}

//Get the required data from the database
$query = "SELECT id, content, date, author FROM jokes";
$result = $connection->query($query);

//Meta information about the returnData
$returnData['meta'] = [
    "request_uri" => $_SERVER['REQUEST_URI'],
    "query" => $query,
    "row_count" => $result->num_rows
];

//Merge the data from the database with the images from the database into the newly created returnData
while ($row = $result->fetch_assoc()) {
    $returnData['jokes'][] = [
        "id" => $row['id'],
        "content" => $row['content'],
        "date" => $row['date'],
        "author" => $row['author']
    ];
}

//Free the results and the connection
$result->close();
$connection->close();

//Output JSON to the outside world
echo json_encode($returnData);
