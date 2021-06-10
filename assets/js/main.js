/*
	Script By: Sahil Parray
	s4hilp4rr4y@gmail.com
*/

$(document).ready(()=>{
	console.log("Script Loaded");

	sessionStorage.setItem('pollLoginAuth', '');

	// Alert Function
	function alertMsg(msg) {
		$("#msg").html("<div class='alert alert-warning'>"+ msg +"</div");
	}


	// Loading Candidates 
	function loadOptions() {
		let output = "<option>Select</option>";
		$.ajax({
			url: "assets/php/fetchOptions.php",
			method: "GET",
			dataType: "json",
			success: function (data) {
				x = data;
				for(let i = 0; i < x.length; i++){
					output += "<option value='"+ x[i].candidate +"'>"+ x[i].candidate +"</option>";
				}
				$("#options").html(output);
			}, 
			error: function() {
				console.log("Fetch Options Request Error.");
			}
		});
	}
	loadOptions();



	// Fetch Total Votes
	function loadTotalVotes() {
		$.ajax({
			url: "assets/php/fetchTotalVotes.php",
			method: "GET",
			dataType: "json",
			success: function (data) {
				x = data;
				sessionStorage.setItem('totalVotes', x);
			},
			error: function () {
				console.log("Total Votes Req.");
			}
		});
	}
	loadTotalVotes();


	// Loading Bars
	function loadBars() {
		let output = "";
		$.ajax({
			url: "assets/php/fetchOptions.php",
			method: "GET",
			dataType: "json",
			success: function (data) {
				x = data;
				for(let i = 0; i < x.length; i++){
					let total = Number(sessionStorage.getItem('totalVotes'));
					let votesGot = Number(x[i].votes);
					let percentageRaw = votesGot / total * 100;
					let percentage = percentageRaw.toFixed(1);
					output += "<div class='bar-container'><div class='bar-header'><div>"+ x[i].candidate +"</div><div id='votes'>"+ x[i].votes +" ("+ percentage +"%)</div></div><div class='progress'><div class='progress-bar progress-bar-striped bg-success "+ loadBarColors(i) +"' role='progressbar' style='width: "+ percentage +"%;'></div></div></div>";
				}
				$("#stats").html(output);
			}, 
			error: function() {
				console.log("Fetch Options Request Error.");
			}
		});
	}
	loadBars();

	// Load Bar Colors
	function loadBarColors(i, totalBars) {
		var colorList = ["bg-primary", "bg-danger", "bg-warning", "bg-dark", "bg-info", "bg-secondary"];
		
		let colorClass =  colorList[i];
		return colorClass;
	}


	// Adding Vote
	$("#addVote").click( (e) =>{
		e.preventDefault();

		let voted = $("#SelectedCandidate").val();
		let name = $("#name").val();

		let regex = /^[a-zA-Z ]*$/;

		if (name == null || name == "") {
			alertMsg("Enter A Name!");
		}
		else if (name.length < 5 || name.length > 20) {
			alertMsg("Range of name: 5 - 20!");
		}
		else if (regex.test(name) == true) {
			addVote(name, voted);
		}
		else if (regex.test(name) == false) {
			alertMsg("Invalid Name!");
		}
 });


	function addVote(name, voted){
		const rawData = { name:name, voted:voted };
		const data = JSON.stringify(rawData);
		
		$.ajax({
			url: "assets/php/addVote.php",
			method: "post",
			data: data,
			dataType: "json",
			success: function (data) {
				alertMsg(data.msg);
				$("#main-form")[0].reset();
				loadTotalVotes();
				loadBars();
				loadOptions();
			},
			error: function() {
				console.log("Request Error!");
			}
		});
	}

	// Login Modal
	$("#loginBtn").click(()=>{
		$("#loginModal").modal('show');
	});	
	$("#close-login-modal").click(()=>{
		$("#loginModal").modal('hide');
	});


	// Attempt Login
	$("#login").click(()=>{
		let un = $("#username").val();
		let pw = $("#password").val();

		if (un == "" || pw == "") {
			alert("Both Fields Are Required.");
			$("#username").focus();
		}
		else if (un == "alpha" && pw == "alpha7"){
			sessionStorage.setItem('pollLoginAuth', 'true');
			window.location = "admin.html";
		}
		else {
			alert("Invalid username or password.");
		}
	});

});//Main 