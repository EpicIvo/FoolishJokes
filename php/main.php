<?php
/**
 * Created by PhpStorm.
 * User: ivovanderknaap
 * Date: 19/08/2016
 * Time: 00:56
 */

header("Access-Control-Allow-Origin: http://foolishjokes.com");
require_once('http://foolishjokes.com/database/settings.php');

try {
    $connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_DATABASE);
} catch (Exception $e) {
    header("HTTP/1.1 500 Internal Server Error");
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
    exit;
}
$getAllQuery = "SELECT id, content, date, author, likes FROM jokes";
$getAllResult = $connection->query($getAllQuery);

$returnDataArray['meta'] = [
    "request_uri" => $_SERVER['REQUEST_URI'],
    "query" => $getAllQuery,
    "row_count" => $getAllResult->num_rows
];

while ($returnDataArrayRow = $getAllResult->fetch_assoc()) {
    $returnData['jokes'][] = [
        "id" => $returnDataArrayRow['id'],
        "content" => $returnDataArrayRow['content'],
        "date" => $returnDataArrayRow['date'],
        "author" => $returnDataArrayRow['author'],
        "likes" => $returnDataArrayRow['likes']
    ];
}

$getAllResult->close();
$connection->close();

echo json_encode($returnDataArray);
