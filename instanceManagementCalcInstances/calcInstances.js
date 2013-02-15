function Widget_instanceManagementCalcInstances() {
	
	this.autoScaleInstancesUrl = null;
	this.autoScaleInstanceCreateUrl = null;
	this.autoScaleStatsUrl = null;
	this.instancesRegisteredUrl = null;
	
	this.initExtend = function() {
		addListenerToChannel(this, "calcInstancesUpdated");
	}
	
	this.onReadyExtend = function() {
		this.autoScaleUrl = this.$widgetDiv.attr("autoScaleUrl");
		this.autoScaleInstancesUrl = this.$widgetDiv.attr("autoScaleInstancesUrl");
		this.autoScaleInstanceCreateUrl = this.$widgetDiv.attr("autoScaleInstanceCreateUrl");
		this.autoScaleInstanceTerminateUrl = this.$widgetDiv.attr("autoScaleInstanceTerminateUrl");
		this.autoScaleStatsUrl = this.$widgetDiv.attr("autoScaleStatsUrl");
		this.instancesRegisteredUrl = this.$widgetDiv.attr("instancesRegisteredUrl");
		this.instanceHostnameMask = this.$widgetDiv.attr("instanceHostnameMask");
		
		var widgetObject = this;
		
		var $head = $(".widget-head", this.$widgetDiv);
		$(".widget-title", $head).remove();
		$head.attr("class", "").show();
		
		$.ajax({
			url: widgetObject.autoScaleInstancesUrl,
			dataType: "json",
			success: function(dataLoaded) {
				var data = new Array();
				var instanceHostnamePattern = new RegExp(widgetObject.instanceHostnameMask.replace(/\*/g, ".*"), "gi");

				dataLoaded.forEach(function(instanceData) {
					if (instanceHostnamePattern.test(instanceData.name)) {
						instanceData.autoScaleInstancesUrl = widgetObject.autoScaleInstancesUrl;
						data.push(instanceData);
					}
				});
				$("tr.instanceRow", widgetObject.$widgetDiv).after($("tr.instanceRow", $("table.instancesTable", widgetObject.$widgetDiv).tmpl(data)));
				$("tr.instanceRow:first", widgetObject.$widgetDiv).remove();
				$("tr.instanceRow", widgetObject.$widgetDiv).show();
				widgetObject.checkRegisteredInstances();
				widgetObject.setCpu();
			}
		});
		
		$(".newInstanceButton", widgetObject.$widgetDiv).click(function(){
			var instanceSize = $("#instanceSize").val();
			var instanceLoc = $("#instanceLocation").val();
			var url = widgetObject.autoScaleInstanceCreateUrl + "&instanceType=" + instanceSize;
			confirm("Are you sure you want to start a new " + instanceSize + " instance in " + instanceLoc + "?", function() {
				widgetObject.ajaxGetThenNotify(url);
			});
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
			var privateIP = $(this).attr("privateip");
			instances.push(privateIP);
			rows[privateIP] = this;
			
			// handle register/deregister buttons
			$(".registerButton, .deregisterButton", this).click(function(){
				var url = $(this).attr("url");
				thisWidget.ajaxGetThenNotify(url);
			});
			$(".terminateButton", this).click(function(){
				var id = $(this).attr("id");
				var url = thisWidget.autoScaleInstanceTerminateUrl.replace(/{instanceId}/g, id);
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
				instances.forEach(function(instance) {
					var row = rows[instance];
					if(res.indexOf("http://" + instance + ":") > -1){
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
				});
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
					var currRow = this;
					instancesData.forEach(function(instanceData){
						if (instanceData.instance == privateIP) {
							var average = instanceData.averageCpu;
							average = Math.round(average*100)/100
							overallAverage += average;
							num++;
							$(".cpu", currRow).html(average + "%").css("background-image", "-moz-linear-gradient(left center,lightblue " + average + "%,white " + (average + 20) + "%)");
						}
					});
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
