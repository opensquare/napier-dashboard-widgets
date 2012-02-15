function Widget_newSchedUploadJob() {

	this.dialogue = null;
	
	this.initExtend = function() {
		this.schedulerUrl = this.$widgetDiv.attr("schedulerUrl");
		addListenerToChannel(this, "schedulerUploadJob");
	}
	
	this.onReadyExtend = function() {

		var widgetObject = this;
		$("form",$(".uploadJob")).attr("action", getRelativeUrl(widgetObject.schedulerUrl + "/REST/jobs"));
		$("form",$(".uploadJob")).submit(function() {
			var form = this;
				return ajaxSubmitForm(form, function(form, responseDoc) {
				var success = responseDoc.getElementsByTagName("success")[0].childNodes[0].nodeValue;
				if (success == "true") {
					$(form).html("<p class='ui-state-alert'>Scheduled successfully</p>");
					notifyChannelOfEvent("schedulerUploadJob");
				} else {
					var error = responseDoc.getElementsByTagName("error")[0].childNodes[0].nodeValue;
					$(form).before("<p class='ui-state-alert'>Job could not be scheduled: " + error + "</p>")
				}
			});
		});
	}
	
	this.handleEvent = function(channel, event) {
	}

	this.uploadSchedulerJobFiles = function(){
		widgetObject = this;
		var actionUrl = widgetObject.schedulerUrl + "/uploadScript";
		actionUrl = getRelativeUrl(actionUrl);
		$(widgetObject).attr("action", actionUrl);
		return ajaxSubmitForm(form, function(form, responseDoc){
			var success = responseDoc.getElementsByTagName("success")[0].childNodes[0].nodeValue;
			if(success=="true"){
				$(form).html("<p class='ui-state-alert'>Uploaded successfully</p>");
			}else{
				var error = responseDoc.getElementsByTagName("error")[0].childNodes[0].nodeValue;
				$(form).before("<p class='ui-state-alert'>File could not be uploaded: " + error + "</p>")
			}
		});
	}
}

Widget_newSchedUploadJob.prototype = globalProperties.widgetPrototype;
