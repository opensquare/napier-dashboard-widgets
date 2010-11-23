<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
	<head>
		<%@page import="com.osl.pact.ui.servlet.helper.RequestHelper"%>
		<%@page import="com.osl.pact.substrate.utils.ConfigHelper"%>
		<%@page import="org.dom4j.Document"%>
		<%@page import="org.dom4j.DocumentFactory"%>
		<%@page import="org.dom4j.DocumentHelper"%>
		<%@page import="org.dom4j.Element"%>
		<%@ page import="org.dom4j.Node"%>
		<%@ page import="org.dom4j.io.XMLWriter"%>
        <%@ page import="org.springframework.context.ApplicationContext" %>
        <%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
        <%@ page import="java.io.StringWriter" %>
        <%@ page import="java.util.ArrayList" %>
        <%@ page import="java.util.Iterator" %>
        <%@ page import="java.util.List" %>

        <link rel="stylesheet" type="text/css" media="all" href="css/s3Browser-folders.css" />
		
		<script type="text/javascript" src="js/tree.js"></script> 
		<script type="text/javascript" src="js/s3Browser_folders.js"></script>
		<script type="text/javascript" src="../../js/jquery.js" ></script>
		<script src="js/contextMenu.js" type="text/javascript"></script>
	</head>
	<body>
		<div id="folders">
		<%
            ApplicationContext appContext = WebApplicationContextUtils.getWebApplicationContext(getServletConfig().getServletContext());
            RequestHelper requestHelper = appContext.getBean("requestHelper", RequestHelper.class);
			String topLevel = request.getParameter("topLevel");
			String path = request.getParameter("path");
			String prefix = "";
			Element mmConfig = ConfigHelper.getConfigFile("./mmService.xml").getRootElement();
			String url = mmConfig.selectSingleNode("mmservice/url").getText();
			url = url + "resources/paths";
			System.out.println(url);
			String responseXML = requestHelper.sendRequestToUrl(url, "GET", "");
			List items = DocumentHelper.parseText(responseXML).selectNodes("/paths/path");
			Iterator itemIterator = items.iterator();
		
			Document doc = DocumentFactory.getInstance().createDocument();
			Element root = doc.addElement("ul").addAttribute("class", "tree");
			root = root.addElement("li");
			root.addElement("a").addAttribute("href", "#").addAttribute("dirPath", topLevel).addAttribute("onclick", "parent.searchByAddress('" + topLevel + "')").setText(topLevel);
			root = root.addElement("ul");
			while(itemIterator.hasNext()){
				String dirPath = topLevel;
				Node dn = (Node)itemIterator.next();
				String filePath = dn.getText() + "/";
				if(filePath.startsWith("/")){
					filePath = filePath.substring(1);
				}
				filePath = filePath.substring(prefix.length());
				if(topLevel!="")
					filePath = filePath.substring(filePath.indexOf(topLevel) + topLevel.length()+1);
				Element parentElement = root;
				while(filePath.indexOf("/") > -1){
					String dirName = filePath.substring(0, filePath.indexOf("/"));
					dirPath = dirPath + "/" + dirName;
					if(!dirName.startsWith("_")){
						Node existingNode = parentElement.selectSingleNode("li[starts-with(a, '" + dirName + "')]/ul");
						if(existingNode==null){
							Node n = parentElement.selectSingleNode("li[a/@class='file']");
							Element dir = parentElement.addElement("li");
							if(path.startsWith(dirPath)){
								dir.addAttribute("class", "open");
							}else{
								dir.addAttribute("class", "closed");							
							}
							Element dirLink = dir.addElement("a").addAttribute("dirPath", dirPath).addAttribute("onclick", "parent.searchByAddress('"  + dirPath + "')");
							dirLink.addAttribute("href", "#").addAttribute("class", "dir").setText(dirName);
							Element ul = dir.addElement("ul");
							ul.addAttribute("class", "hidden");
							ul.addElement("li").addAttribute("class", "closed hidden").addAttribute("style", "display:none");
							parentElement=ul;
						}else{
							parentElement=(Element)existingNode;
						}
						filePath = filePath.substring(filePath.indexOf("/")+1);
					}
				}
			}
			StringWriter strWriter = new StringWriter();
			XMLWriter writer = new XMLWriter(strWriter);
			writer.write(doc);
			String folderXml = strWriter.getBuffer().toString().replace("&apos;", "'");
			folderXml = folderXml.substring(folderXml.indexOf("<ul"));
			out.print(folderXml);
		%>
		</div>
		<%@ include file="s3Browser_folders_menu.jsp" %>
		<script type="text/javascript">
			$(document).ready( function() {
				prepareFolderMenus();
			});
		</script>
	</body>
</html>     