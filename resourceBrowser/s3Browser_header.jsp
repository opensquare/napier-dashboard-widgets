<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
	<head>
		<link rel="stylesheet" href="css/s3Browser-header.css" type="text/css"></link>
	</head>
	<body>
		<%
			String addressBarOn = request.getParameter("addressBar");
			String path = request.getParameter("path");
		%>
		<h1>MergeRobot Output Browser</h1>
		<div id='toolbar'>
			<%if(!"false".equals(addressBarOn)){%>
			<form id="addressBar" onsubmit="parent.searchByAddress(document.getElementById('address').value); return false">
				<label>Address: <input type="text" id="address" value="<%=path%>"/><input type="submit" value="Go"/>
			</form>
			<%}%>
		</div>
	</body>
</html>