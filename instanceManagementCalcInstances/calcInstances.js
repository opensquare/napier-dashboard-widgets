function Widget_instanceManagementCalcInstances() {
	
	this.initExtend = function() {
		addListenerToChannel(this, "calcInstancesUpdated");
	}
	
	this.onReadyExtend = function() {
		this.checkRegisteredInstances();
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
			$(".registerButton, .deregisterButton", this).click(function(){
				var url = $(this).attr("url");
				thisWidget.ajaxGetThenNotify(url);
			});
		});
		$.ajax({
			type: "GET",
			url: "http://ec2-75-101-194-8.compute-1.amazonaws.com:8080/loadbalancer/instances",
			dataType: "text",
			success: function(res) {
				for (i in instances){
					var privateIP = instances[i];
					var row = rows[privateIP];
					if(res.indexOf(privateIP) > -1){
						$(".registrationSpan", row).html("Registered");
						$(".registerButton", row).css("display", "none");
						$(".deregisterButton", row).css("display", "inline");
					}else{
						$(".registrationSpan", row).html("Deregistered");
						$(".registerButton", row).css("display", "inline");
						$(".deregisterButton", row).css("display", "none");
					}
				}
			}
		});
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