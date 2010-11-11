<style type="text/css">#stats{background-color:gray} .meDropdown{text-align:right;float:right;width:120px}</style>
	<%
        boolean autoLoad = true;
	%>
	<ul id="pageContent">
		<li>
			<div style="float:right;text-align:right">
				<label>View stats by: <select id="timePeriod" onchange="showPeriodSelect(this.value);<%if(autoLoad){%>getStats(this.value)<%}%>"><option value="hour">Hour</option><option value="day" selected>Day</option><option value="month">Month</option><option value="year">Year</option></select></label>
				<select id="hourSelect" style="display:none" <%if(autoLoad){%>onchange="getStats('hour')"<%}%>></select>
				<select id="dateSelect" <%if(autoLoad){%>onchange="getStats('day')"<%}%>></select>
				<select id="monthSelect" style="display:none" <%if(autoLoad){%>onchange="getStats('month')"<%}%>></select>
				<select id="yearSelect" style="display:none" <%if(autoLoad){%>onchange="getStats('year')"<%}%>></select>
			</div>
			<%if(!autoLoad){%>
			<input type="button" value="Display Stats" onclick="getStats()"/>
			<%}%>
		</li>
		<li>
			<span class="h1">Volume</span><a name="volume" href="#top" style="visibility:hidden"></a>
			<p>The graph shows a count of the calculations processed in the period.</p>
			<img id= "volumeChart" src="" alt="Volume chart"/>
			<span id="noVolume" style="display:none">No activity</span>
			<span id="volumeStats"></span>
			<%if(!autoLoad){%>
			<input type="button" value="Display Stats" onclick="getVolumeStats()"/>
			<%}%>
		</li>
		<li>
			<span class="h1">Errors</span><a name="errors" href="#top"></a>
			<p>The table shows all the recorded errors in the period.</p>
			<div id="errorTable" style="display:none">
			<table>
				<thead><th>ID</th><th>Submitted</th><th> </th></thead>
				<tbody></tbody>
			</table>
			</div>
			<span id="noErrors">No activity</span>
			<%if(!autoLoad){%>
			<input type="button" value="Display Stats" onclick="getErrorStats()"/>
			<%}%>
		</li>
		<li>
			<span class="h1">Performance</span><a name="performance" href="#top"></a>
			<p>The charts show how quickly calculations submitted over the period were processed.  The elapsed time is measured from receipt of the calculation request to the time the response is sent back to the required destination.</p>
			<img id= "performanceChart" src="" alt="Performance chart"/>
			<span id="noPerformance" style="display:none">No activity</span>
			<span id="performanceStats"></span>
			<%if(!autoLoad){%>
			<input type="button" value="Display Stats" onclick="getPerformanceStats()"/>
			<%}%>
		</li>
	</ul>
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
		