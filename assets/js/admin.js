/*
	Script By: Sahil Parray
	s4hilp4rr4y@gmail.com
*/

// Check Login
if (sessionStorage.getItem('pollLoginAuth') != "true") {
	$(".wrapper").remove();
}


// Populate Table
function loadTable() {
	$.ajax({
		url: "assets/php/fetchOptions.php",
		method: "GET",
		dataType: "json",
		success: function (data) {
			let output = "";
			x = data;
			for (let i = 0; i < x.length; i++){
				output += "<tr><td>"+ (Number(i)+1) +"</td><td>"+ x[i].candidate +"</td><td><button class='del-btn btn btn-danger' cid='"+ x[i].id +"'>Delete</button></td></tr>";
			}
			$("#table-body").html(output);
		},
		error: function () {
			console.log("Error with fetch options req");
		}

	});
}
loadTable();

// Add candidate
$("#add").click((e)=>{
	e.preventDefault();
	let name = $("#cName").val();
	let data = { name:name };
	let dataJSON = JSON.stringify(data);
	$.ajax({
		url: "assets/php/addCandidate.php",
		method: "POST",
		data: dataJSON,
		dataType: "json",
		success: function (data) {
			console.log(data);
			$("#msg").html("<div class='alert alert-warning'>"+ data +"</div>");
			$(".form")[0].reset();
			loadTable();
		},
		error: function () {
			console.log("Error with add req");
		}
	});
});


// Delete Modal
$("#close-delete-modal").click(()=>{
	$("#delModal").modal("hide");
});


// Adding Delete functions to every btn
$("#table-body").on('click', '.del-btn', function () {
	let cid = $(this).attr('cid');
	$("#del-id").val(cid);
	$("#delModal").modal('show');
});

// Deleting entry
$("#dlt-confirm").click(()=>{
	let cid = $("#del-id").val();
	let data = { id:cid };
	let dataJSON = JSON.stringify(data);
	$.ajax({
		url: "assets/php/delCandidate.php",
		method: "POST",
		data: dataJSON,
		dataType: "json",
		success: function (data) {
			console.log(data);
			$("#msg").html("<div class='alert alert-warning'>"+ data +"</div>");
			$("#delModal").modal('hide');
			loadTable();
		},
		error: function () {
			console.log("Error with del req");
		}
	});
});


// log out
$("#logout").click(()=>{
	sessionStorage.setItem('pollLoginAuth', '');
	window.location = "index.html";
	alert("Logged Out!");
});