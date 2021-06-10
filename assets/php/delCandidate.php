<?php
	include 'conn.php';
	$data = json_decode(file_get_contents("php://input"), true);

	$id = $data['id'];
	$id = mysqli_real_escape_string($conn, $id);
	$sql = "DELETE FROM `polling_tbl` WHERE `id` = '$id'";
	$res = mysqli_query($conn, $sql);
	if ($res) {
		echo json_encode("Deleted Successfully!");
	}
	else{
		echo json_encode("Failed To Delete!");
	}
?>