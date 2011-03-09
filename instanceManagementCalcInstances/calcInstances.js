function Widget_instanceManagementCalcInstances() {
	
	this.autoScaleInstancesUrl = null;
	this.autoScaleInstancesListUrl = null;
	this.autoScaleInstanceCreateUrl = null;
	this.autoScaleStatsUrl = null;
	this.instancesRegisteredUrl = null;
	
	this.initExtend = function() {
		addListenerToChannel(this, "calcInstancesUpdated");
	}
	
	this.onReadyExtend = function() {
		this.autoScaleInstancesUrl = this.$widgetDiv.attr("autoScaleInstancesUrl");
		this.autoScaleInstancesListUrl = this.$widgetDiv.attr("autoScaleInstancesListUrl");
		this.autoScaleInstanceCreateUrl = this.$widgetDiv.attr("autoScaleInstanceCreateUrl");
		this.autoScaleStatsUrl = this.$widgetDiv.attr("autoScaleStatsUrl");
		this.instancesRegisteredUrl = this.$widgetDiv.attr("instancesRegisteredUrl");
		
		var widgetObject = this;
		$.ajax({
			url: widgetObject.autoScaleInstancesListUrl,
			dataType: json,
			success: function(data) {
				for(i in data){
					data[i].autoScaleInstancesUrl = widgetObject.autoScaleInstancesUrl;				
				}
				$("tr.instanceRow", widgetObject.$widgetDiv).after($("tr.instanceRow", $("table.instancesTable", widgetObject.$widgetDiv).tmpl(data)));
				$("tr.instanceRow:first", widgetObject.$widgetDiv).remove();
				$("tr.instanceRow", widgetObject.$widgetDiv).show();
				widgetObject.checkRegisteredInstances();
				widgetObject.setCpu();
			}
		});
		
		$(".newInstanceButton", widgetObject.$widgetDiv).click(function(){
			var url = widgetObject.autoScaleInstanceCreateUrl;
			widgetObject.ajaxGetThenNotify(url);
		});
		
	}
	
	this.handleEvent = function(channel, event) {
		if(channel == "calcInstancesUpdated"){
			this.refresh();
		}
	}
	
	this.checkRegisteredInstances = function(){
		var thisWidget = this;
		var instances = [];
		var rows = {};
		$(".instanceRow", this.$widgetDiv).each(function(){
			var privateIP = $(this).attr("privateIP");
			instances.push(privateIP);
			rows[privateIP] = this;
			
			// handle register/deregister buttons
			$(".registerButton, .deregisterButton, .terminateButton", this).click(function(){
				var url = $(this).attr("url");
				thisWidget.ajaxGetThenNotify(url);
			});
		});
		var successCalled = false;
		$.ajax({
			type: "GET",
			url: this.instancesRegisteredUrl,
			dataType: "text",
			success: function(res) {
				successCalled = true;
				for (i in instances){
					var privateIP = instances[i];
					var row = rows[privateIP];
					if(res.indexOf("http://" + privateIP + ":") > -1){
						$(".registrationSpan", row).html("Registered");
						$(".registerButton", row).css("display", "none");
						$(".deregisterButton", row).css("display", "inline");
						$(".terminateButton", row).css("display", "none");
					}else{
						$(".registrationSpan", row).html("Deregistered");
						$(".registerButton", row).css("display", "inline");
						$(".deregisterButton", row).css("display", "none");
						$(".terminateButton", row).css("display", "inline");
					}
				}
			},
			complete: function(XMLHttpRequest, textStatus) {
				if (!successCalled) {
					$(".instanceRow .registrationSpan", thisWidget.$widgetDiv).html("Deregistered");
					$(".instanceRow .registerButton", thisWidget.$widgetDiv).css("display", "inline");
					$(".instanceRow .deregisterButton", thisWidget.$widgetDiv).css("display", "none");
				}
			}
		});
	}
	
	this.setCpu = function() {
		var widgetObject = this;
		$.ajax({
			url: widgetObject.autoScaleStatsUrl,
			success: function(instancesData) {
				var overallAverage = 0;
				var num = 0;
				$(".instanceRow", widgetObject.$widgetDiv).each(function() {
					var privateIP = $(this).attr("privateIP");
					for each (var instanceData in instancesData) {
						if (instanceData.instance == privateIP) {
							var average = instanceData.averageCpu;
							average = Math.round(average*100)/100
							overallAverage += average;
							num++;
							$(".cpu", this).html(average + "%").css("background-image", "-moz-linear-gradient(left center,lightblue " + average + "%,white " + (average + 20) + "%)");
						}
					}
				});
				if (num > 0) {
					overallAverage = overallAverage / num;
					overallAverage = Math.round(overallAverage*100)/100
				}
				$(".overallAverage", widgetObject.$widgetDiv).html(overallAverage + "%");
			}
		})
	}
	
	this.ajaxGetThenNotify = function(url) {
		$.ajax({
			type: "GET",
			url: url,
			dataType: "text",
			complete: function() {
				notifyChannelOfEvent("calcInstancesUpdated");
			}
		});
	}
	
}

Widget_instanceManagementCalcInstances.prototype = globalProperties.widgetPrototype;