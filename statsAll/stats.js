var lwidth = 0;
var pwidth = 0;
lwidth = document.documentElement.clientWidth*5/10;
lwidth = parseInt(lwidth);
pwidth = document.documentElement.clientWidth*3/10;
pwidth = parseInt(pwidth);

function showPeriodSelect(timePeriod){
	if(timePeriod=="hour"){
		document.getElementById("hourSelect").style.display="inline";
		document.getElementById("dateSelect").style.display="none";
		document.getElementById("monthSelect").style.display="none";
		document.getElementById("yearSelect").style.display="none";
	}
	if(timePeriod=="day"){
		document.getElementById("hourSelect").style.display="none";
		document.getElementById("dateSelect").style.display="inline";
		document.getElementById("monthSelect").style.display="none";
		document.getElementById("yearSelect").style.display="none";
	}
	if(timePeriod=="month"){
		document.getElementById("hourSelect").style.display="none";
		document.getElementById("dateSelect").style.display="none";
		document.getElementById("monthSelect").style.display="inline";
		document.getElementById("yearSelect").style.display="none";
	}
	if(timePeriod=="year"){
		document.getElementById("hourSelect").style.display="none";
		document.getElementById("dateSelect").style.display="none";
		document.getElementById("monthSelect").style.display="none";
		document.getElementById("yearSelect").style.display="inline";
	}
}

function populateHours(){
	var d = new Date();
	var x=document.getElementById("hourSelect");
	for(i=0;i<24;i++){
		var hour = d.getHours();
		var curr_date = d.getDate();
		if((curr_date+"").length==1){
			curr_date = "0" + curr_date;
		}
		var curr_month = d.getMonth();
		curr_month++;
		if((curr_month+"").length==1){
			curr_month = "0" + curr_month;
		}
		var curr_year = d.getFullYear();
		todayDate = curr_year + "-" + curr_month + "-" + curr_date;
		x.options[i] = new Option(hour + ":00 - " + (hour*1+1) + ":00", todayDate + " " + hour);
		d.setHours(hour-1);	
	}
}

function populateDays(){
	var d = new Date();
	var x=document.getElementById("dateSelect");
	for(i=0;i<31;i++){
		var curr_date = d.getDate();
		if((curr_date+"").length==1){
			curr_date = "0" + curr_date;
		}
		var curr_month = d.getMonth();
		curr_month++;
		if((curr_month+"").length==1){
			curr_month = "0" + curr_month;
		}
		var curr_year = d.getFullYear();
		todayDate = curr_date + "/" + curr_month + "/" + curr_year;
		todayDate2 = curr_year + "-" + curr_month + "-" + curr_date;
		x.options[i] = new Option(todayDate, todayDate2);		
		d.setDate(d.getDate() - 1);
	}
}

function populateMonths(){
	var d = new Date();
	var x=document.getElementById("monthSelect");
	var myMonths = new Array();
	myMonths[0] = "Jan";
	myMonths[1] = "Feb";
	myMonths[2] = "Mar";
	myMonths[3] = "Apr";
	myMonths[4] = "May";
	myMonths[5] = "Jun";
	myMonths[6] = "July";
	myMonths[7] = "Aug";
	myMonths[8] = "Sep";
	myMonths[9] = "Oct";
	myMonths[10] = "Nov";
	myMonths[11] = "Dec";
	for(i=0;i<12;i++){
		var curr_date = d.getDate();
		var curr_month = d.getMonth();
		var curr_year = d.getFullYear();
		todayDate = myMonths[curr_month] + " " + curr_year;
		todayDate2 = (curr_month*1+1) + " " + curr_year;
		//alert(todayDate2);
		x.options[i] = new Option(todayDate, todayDate2);		
		d.setMonth(d.getMonth() - 1);
	}
}

function populateYears(createdYear){
	var d = new Date();
	var currentYear = d.getFullYear();
	var y = currentYear - createdYear;
	var x=document.getElementById("yearSelect");
	for(i=0;i<=y+1;i++){
		x.options[i] = new Option(currentYear, currentYear);		
		currentYear--;
	}
}

var selectedTimePeriod;
var selectedPeriod;

function getStats(){
	getVolumeStats();
	getErrorStats();
	getPerformanceStats();
}

function getSelectedPeriod(timePeriod){
	selectedTimePeriod = timePeriod;
	if(timePeriod=="hour"){
		selectedPeriod = document.getElementById("hourSelect").value;		
	}
	if(timePeriod=="day"){
		selectedPeriod = document.getElementById("dateSelect").value;		
	}
	if(timePeriod=="month"){
		selectedPeriod = document.getElementById("monthSelect").value;		
	}
	if(timePeriod=="year"){
		selectedPeriod = document.getElementById("yearSelect").value;		
	}
	return selectedPeriod;
}

volumeChartLabel = "";

function getVolumeStats(){
	var timePeriod = document.getElementById("timePeriod").value;
	var selectedPeriod = getSelectedPeriod(timePeriod);
	if(timePeriod=="hour"){
		volumeChartLabel = "|||||5|||||10|||||15|||||20|||||25|||||30|||||35|||||40|||||45|||||50|||||55|||||60";
	}else if(timePeriod=="day"){
		volumeChartLabel = "|||03:00|||06:00|||09:00|||12:00|||15:00|||18:00|||21:00|||24:00";
	}else if(timePeriod=="month"){
		volumeChartLabel = "1st||||5th|||||10th|||||15th|||||20th|||||25th|||||30th||";
	}else{
		volumeChartLabel = "Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec";
	}
	var source = $('#calcSourceSelect option:selected').val();
	var params = "timePeriod=" + timePeriod + "&selectedPeriod=" + selectedPeriod + "&source=" + source;
	var url = "getVolumeStats?" + params;
	if (typeof XMLHttpRequest != "undefined") {
		volumeReq = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		volumeReq  = new ActiveXObject("Microsoft.XMLHTTP");
	}
	volumeReq.open("POST", url, true);
	volumeReq.onreadystatechange = updateVolumeStats;
	volumeReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	volumeReq.send(params);
}

function updateVolumeStats(){
	if (volumeReq.readyState == 4) {	
		if (volumeReq.status == 200) {
			var success = volumeReq.responseXML.getElementsByTagName("success")[0].childNodes[0].nodeValue;
			if(success=="true"){
				var jobStats = "";
				var errorStats = "";
				var testStats = "";
				var maxVal = 0;
				var jobTotal = 0;
				var errorTotal = 0;
				var stats = volumeReq.responseXML.getElementsByTagName("stat");
				for(i=0; i<stats.length; i++){
					var jobs = stats[i].getElementsByTagName("calcs")[0].childNodes[0].nodeValue;
					var errors = stats[i].getElementsByTagName("errorCount")[0].childNodes[0].nodeValue;
					if(parseInt(jobs) > maxVal){
						maxVal = jobs;
					}
					jobStats = jobStats + jobs + ",";
					jobTotal = jobTotal + jobs*1;
					errorStats = errorStats + errors + ",";
					errorTotal = errorTotal + errors*1;
				}
				jobStats = jobStats + "0";
				errorStats = errorStats + "0";
				if(maxVal==0){
					document.getElementById("volumeChart").style.display = "none";
					document.getElementById("volumeStats").style.display = "none";
					document.getElementById("noVolume").style.display = "inline";
				}else{
					var period;
					var partialPeriod = "false";
					var estimate;
					var periodLength;
					var totalPeriodLength;
					var average;
					var todaysDate = new Date();
					var thisDate = todaysDate.getDate();
					var thisDateFull = todaysDate.getDate();
					var thisHour = todaysDate.getHours();
					if(thisDateFull.length==1){
						thisDateFull = "0" + thisDateFull;
					}
					var thisMonth = todaysDate.getMonth()+1;
					if((thisMonth+"").length==1){
						thisMonth = "0" + thisMonth;
					}
					var thisYear = todaysDate.getFullYear();
					if(selectedTimePeriod=="hour"){
						period = "minute";
						totalPeriodLength = 60;
						if(selectedPeriod == thisYear + "-" + thisMonth + "-" + thisDateFull + " " + thisHour){
							periodLength = todaysDate.getMinutes()+1;
							partialPeriod = "true";
						}else{
							periodLength = totalPeriodLength;
						}
					}else if(selectedTimePeriod=="day"){
						period = "hour";
						totalPeriodLength = 24;
						if(selectedPeriod == thisYear + "-" + thisMonth + "-" + thisDateFull){
							periodLength = todaysDate.getHours()+1;
							partialPeriod = "true";
						}else{
							periodLength = totalPeriodLength;
						}
					}else if(selectedTimePeriod=="month"){
						period = "day";
						totalPeriodLength = 30;
						if(selectedPeriod == thisMonth + " " + thisYear){
							periodLength=thisDate;	
							partialPeriod = "true";
						}else{
							periodLength=totalPeriodLength;
						}
					}else if(selectedTimePeriod=="year"){
						period = "month";
						totalPeriodLength = 12;
						if(selectedPeriod == thisYear){
							periodLength = thisMonth;
							partialPeriod = "true";
						}else{
							periodLength = totalPeriodLength;
						}
					}
					average = jobTotal/periodLength;
					average = Math.round(average*100)/100;
					estimate = (jobTotal/periodLength)*totalPeriodLength;
					estimate = Math.round(estimate);
					var volumeStatsHtml = "<table class='statsTable'><tr><th>Traffic Summary</th><th>#</th></tr>";
					volumeStatsHtml += "<tr><td>Jobs submitted in period: </td><td>" + jobTotal + "</td></tr>";
					volumeStatsHtml += "<tr><td>Average jobs in period/" + period + " (Over " + periodLength + " " + period + "s): </td><td>" + average + "</td></tr>";
					volumeStatsHtml += '<tr><td>Failed jobs in period: (<a href="#" onclick="$('+"'#statsErrors'"+').show()">view</a>) </td><td>' + errorTotal + "</td></tr>";
					if(partialPeriod == "true"){
						volumeStatsHtml += "<tr><td>Estimated total jobs submission in period: </td><td>" + estimate + "</td></tr>";
					}
					volumeStatsHtml += "</table>";
					document.getElementById("volumeStats").innerHTML = volumeStatsHtml;
					
					var chartUrl = "getChart?chs=600x200&chbh=5,0,5&chtt=&chd=t:" + jobStats + "|" + errorStats + "&cht=lc&chg=0,25,1,5&chm=o,4D89F9,0,,6|o,C6D9FD,1,,4&chco=4D89F9,C6D9FD&chds=0," + maxVal + "&chxr=1,0," + maxVal + "&chxt=x,y&chl=" + volumeChartLabel + "&chdl=Total Jobs|Failed Jobs";
					document.getElementById("volumeChart").src = chartUrl;
					document.getElementById("volumeChart").style.display = "block";
					document.getElementById("volumeStats").style.display = "block";
					document.getElementById("noVolume").style.display = "none";
				}
			}else{
//				alert("An error occurred - v");
			}
		}
	} 
}

function getErrorStats(){
	var timePeriod = document.getElementById("timePeriod").value;
	var selectedPeriod = getSelectedPeriod(timePeriod);	
	var source = $('#calcSourceSelect option:selected').val();
	var params = "timePeriod=" + timePeriod + "&selectedPeriod=" + selectedPeriod + "&source=" + source;
	var url = "getErrorStats?" + params;
	if (typeof XMLHttpRequest != "undefined") {
		errorReq = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		errorReq  = new ActiveXObject("Microsoft.XMLHTTP");
	}
	errorReq.open("POST", url, true);
	errorReq.onreadystatechange = updateErrorStats;
	errorReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	errorReq.send(params);
}

function updateErrorStats(){
	if (errorReq.readyState == 4) {	
		if (errorReq.status == 200) {
			var success = errorReq.responseXML.getElementsByTagName("success")[0].childNodes[0].nodeValue;
			if(success=="true"){
				var stats = errorReq.responseXML.getElementsByTagName("stat");
				if(stats.length==0){
					document.getElementById("errorTable").style.display="none";
					document.getElementById("noErrors").style.display="inline";
				}else{
					var errorTable = document.getElementById("errorTable").getElementsByTagName("tbody")[0];
					var tableHTML = "";
					var jobIDs = "";
					for(i=0; i<stats.length; i++){
						var calcID = stats[i].getElementsByTagName("calcID")[0].childNodes[0].nodeValue;
						tableHTML += "<tr>";
						tableHTML += "<td>" + calcID + "</td>";
						tableHTML += "<td>" + stats[i].getElementsByTagName("physicalTime")[0].childNodes[0].nodeValue + "</td>";
						tableHTML += "<td><a href='#' onclick='window.open(\"showComponent?name=viewCalc&calcRef=" + calcID + "\")'>View</a></td>"
						tableHTML += "</tr>";
					}
					errorTable.innerHTML = tableHTML;
					document.getElementById("errorTable").style.display="block";
					document.getElementById("noErrors").style.display="none";
				}
			}else{
//				alert("An error occurred - e");
			}
		}
	} 
}

function getPerformanceStats(){
	var timePeriod = document.getElementById("timePeriod").value;
	var selectedPeriod = getSelectedPeriod(timePeriod);
	var source = $('#calcSourceSelect option:selected').val();
	var params = "timePeriod=" + timePeriod + "&selectedPeriod=" + selectedPeriod + "&source=" + source;
	var url = "getPerformanceStats?" + params;
	if (typeof XMLHttpRequest != "undefined") {
		iPerfReq = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		iPerfReq  = new ActiveXObject("Microsoft.XMLHTTP");
	}
	iPerfReq.open("POST", url, true);
	iPerfReq.onreadystatechange = updatePerformanceStats;
	iPerfReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	iPerfReq.send(params);
}

function updatePerformanceStats()
{
	if (iPerfReq.readyState == 4) {		
		if (iPerfReq.status == 200) {
			var success = iPerfReq.responseXML.getElementsByTagName("success")[0].childNodes[0].nodeValue;
			if(success=="true"){
				var band = 500;
				var bands = 10;
				var bandType = "ms";
				var chartLabel = "";
				var longestTime = 0;
				var quickestTime = 600000;
				var totalTime = 0;
				var totalCalcs = 0;
				var avgTime = 0;
				for(i=0; i<bands; i++){
					chartLabel = chartLabel + "<" + band*(i+1) + bandType + "|";
				}
				chartLabel = chartLabel + ">" + band*bands + bandType;
				var statsArray = [0,0,0,0,0,0,0,0,0,0,0];
				var stats = iPerfReq.responseXML.getElementsByTagName("stat");
				for(i=0; i<stats.length; i++){
					var jobs = stats[i].getElementsByTagName("calcNum")[0].childNodes[0].nodeValue;				
					var processingTime = stats[i].getElementsByTagName("processingTime")[0].childNodes[0].nodeValue;				
					totalCalcs = totalCalcs + jobs*1;
					totalTime = totalTime + processingTime*1;
					if(processingTime*1 > longestTime*1){
						longestTime = processingTime;
					}
					if(processingTime*1 < quickestTime*1){
						quickestTime = processingTime;
					}
					for(j=0; j<statsArray.length; j++){
						if(processingTime<band*(j+1)){
							statsArray[j] = statsArray[j] + jobs*1;
							break;
						}
					}
					if(processingTime>band*9){
						statsArray[statsArray.length-1] = statsArray[statsArray.length-1] + jobs*1;
					}
				}
				var jobStats = "";
				var maxVal = 0;
				for(i=0; i<statsArray.length; i++){
					var jobs = statsArray[i];
					if(parseInt(jobs) > maxVal){
						maxVal = jobs;
					}
					jobStats = jobStats + jobs + ",";
				}
				jobStats = jobStats + "0";
				if(maxVal==0){
					document.getElementById("performanceChart").style.display = "none";
					document.getElementById("noPerformance").style.display = "inline";
				}else{
					var chartUrl = "getChart?chs=600x200&chbh=30,0,20&chd=t:" + jobStats + "&cht=bvg&chco=4D89F9|689BFA|7FAAFB|7FAAFB|7FAAFB|95B8FB|95B8FB|95B8FB|C6D9FD|C6D9FD|C6D9FD&chds=0," + maxVal + "&chxr=1,0," + maxVal + "&chxt=x,y&chl=" + chartLabel;
					document.getElementById("performanceChart").src = chartUrl;
					document.getElementById("performanceChart").style.display = "block";
					document.getElementById("noPerformance").style.display = "none";
					avgTime = totalTime/totalCalcs;
					avgTime = Math.round(avgTime);
					var performanceStatsHtml = "<table class='statsTable'><tr><th>Performance Summary</th><th>ms</th></tr>";
					performanceStatsHtml += "<tr><td>Quickest Calculation Time: </td><td>" + quickestTime + "</td></tr>";
					performanceStatsHtml += "<tr><td>Longest Calculation Time: </td><td>" + longestTime + "</td></tr>";
					performanceStatsHtml += "<tr><td>Average Calculation Time: </td><td>" + avgTime + "</td></tr>";
					document.getElementById("performanceStats").innerHTML = performanceStatsHtml;
				}
				
			}else{
//				alert("An error occurred - d");
			}
		}
	}	
}

function Widget_statsAll() {

	this.onReadyExtend = function() {
		$.ajax('getCalcSources').done(function(json) {
			var $sourceSelect = $('#calcSourceSelect');
			for (var i = 0; i < json.sources.length; i++) {
				var $option = $('<option>').attr('value', json.sources[i]).text(json.sources[i]);
				$sourceSelect.append($option);
			}
		});
		
	};
}

Widget_statsAll.prototype = globalProperties.widgetPrototype;
