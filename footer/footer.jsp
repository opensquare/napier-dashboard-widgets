<%
	Runtime rt = Runtime.getRuntime();
	Process p = null;
	String appName = application.getServletContextName();
	//String appPath = application.getContextPath();
	String osName = System.getProperty("os.name");
	//String osVersion = System.getProperty("os.version");
	String[] refDate = {"",""};
	String[] appVersion = {"","",""};

	java.util.Properties prop = new java.util.Properties();
		
	java.net.URL myURL = application.getResource("/WEB-INF/classes/portalWizard.properties"); 
	java.io.InputStream in = myURL.openStream();
	prop.load(in);

	String appPath = application.getRealPath("/");
	
	refDate = getWidgetRefreshDate(appPath, p, rt);
	appVersion = getAppVersion(appPath, p, rt);
%>
	
<%!

	public String[] getWidgetRefreshDate(String appPath, Process p, Runtime rt){
		String[] retVal = {"No version info available", ""};
		String version = "";
		int exitVal = 0;
		String testPath = "";
		try{
			testPath = appPath + "/widgets";
			p = rt.exec(new String[] { "sh", "-c", "ls -l " + testPath + "| grep version.txt"});
			exitVal = p.waitFor();
			if (exitVal == 0){
				java.io.InputStreamReader myIStreamReader = new java.io.InputStreamReader(p.getInputStream());
				int ch; 

				while ((ch = myIStreamReader.read()) != -1) {
					version = version + (char)ch;
				}
				if (version.length() > 0){
					int oldLen = 0;
					int newLen = 1;

					while(oldLen != newLen) {
						oldLen = version.length();
						version = version.replaceAll("  ", " ");
						newLen = version.length();				
					}

					String[] result = version.split(" ");
					retVal[0] = result[5];
					retVal[1] = result[6];
	
				}
			}
		}catch(Exception e){
		}
		return retVal;
	}
	
	public String[] getAppVersion(String appPath, Process p, Runtime rt){
		String retVal[] = {"No App version info available","",""};
		String version = "";
		int exitVal = 0;
		String testPath = "";
		try{
			testPath = appPath + "/version.txt";
			p = rt.exec(new String[] { "sh", "-c", "cat " + testPath});
			exitVal = p.waitFor();
			if (exitVal == 0){
				java.io.InputStreamReader myIStreamReader = new java.io.InputStreamReader(p.getInputStream());
				int ch; 

				while ((ch = myIStreamReader.read()) != -1) {
					version = version + (char)ch;
				}
				if (version.length() > 0){
					String[] lines = version.split("\n");
					int pos = 0;
					for (int i=0; i < lines.length & i < 3; i++){
						retVal[i] = lines[i];
					}
				}
			}
		}catch(Exception e){
		}
		return retVal;
	}	
%>
<div style="background-color:#005151;padding:4px;text-shadow:1px 1px 2px #000;color:#fff;font-size:11px">
	Powered by <b><span id="clickMe">PortalWizard<span></b>
	<div id="info">
		<u><%out.println("Portal Info");%></u><br />
		App Name: <%=appName%><br />
		App Path: <%=appPath%><br />
		Last Widget Refresh: <%=refDate[0]%> @ <%=refDate[1]%><br />
		From Bucket: <%=prop.getProperty("wizardWidgetStore")%><br />
		Os Name: <%=osName%><br />
		App Version: <br />
		- <%=appVersion[0]%><br />
		- <%=appVersion[1]%><br />
		- <%=appVersion[2]%><br />		
    	<input id="closePopup" type="Submit" value="Close"/>
	</div>
	<div style="float:right">
		&copy; Open Square, 2009 -
		<%
			out.println(new java.text.SimpleDateFormat("yyyy").format(new java.util.Date()));
		%>
	</div>
</div>
