<%@page import="com.osl.portalwizard.plugin.napierdashboard.helper.ConfigHelper"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%
ApplicationContext appContext = WebApplicationContextUtils.getWebApplicationContext(getServletConfig().getServletContext());
ConfigHelper configHelper = appContext.getBean("configHelper", ConfigHelper.class);
String loadbalancerUrl = configHelper.getLoadbalancerUrl();
String calcRef = request.getParameter("calcRef");
%>
<iframe src="{loadbalancerUrl}REST/calcs/<%=calcRef%>" frameborder="0" width="100%" height="100%">

</iframe>
