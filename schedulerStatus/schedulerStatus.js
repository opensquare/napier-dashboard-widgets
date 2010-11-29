
function Widget_schedulerStatus() {

	this.schedulerUrl = null;
	
	this.initExtend = function() {
		this.schedulerUrl = this.$widgetDiv.attr("schedulerUrl");
		addListenerToChannel(this, "schedulerUpdated");
	}
	
	this.onReadyExtend = function() {
		var widgetObject = this;
		
		$("[action='start']", this.$widgetDiv).click(function() {
			var url = widgetObject.schedulerUrl + "/REST/manager/start";
			widgetObject.callRestFunction(url);
			return false;
		});
		
		$("[action='stop']", this.$widgetDiv).click(function() {
			var url = widgetObject.schedulerUrl + "/REST/manager/stop";
			widgetObject.callRestFunction(url);
			return false;
		});
	}
	
	this.callRestFunction = function(url) {
		url = getRelativeUrl(url);
		$.ajax({
			type: "GET",
			url: url,
			dataType: "text",
			success: function() {
				notifyChannelOfEvent("schedulerUpdated");
			}
		});
	}
	
	this.handleEvent = function(channel, event) {
		if(channel == "schedulerUpdated"){
			this.refresh();
		}
	}
	
}

Widget_schedulerStatus.prototype = globalProperties.widgetPrototype;
