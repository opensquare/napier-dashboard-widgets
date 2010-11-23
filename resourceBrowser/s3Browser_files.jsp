<html>
<head>
	<link rel="stylesheet" href="css/s3Browser-files.css" type="text/css"></link>
	
	<script type="text/javascript" src="js/s3Browser_files.js"></script>
	<script type="text/javascript" src="../../js/jquery.js" ></script>
	<script src="js/contextMenu.js" type="text/javascript"></script>
</head>
<body>
<%
	String topLevel = request.getParameter("topLevel");
	String accountID = (String)session.getAttribute("accountID");
	String archivePolicy = request.getParameter("archivePolicy");
	String prefix = "BucketStore:" + accountID + "/";
%>
<div id="filesHeadings">
	<span class="fileName"><a href="#" onclick="parent.sort(this.getAttribute('sortKey'))" sortKey="fileName" class="sortable">Resource Name</a></span><span class="effectiveTime"><a href="#" onclick="parent.sort(this.getAttribute('sortKey'))" sortKey="effectiveTime" class="sortable">Effective Time</a></span><span class="expiryTime"><a href="#" onclick="parent.sort(this.getAttribute('sortKey'))" sortKey="expiryTime" class="sortable">Expiry Time</a></span>
</div>
<div id="files" class="listline">

</div>
<div id="pagingControls">
	<span id="previousControls"><a class="first" href="#" onclick="parent.firstPage()">&lt;&lt;</a><a class="previous" href="#" onclick="parent.previousPage()">&lt;</a></span><span id="pageNo"></span><span id="nextControls"><a class="next" href="#" onclick="parent.nextPage()">&gt;</a><a class="last" href="#" onclick="parent.finalPage()">&gt;&gt;</a></span>
</div>
<input type="hidden" id="selectedFile" value=""/>
<input type="hidden" id="prefix" value="<%=prefix%>"/>
<%@ include file="s3Browser_files_menu.jsp" %>
<script type="text/javascript">
	$(document).ready( function() {
		prepareFileMenus();
		parent.searchByAddress('<%=topLevel%>');
	});
</script>
</body>
</html>