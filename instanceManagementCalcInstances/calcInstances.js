function checkRegisteredInstances(){
	$.ajax({
		type: "GET",
		url: "http://ec2-75-101-194-8.compute-1.amazonaws.com:8080/loadbalancer/instances",
		dataType: "text",
		success: function(res) {
			alert(res);
		}
	});
}