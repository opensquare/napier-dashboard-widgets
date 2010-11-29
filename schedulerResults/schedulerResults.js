
function Widget_schedulerResults() {

	this.initExtend = function() {
		addListenerToChannel(this, "schedulerResults");
	}
	
	this.onReadyExtend = function() {
		var widgetObject = this;
		$("[action='changePage']", this.$widgetObject).click(function() {
			widgetObject.parameterMap.offset = $(this).attr("page");
			widgetObject.loadHTML();
			return false;
		});
	}
	
	this.handleEvent = function(channel, event) {
		this.parameterMap.query =  "job_name='" + event.jobName + "'"
		this.parameterMap.offset = 0;
		this.parameterMap.limit = 10;
		this.loadHTML();
	}
	
}

Widget_schedulerResults.prototype = globalProperties.widgetPrototype;
