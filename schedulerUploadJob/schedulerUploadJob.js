
function Widget_schedulerUploadJob() {

	this.dialogue = null;
	
	this.initExtend = function() {
		addListenerToChannel(this, "schedulerUploadJob");
	}
	
	this.onReadyExtend = function() {
		this.dialogue = $(".dialogue", this.$widgetDiv).dialog({
			title: "Upload Scheduler Job",
			autoOpen: false
		});
	}
	
	this.handleEvent = function(channel, event) {
		this.dialogue.dialog("open");
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

Widget_schedulerUploadJob.prototype = globalProperties.widgetPrototype;
