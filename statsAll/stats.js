function Widget_statsAll() {

	var _this = this;

	this.onReadyExtend = function() {
		$.ajax('getCalcSources').done(function(json) {
			var $sourceSelect = $('#calcSourceSelect');
			for (var i = 0; i < json.sources.length; i++) {
				var $option = $('<option>').attr('value', json.sources[i]).text(json.sources[i]);
				$sourceSelect.append($option);
			}
		});

		$('#refreshButton').click(function() {
			_this.getVolumeStats();
			_this.getPerformanceStats();
			$('#statsErrors').hide();
		});
		
		$('#errorsLink').click(function() {
			_this.getErrorStats();
			return false;
		});
		
		$('#timePeriod').change(function() {
			_this.showSelectedTimePeriodSelector();
		});
		
		_this.populateHours();
		_this.populateDays();
		_this.populateMonths();
		_this.populateYears();
		
		$('#refreshButton').click();
	};
	
	this.showSelectedTimePeriodSelector = function() {
		var timePeriod = _this.getTimePeriod();
		$('.timePeriodSelection').hide();
		if (timePeriod === "hour") {
			$('#hourSelect').show();
		}
		if (timePeriod === "day") {
			$('#dateSelect').show();
		}
		if (timePeriod === "month") {
			$('#monthSelect').show();
		}
		if (timePeriod === "year") {
			$('#yearSelect').show();
		}
	}
	
	this.populateHours = function() {
		var d = new Date();
		var $hourSelect = $("#hourSelect");
		for (i = 0; i < 24; i++) {
			var hour = d.getHours();
			var curr_date = d.getDate();
			if ((curr_date+"").length == 1) {
				curr_date = "0" + curr_date;
			}
			var curr_month = d.getMonth();
			curr_month++;
			if ((curr_month+"").length == 1) {
				curr_month = "0" + curr_month;

			}
			var curr_year = d.getFullYear();
			todayDate = curr_year + "-" + curr_month + "-" + curr_date;
		
			var $option = $('<option></option>').val(todayDate + " " + hour).text(hour + ":00 - " + (hour*1+1) + ":00");
			$hourSelect.append($option);
			d.setHours(hour-1);	
		}
	};
	
	this.populateDays = function() {
		var d = new Date();
		var $dateSelect = $('#dateSelect');
		for (i = 0; i < 31; i++) {
			var curr_date = d.getDate();
			if ((curr_date + "").length == 1) {
				curr_date = "0" + curr_date;
			}
			var curr_month = d.getMonth();
			curr_month++;
			if ((curr_month + "").length == 1) {
				curr_month = "0" + curr_month;
			}
			var curr_year = d.getFullYear();
			todayDate = curr_date + "/" + curr_month + "/" + curr_year;
			todayDate2 = curr_year + "-" + curr_month + "-" + curr_date;
			var $option = $('<option></option>').val(todayDate2).text(todayDate);
			$dateSelect.append($option);
			d.setDate(d.getDate() - 1);
		}
	};

	this.populateMonths = function() {
		var d = new Date();
		var $monthSelect = $('#monthSelect');
		var myMonths = new Array();
		myMonths[0] = "Jan";
		myMonths[1] = "Feb";
		myMonths[2] = "Mar";
		myMonths[3] = "Apr";
		myMonths[4] = "May";
		myMonths[5] = "Jun";
		myMonths[6] = "Jul";
		myMonths[7] = "Aug";
		myMonths[8] = "Sep";
		myMonths[9] = "Oct";
		myMonths[10] = "Nov";
		myMonths[11] = "Dec";
		for (i = 0; i < 12; i++) {
			var curr_date = d.getDate();
			var curr_month = d.getMonth();
			var curr_year = d.getFullYear();
			todayDate = myMonths[curr_month] + " " + curr_year;
			todayDate2 = (curr_month * 1 + 1) + " " + curr_year;
			var $option = $('<option></option>').val(todayDate2).text(todayDate);
			$monthSelect.append($option);
			d.setMonth(d.getMonth() - 1);
		}
	};

	this.populateYears = function() {
		var startYear = 2010;
		var d = new Date();
		var currentYear = d.getFullYear();
		var y = currentYear - startYear;
		var $yearSelect = $('#yearSelect');
		for (i = 0; i <= y + 1; i++) {
			var $option = $('<option></option>').val(currentYear).text(currentYear);
			$yearSelect.append($option);
			currentYear--;
		}
	};

	this.getVolumeStats = function() {
		var timePeriod = _this.getTimePeriod();
		var selectedPeriod = _this.getSelectedPeriod();
		var source = _this.getSource();
		var volumeChartLabel;
	
		if (timePeriod === "hour" ) {
			volumeChartLabel = "|||||5|||||10|||||15|||||20|||||25|||||30|||||35|||||40|||||45|||||50|||||55|||||60";
		} else if (timePeriod === "day") {
			volumeChartLabel = "|||03:00|||06:00|||09:00|||12:00|||15:00|||18:00|||21:00|||24:00";
		} else if (timePeriod === "month") {
			volumeChartLabel = "1st||||5th|||||10th|||||15th|||||20th|||||25th|||||30th||";
		} else if (timePeriod == "year") {
			volumeChartLabel = "Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec";
		}

		var params = "timePeriod=" + timePeriod + "&selectedPeriod=" + selectedPeriod + "&source=" + source;
		var url = "getVolumeStats?" + params;

		$.ajax(url).done(function(json) {
			var totalCount = 0;
			var errorCount = 0;
			var maxCountValue = 0;
			var chartTotalString = "";
			var chartErrorString = "";

			for (var i = 0; i < json.stats.length; i++) {
				totalCount += json.stats[i].tot;
				errorCount += json.stats[i].err;
				if (chartTotalString.length > 0) {
					chartTotalString += ",";
					chartErrorString += ",";
				}
				chartTotalString += json.stats[i].tot;
				chartErrorString += json.stats[i].err;

				if (json.stats[i].tot > maxCountValue) {
					maxCountValue = json.stats[i].tot;
				}
				if (json.stats[i].err > maxCountValue) {
					maxCountValue = json.stats[i].err;
				}
			}

			var chartUrl = _this.getVolumeChartUrl(volumeChartLabel, chartTotalString, chartErrorString, maxCountValue);
			$('#volumeChart').attr('src', chartUrl);

			$('#volumeJobTotal').text(totalCount);
			$('#volumeJobErrorCount').text(errorCount);
			if (errorCount > 0) {
				$('#errorsLinkSpan').show();
			} else {
				$('#errorsLinkSpan').hide();
			}

			_this.updateVolumeAverageAndEstimate(timePeriod, selectedPeriod, totalCount)
		});
	};

	this.updateVolumeAverageAndEstimate = function(selectedTimePeriod, selectedPeriod, totalJobCount) {
		var subPeriod;
		var partialPeriod = "false";
		var periodLength;
		var totalPeriodLength;
		var average;
		var todaysDate = new Date();
		var thisDate = todaysDate.getDate();
		var thisDateFull = todaysDate.getDate();
		var thisHour = todaysDate.getHours();
		if (thisDateFull.length == 1) {
			thisDateFull = "0" + thisDateFull;
		}
		var thisMonth = todaysDate.getMonth() + 1;
		var thisMonthFull = thisMonth;
		if (thisMonthFull.toString().length == 1) {
			thisMonthFull = "0" + thisMonthFull;
		}
		var thisYear = todaysDate.getFullYear();

		if (selectedTimePeriod === "hour") {
			subPeriod = "minute";
			totalPeriodLength = 60;
			if (selectedPeriod === thisYear + "-" + thisMonthFull + "-" + thisDateFull + " " + thisHour) {
				periodLength = todaysDate.getMinutes() + 1;
				partialPeriod = "true";
			} else {
				periodLength = totalPeriodLength;
			}
		} else if (selectedTimePeriod === "day") {
			subPeriod = "hour";
			totalPeriodLength = 24;
			if (selectedPeriod === thisYear + "-" + thisMonthFull + "-" + thisDateFull) {
				periodLength = todaysDate.getHours() + 1;
				partialPeriod = "true";
			} else {
				periodLength = totalPeriodLength;
			}
		} else if (selectedTimePeriod === "month") {
			subPeriod = "day";
			totalPeriodLength = 30;
			if (selectedPeriod === thisMonth + " " + thisYear) {
				periodLength = thisDate;	
				partialPeriod = "true";
			} else {
				periodLength = totalPeriodLength;
			}
		} else if (selectedTimePeriod === "year") {
			subPeriod = "month";
			totalPeriodLength = 12;
			if (selectedPeriod == thisYear) {
				periodLength = thisMonth;
				partialPeriod = "true";
			} else {
				periodLength = totalPeriodLength;
			}
		}
		average = totalJobCount / periodLength;
		average = Math.round(average*100) / 100;
		$('#volumeJobAvg').text(average);
		$('#volumeAvgPeriodLabel').text('/' + subPeriod + ' (Over ' + periodLength + ' ' + subPeriod + 's)');

		if (partialPeriod === "true") {
			var estimate = totalJobCount / periodLength * totalPeriodLength;
			estimate = Math.round(estimate);
			$('#volumeEstimateCount').text(estimate);
			$('#volumeEstimateRow').show();
		} else {
			$('#volumeEstimateRow').hide();
		}
	};

	this.getErrorStats = function() {
		$('#statsErrors').show();
		var timePeriod = _this.getTimePeriod();
		var selectedPeriod = _this.getSelectedPeriod();	
		var source = _this.getSource();
		var params = "timePeriod=" + timePeriod + "&selectedPeriod=" + selectedPeriod + "&source=" + source;
		var url = "getErrorStats?" + params;
	
		$('.errorRow').remove();
	
		$.ajax(url).done(function(json) {
			var $errorTable = $('#errorTable');
			for (var i = 0; i < json.errors.length; i++) {
				var calcID = json.errors[i].calcID;
				$errorTable.append('<tr class="errorRow"><td>' + calcID + '</td><td>' + json.errors[i].time + '</td><td><a href="#" onclick="window.open(\'showComponent?name=viewCalc&calcRef=' + calcID + '\')">View</a></td></tr>');
			}
		});	
	};

	this.getPerformanceStats = function() {
		var timePeriod = _this.getTimePeriod();
		var selectedPeriod = _this.getSelectedPeriod();
		var source = _this.getSource();
		var params = "timePeriod=" + timePeriod + "&selectedPeriod=" + selectedPeriod + "&source=" + source;
		var url = "getPerformanceStats?" + params;

		$.ajax(url).done(function(json) {
			$('#maxExecTime').text(json.max);
			$('#minExecTime').text(json.min);
			$('#avgExecTime').text(json.avg);
			var chartLabels = "";
			var chartValues = "";
			var maxCount = 0;
			for (var i = 0; i < json.execTimes.length; i++) {
				if (chartLabels.length > 0) {
					chartLabels += "|";
					chartValues += ",";
				}
				chartLabels += json.execTimes[i][0];
				var count = json.execTimes[i][1];
				chartValues += count;
				if (count > maxCount) {
					maxCount = count;
				}
			}
			var chartUrl = _this.getPerformanceChartUrl(chartLabels, chartValues, maxCount);
			$('#performanceChart').attr('src', chartUrl);
		});
	};

	this.getVolumeChartUrl = function(labels, totalCountValues, errorCountValues, maxVal) {
		return "getChart?chs=600x200&chbh=5,0,5&chtt=&chd=t:" + totalCountValues + "|" + errorCountValues + "&cht=lc&chg=0,25,1,5&chm=o,4D89F9,0,,6|o,C6D9FD,1,,4&chco=4D89F9,C6D9FD&chds=0," + maxVal + "&chxr=1,0," + maxVal + "&chxt=x,y&chl=" + labels + "&chdl=Total Jobs|Failed Jobs"
	};

	this.getPerformanceChartUrl = function(labels, values, count) {
		return "getChart?chs=600x200&chbh=30,0,20&chd=t:" + values + "&cht=bvg&chco=4D89F9|689BFA|7FAAFB|7FAAFB|7FAAFB|95B8FB|95B8FB|95B8FB|C6D9FD|C6D9FD|C6D9FD&chds=0," + count + "&chxr=1,0," + count + "&chxt=x,y&chl=" + labels;
	};

	this.getTimePeriod = function() {
		return $('#timePeriod option:selected').val();
	};

	this.getSelectedPeriod = function() {
		var timePeriod = _this.getTimePeriod();
		if (timePeriod === "hour") {
			return $('#hourSelect option:selected').val();
		}
		if (timePeriod === "day") {
			return $('#dateSelect option:selected').val();
		}
		if (timePeriod === "month") {
			return $('#monthSelect option:selected').val();
		}
		if (timePeriod === "year") {
			return $('#yearSelect option:selected').val();
		}
	};

	this.getSource = function() {
		return $('#calcSourceSelect option:selected').val();
	};
}

Widget_statsAll.prototype = globalProperties.widgetPrototype;