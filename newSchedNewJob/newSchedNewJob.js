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
					$(form).html("<p class='ui-state-alert'>Scheduled successfully</p>");
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
