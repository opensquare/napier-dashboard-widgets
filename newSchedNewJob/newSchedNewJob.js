function Widget_newSchedNewJob() {

	this.dialogue = null;
	this.schedulerUrl = null;
	
	this.initExtend = function() {
		this.schedulerUrl = this.$widgetDiv.attr("schedulerUrl");
		addListenerToChannel(this, "scheduleNewJob");
	}
	
	this.onReadyExtend = function() {

		var widgetObject = this;
		$("form",$(".newJob")).attr("action", getRelativeUrl(widgetObject.schedulerUrl + "/REST/jobs"));
		$("form",$(".newJob")).submit(function() {
			var form = this;
			return ajaxSubmitForm(form, function(form, responseDoc) {
				var success = responseDoc.getElementsByTagName("success")[0].childNodes[0].nodeValue;
				if (success == "true") {
					var jobName = $("[name='jobName']", form).val();
					$(form).before("<p class='ui-state-alert'>" + jobName + " Scheduled successfully</p>");
					$("[name='jobName']", form).val("");
					$("[name='description']", form).val("");
					$("[name='script']", form).val("");
					$("[name='method']", form).val("");
					$("[name='params']", form).val("");
					$("[name='outputDirectory']", form).val("");
					$("[name='startDate']", form).val("");
					$("[name='startTime']", form).val("");
					$("[name='endDate']", form).val("");
					$("[name='endTime']", form).val("");
					$("[name='interval']", form).val("");
					notifyChannelOfEvent("schedulerUpdated");
				} else {
					var error = responseDoc.getElementsByTagName("error")[0].childNodes[0].nodeValue;
					$(form).before("<p class='ui-state-alert'>Job could not be scheduled: " + error + "</p>")
				}
			});
		});
	}
	
	this.handleEvent = function(channel, event) {
	//	this.dialogue.dialog("open");
	}

}

Widget_newSchedNewJob.prototype = globalProperties.widgetPrototype;
