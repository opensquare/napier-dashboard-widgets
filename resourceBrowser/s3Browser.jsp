<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
<html>
	<head>
		<script type="text/javascript" src="js/dashboard.js"></script>
		<script type="text/javascript" src="js/ajax.js"></script>
		<script type="text/javascript" src="js/s3Browser.js"></script>
		<title>S3 Browser</title>
	</head>
	<%
		String topLevel = "";
		String addressBarOn = request.getParameter("addressBar");
		if(addressBarOn==null){addressBarOn="true";}
		String searchBarOn = request.getParameter("searchBar");
		if(searchBarOn==null){searchBarOn="true";}
		String foldersOn = request.getParameter("folders");
		if(foldersOn==null){foldersOn="true";}
		
		// To do - get partialSearch param from database
		String partialSearch = request.getParameter("partialSearch");
		if(partialSearch==null){partialSearch="false";}
	%>
	<frameset rows="35,*">
		<frame name="toolbar" src="s3Browser_header.jsp?path=<%=topLevel%>&addressBar=<%=addressBarOn%>&searchBar=<%=searchBarOn%>&partialSearch=<%=partialSearch%>" noresize="noresize" frameborder="0" marginheight="0" scrolling="no"/>
		<%if(foldersOn.equals("true")){%>
		<frameset cols="20%,*">
			<frame name="folders" src="s3Browser_folders.jsp?topLevel=<%=topLevel%>&path=<%=topLevel%>" frameborder="0" marginheight="0"/>
		<%}else{%>
		<frameset cols="*">
		<%}%>
			<frame name="files" src="s3Browser_files.jsp?topLevel=<%=topLevel%>&path=<%=topLevel%>" frameborder="0" marginheight="0"/>
			<noframes>
				<p>Sorry your browser does not support this feature.</p>
		  	</noframes>
		</frameset>
		<noframes>
			<p>Sorry your browser does not support this feature.</p>
		  </noframes>
		  <!--frame name="upload" src="s3Browser_upload.jsp" noresize="noresize" frameborder="0" marginheight="0" scrolling="no"/-->
	</frameset>
</html>