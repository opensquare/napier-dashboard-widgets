
function Widget_schedulerJobs() {

	this.relativeSchedulerUrl = null;
	
	this.initExtend = function() {
		this.relativeSchedulerUrl = getRelativeUrl(this.$widgetDiv.attr("schedulerUrl"));
		addListenerToChannel(this, "schedulerUpdated");
	}
	
	this.onReadyExtend = function() {
	
		var widgetObject = this;
		
		$("[action='scheduleNewJob']", this.$widgetDiv).click(function() {
			notifyChannelOfEvent("scheduleNewJob", true);
			return false;
		});
		
		$("[action='schedulerUploadJob']", this.$widgetDiv).click(function() {
			notifyChannelOfEvent("schedulerUploadJob", true);
			return false;
		});
		
		$("[action='triggerJob']", this.$widgetDiv).click(function() {
			widgetObject.doJob("trigger", this, true);
			return false;
		});
		
		$("[action='pauseJob']", this.$widgetDiv).click(function() {
			widgetObject.doJob("pause", this);
			return false;
		});
		
		$("[action='resumeJob']", this.$widgetDiv).click(function() {
			widgetObject.doJob("resume", this);
			return false;
		});
		
		$("[action='deleteJob']", this.$widgetDiv).click(function() {
			widgetObject.doJob("delete", this, true);
			return false;
		});
		
		$("[action='editJob']", this.$widgetDiv).click(function() {
			notifyChannelOfEvent("schedulerEditJob", {
				jobName: $(this).attr("jobName")
			});
			return false;
		});
		
		$("[action='jobResults']", this.$widgetDiv).click(function() {
			notifyChannelOfEvent("schedulerResults", {
				jobName: $(this).attr("jobName")
			});
			return false;
		});
		
	}
	
	this.doJob = function(action, button, confirmFirst) {
		var jobName = $(button).attr("jobName");
		var url = this.relativeSchedulerUrl + "/REST/jobs/" + jobName + "/" + action;
		if (defined(confirmFirst) && confirmFirst == true) {
			var widgetObject = this;
			confirm("Are you sure you want to " + action + " '" + jobName + "'?", function() {
				widgetObject.ajaxGetThenNotify(url);
			});
		} else {
			this.ajaxGetThenNotify(url);
		}
	}
	
	this.ajaxGetThenNotify = function(url) {
		$.ajax({
			type: "GET",
			url: url,
			dataType: "xml",
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

Widget_schedulerJobs.prototype = globalProperties.widgetPrototype;
