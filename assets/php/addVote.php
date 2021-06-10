<?php
	function clean($str)
	{
		return preg_replace('/[^A-Za-z ]/', '', $str);
	}
	//https://www.facebook.com/profile.php?id=100069341946930

	// Function to get the client IP address
	function get_ip() {
	    $ipaddress = '';
	    if (getenv('HTTP_CLIENT_IP'))
	        $ipaddress = getenv('HTTP_CLIENT_IP');
	    else if(getenv('HTTP_X_FORWARDED_FOR'))
	        $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
	    else if(getenv('HTTP_X_FORWARDED'))
	        $ipaddress = getenv('HTTP_X_FORWARDED');
	    else if(getenv('HTTP_FORWARDED_FOR'))
	        $ipaddress = getenv('HTTP_FORWARDED_FOR');
	    else if(getenv('HTTP_FORWARDED'))
	       $ipaddress = getenv('HTTP_FORWARDED');
	    else if(getenv('REMOTE_ADDR'))
	        $ipaddress = getenv('REMOTE_ADDR');
	    else
	        $ipaddress = '0';
	    return $ipaddress;
	}

	$response = array();
	
	include 'conn.php';

	$ip = get_ip();

	$sql = "SELECT * FROM `submissions` WHERE `ip` = '$ip'";
	$res = mysqli_query($conn, $sql);
	
	if ($res) {
		$row = mysqli_fetch_array($res);
		if ($ip == $row['ip']) {
			$response = ["status" => "failed", "msg" => "You have already voted!"];
		}
		else{
			$data = json_decode(file_get_contents("php://input"), true);

			$name = mysqli_real_escape_string($conn, clean($data['name']));
			$voted = mysqli_real_escape_string($conn, clean($data['voted']));

			$sql = "SELECT * FROM `polling_tbl` WHERE `candidate` = '$voted'";
			$res = mysqli_query($conn, $sql);
			$row = mysqli_fetch_array($res);
			if ($row) {
				$votesNow = $row['votes'] + 1;
				$sql = "UPDATE `polling_tbl` SET `votes` = '$votesNow' WHERE `candidate` = '$voted'";
				$res = mysqli_query($conn, $sql);
				if ($res) {
					$sql2 = "INSERT INTO `submissions`(`name`, `ip`, `voted`) VALUES('$name','$ip','$voted')";
					$res2 = mysqli_query($conn, $sql2);

					if ($res2) {
						$response = ["status" => "success", "msg" => "Vote Added & Saved Successfully!"];
					}
					else {
						$response = ["status" => "success", "msg" => "Vote Added Successfully!"];
					}
				}
				else{
					$response =["status" => "failed", "msg" => "Failed To Add Vote!"];
				}
			}
			else {
				$response = ["status" => "failed", "msg" => "Couldn't Find Candidate!"];
			}
		}
	}
	
	echo json_encode($response);
?>