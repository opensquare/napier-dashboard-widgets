<%
boolean autoLoad = false;
%>
<h1>Stats</h1>
<ul class="filter">
	<li class="selected"><a>All</a></li>
	<li><a>By Source</a></li>
	<li><a>By Calculation</a></li>
</ul>
<div style="float:right;margin:10px 0">
	<label>View stats by: <select id="timePeriod" onchange="showPeriodSelect(this.value);<%if(autoLoad){%>getStats(this.value)<%}%>"><option value="hour">Hour</option><option value="day" selected>Day</option><option value="month">Month</option><option value="year">Year</option></select></label>
	<select id="hourSelect" style="display:none" <%if(autoLoad){%>onchange="getStats('hour')"<%}%>></select>
	<select id="dateSelect" <%if(autoLoad){%>onchange="getStats('day')"<%}%>></select>
	<select id="monthSelect" style="display:none" <%if(autoLoad){%>onchange="getStats('month')"<%}%>></select>
	<select id="yearSelect" style="display:none" <%if(autoLoad){%>onchange="getStats('year')"<%}%>></select>
	<input class="button" type="button" onclick="getStats()" value="Refresh"/>
</div>
<%if(!autoLoad){%>
<input class="button" type="button" value="Display Stats" onclick="getStats()"/>
<%}%>
<div style="clear:both;border-top:1px solid;padding:20px 0;">
	<h2>Traffic Overview</h2>
	<p>The graph shows a count of the calculations processed in the period.</p>
	<img id= "volumeChart" src="widgets/statsAll/chart.png" alt="Volume chart"/>
	<span id="noVolume" style="display:none">No activity</span>
	<span id="volumeStats"></span>
	<%if(!autoLoad){%>
	<input class="button" type="button" value="Display Stats" onclick="getVolumeStats()"/>
	<%}%>
</div>
<div>
	<h2>Calculation Performance</h2>
	<p>The charts show how quickly calculations submitted over the period were processed.  The elapsed time is measured from receipt of the calculation request to the time the response is sent back to the required destination.</p>
	<img id= "performanceChart" src="widgets/statsAll/chart.png" alt="Performance chart"/>
	<span id="noPerformance" style="display:none">No activity</span>
	<span id="performanceStats"></span>
	<%if(!autoLoad){%>
	<input class="button" type="button" value="Display Stats" onclick="getPerformanceStats()"/>
	<%}%>
<div id="statsErrors" style="display:none">
	<h2>Calculation Errors</h2>
	<p>The table shows all the recorded errors in the period.</p>
	<div id="errorTable" style="display:none">
	<table>
		<tr>
			<thead><th>ID</th><th>Submitted</th><th> </th></thead>
			<tbody></tbody>
		</tr>
	</table>
	</div>
	<span id="noErrors">No activity</span>
	<%if(!autoLoad){%>
	<input class="button" type="button" value="Display Errors" onclick="getErrorStats()"/>
	<%}%>
</div>
<script type="text/javascript">
	populateHours();
	populateDays();
	populateMonths();
	var startYear = "2010";
	populateYears(startYear);
	<%if(autoLoad){%>
	getStats('day');
	<%}%>
</script>
