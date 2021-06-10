<?php
	include 'conn.php';

	$response = array();
	$sql = "SELECT * FROM `polling_tbl`";
	$res = mysqli_query($conn, $sql);
	while ($row = mysqli_fetch_array($res)) {
		$response[] = $row;
	}
	echo json_encode($response);
?>