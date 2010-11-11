<%@page import="org.springframework.context.ApplicationContext"%>
<%@page import="org.springframework.jdbc.core.JdbcTemplate"%>
<%@page import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.sql.ResultSet" %>
<%
	ApplicationContext appContext = WebApplicationContextUtils.getWebApplicationContext(getServletConfig().getServletContext());
	JdbcTemplate jdbcTemplate = appContext.getBean("jdbcTemplate", JdbcTemplate.class);

	String newestCalcID = "N/A";
	String newestCalcTime = "N/A";
	String oldestCalcID = "N/A";
	String oldestCalcTime = "N/A";

	// Execute a query
	String query = "SELECT calcID, physicalTime FROM calc ORDER BY calcID DESC LIMIT 1";
	PreparedStatement statement = jdbcTemplate.getDataSource().getConnection().prepareStatement(query, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
	ResultSet results = statement.executeQuery();

	// Handle results
	if(results.next()){
		newestCalcID = results.getString("calcID");
		newestCalcTime = results.getString("physicalTime");
	}

	// Execute a query
	query = "SELECT calcID, physicalTime FROM calc ORDER BY calcID ASC LIMIT 1";
	statement = jdbcTemplate.getDataSource().getConnection().prepareStatement(query, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
	results = statement.executeQuery();

	// Handle results
	if(results.next()){
		oldestCalcID = results.getString("calcID");
		oldestCalcTime = results.getString("physicalTime");
	}

	int numberOfCalcs = Integer.parseInt(newestCalcID) - Integer.parseInt(oldestCalcID);
%>
<div>
	<span class="h1">Database</span>
	<a name="details" style="visibility:hidden"></a>
	<a name="database" href="#top"></a>
	<span class="h2"> </span>
	<div>Number of calculations: <%=numberOfCalcs%></div>
	<table>
		<tr>
			<td>Oldest Calculation: </td><td><%=oldestCalcTime%></td><td><%=oldestCalcID%></td><td><a href="#" onclick="window.open('showComponent?name=viewCalc&calcRef=<%=oldestCalcID%>')">View</a></td>
		</tr>
		<tr>
			<td>Newest Calculation: </td><td><%=newestCalcTime%></td><td><%=newestCalcID%></td><td><a href="#" onclick="window.open('showComponent?name=viewCalc&calcRef=<%=oldestCalcID%>')">View</a></td>
		</tr>
	</table>
</div>