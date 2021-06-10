<?php
	include 'conn.php';

	$sql = "SELECT SUM(votes) as totalVotes FROM polling_tbl";
	$res = mysqli_query($conn, $sql);
	$row = mysqli_fetch_assoc($res);
	$total = $row['totalVotes'];
	echo json_encode(($total));
?>