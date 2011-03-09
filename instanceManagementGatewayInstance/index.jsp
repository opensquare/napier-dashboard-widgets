<%@page import="com.osl.portalwizard.plugin.napierdashboard.helper.ConfigHelper"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%
ApplicationContext appContext = WebApplicationContextUtils.getWebApplicationContext(getServletConfig().getServletContext());
ConfigHelper configHelper = appContext.getBean("configHelper", ConfigHelper.class);
String loadbalancerUrl = configHelper.getLoadbalancerUrl();
%>
<h2>Gateway Instance</h2>
<p>This instance provides the web endpoint for your Napier service.  You will need to give the URL to those users who are authorised to submit jobs.</p>
<table id="instancesGateway" class="instancesTable">
	<tr>
		<th></th>
		<th>URL</th>
		<th>Status</th>
	</tr>
	<tr>
		<td><img src="widgets/instanceManagementGatewayInstance/globe.gif" /></td>
		<td><%=loadbalancerUrl%></td>
		<td>Active</td>
		<td privilege="showDummyFeatures">
			<input type="button" value="Stop!"/>
		</td>
	</tr>
</table>