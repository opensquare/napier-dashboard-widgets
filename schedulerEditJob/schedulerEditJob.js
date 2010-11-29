
function Widget_schedulerEditJob() {

	this.initExtend = function() {
		this.schedulerUrl = this.$widgetDiv.attr("schedulerUrl");
		addListenerToChannel(this, "schedulerEditJob");
	}
	
	this.onReadyExtend = function() {
		var actionUrl = this.schedulerUrl + "/REST/jobs";
		actionUrl = getRelativeUrl(actionUrl);
		var form = $("form", this.$widgetDiv);
		$("input[type='submit']", form).click(function(){
			$(form).attr("action", actionUrl);
			return ajaxSubmitForm(form, function(form, responseDoc){
				var success = responseDoc.getElementsByTagName("success")[0].childNodes[0].nodeValue;
				if(success=="true"){
					$(form).html("<p class='ui-state-alert'>Scheduled successfully</p>");
					notifyChannelOfEvent("schedulerUpdated");
				}else{
					var error = responseDoc.getElementsByTagName("error")[0].childNodes[0].nodeValue;
					$(form).before("<p class='ui-state-alert'>Job could not be scheduled: " + error + "</p>")
				}
			
			});
		});
		
		this.dialogue = $(".dialogue", this.$widgetDiv).dialog({
			title: "Edit Scheduler Job",
		});
	}
	
	this.handleEvent = function(channel, event) {
		this.parameterMap.jobName = event.jobName;
		this.loadHTML();
	}
	
}

Widget_schedulerEditJob.prototype = globalProperties.widgetPrototype;
