<div>	
	<span style="display:inline-block;width:150px;margin-right:16px;background:rgba(255,255,255,0.6) url('widgets/loggedInName/person-light.gif') 5px 2px no-repeat;padding:2px 0 3px 20px;border-radius:4px;text-align:left;">
		<%=((com.osl.core.user.PortalUser)session.getAttribute("user")).getUserName()%>
	</span>
</div>

