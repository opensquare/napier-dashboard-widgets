
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
	
}

Widget_schedulerUploadJob.prototype = globalProperties.widgetPrototype;
