<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
	<head>
		<link rel="stylesheet" href="css/s3Browser-header.css" type="text/css"></link>
	</head>
	<body>
		<%
			String accountID = (String)session.getAttribute("accountID");
			String addressBarOn = request.getParameter("addressBar");
			String searchBarOn = request.getParameter("searchBar");
			String path = request.getParameter("path");
			String partialSearch = request.getParameter("partialSearch");
		%>
		<h1>MergeRobot Output Browser</h1>
		<div id='toolbar'>
			<%if(!addressBarOn.equals("false")){%>
			<form id="addressBar" onsubmit="parent.searchByAddress(document.getElementById('address').value); return false">
				<label>Address: <input type="text" id="address" value="<%=path%>"/><input type="submit" value="Go"/>
			</form>
			<%}%>
			<%if(!searchBarOn.equals("false")){%>
			<form id="searchBar" onsubmit="parent.searchByKeyword(document.getElementById('search').value, false); return false">
				<label>Search: <input type="text" id="search" value=""/><input type="submit" value="Go"/>
			</form>
			<%}%>
		</div>
		<script type="text/javascript">
			parent.setSearchComparison(<%=partialSearch%>);
		</script>
	</body>
</html>