<?php

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "pollsys";

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
if (!$conn) {
    echo "connection failed";
}
