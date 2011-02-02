
function Widget_schedulerJobLog() {

	this.initExtend = function() {
		this.logLimitedUrl = this.$widgetDiv.attr("logLimitedUrl");
		this.logFileUrl = this.$widgetDiv.attr("logFileUrl");
		
		this.outputLimitedUrl = this.$widgetDiv.attr("outputLimitedUrl");
		this.outputFileUrl = this.$widgetDiv.attr("outputFileUrl");
		
		addListenerToChannel(this, "schedulerJobLog");
	}
	
	this.handleEvent = function(channel, event) {
		var limitedUrl;
		var fileUrl;
		var title;
		if (event.type == "output") {
			limitedUrl = this.outputLimitedUrl;
			fileUrl = this.outputFileUrl;
			title = "Output"
		} else {
			limitedUrl = this.logLimitedUrl;
			fileUrl = this.logFileUrl;
			title = "Report"
		}
		limitedUrl = this.replaceUrl(limitedUrl, event);
		fileUrl = this.replaceUrl(fileUrl, event);
		
		this.setTitle(title + " - Loading...");
		$(".custom-actions", this.$widgetDiv).html("<a href=\"" + fileUrl + "\" target=\"_blank\">Download File</a>");
		
		var widgetObject = this;
		$.ajax({
			url: limitedUrl,
			success: function(data) {
				$(".log", widgetObject.$widgetDiv).html($("<div/>").text(data).html().replace(/\n/g, "<br/>"));
				widgetObject.setTitle(title + " - " + event.jobName + " " + event.fireTimeNice + " (Limited)");
			}
		});
	}
	
	this.replaceUrl = function(url, event) {
		return url.replace("{jobName}", event.jobName).replace("{fireTime}", event.fireTime)
	}
	
}

Widget_schedulerJobLog.prototype = globalProperties.widgetPrototype;
