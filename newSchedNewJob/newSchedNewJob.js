function Widget_newSchedNewJob() {

	this.dialogue = null;
	this.schedulerUrl = null;
	
	this.initExtend = function() {
		this.schedulerUrl = this.$widgetDiv.attr("schedulerUrl");
		addListenerToChannel(this, "scheduleNewJob");
	}
	
	this.onReadyExtend = function() {

		var widgetObject = this;
		var $form = $('form', widgetObject.$widgetDiv);
		var url = widgetObject.schedulerUrl + "/REST/jobs";
		$form.submit(function() {
			$.ajax({type:"POST", url:url, dataType:"xml", data:$form.serialize(),
				success:function() {
					var jobName = $("[name='jobName']", $form).val();
					alert(jobName + " scheduled successfully.");
					$('input[type="text"]',$form).val('');
					notifyChannelOfEvent("schedulerUpdated");
				},
				error:function(jqXHR) {
					if (jqXHR.status != 200) {
						alert("Error talking to scheduler.");
					}
				}
			});
			return false;
		});
	}
	
	this.handleEvent = function(channel, event) {
	//	this.dialogue.dialog("open");
	}

}

Widget_newSchedNewJob.prototype = globalProperties.widgetPrototype;
