function sendRequest(url, params, callback){
	url = url + "?" + params;
	if (typeof XMLHttpRequest != "undefined") {
		req = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		req  = new ActiveXObject("Microsoft.XMLHTTP");
	}
	req.open("POST", url, true);
	req.onreadystatechange = callback;
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(params);
}