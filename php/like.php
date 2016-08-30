<?php

try {
    $connection = new mysqli('localhost', 'simpet2782_fj', 'Arewehuman', 'simpet2782_fj');
} catch (Exception $e) {
    //Output JSON to the outside world with 501 error
    header("HTTP/1.1 500 Internal Server Error");
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
    exit;
}

    $jokeId = mysqli_escape_string($connection, $_POST['jokeId']);
    $likes = mysqli_escape_string($connection, $_POST['likes']);

    $sqladdlike = "UPDATE jokes SET likes='$likes' WHERE id='$jokeId'";

    $orderresult = mysqli_query($connection, $sqladdlike);

?>