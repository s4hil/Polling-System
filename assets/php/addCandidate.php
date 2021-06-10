<?php
	include 'conn.php';
	$data = json_decode(file_get_contents("php://input"), true);

	$name = $data['name'];
	$name = mysqli_real_escape_string($conn, $name);
	$sql = "INSERT INTO `polling_tbl` (`candidate`, `votes`) VALUES ('$name', '0')";
	$res = mysqli_query($conn, $sql);
	if ($res) {
		echo json_encode("Added Successfully!");
	}
	else {
		echo json_encode("Failed To Add!");
	}
?>