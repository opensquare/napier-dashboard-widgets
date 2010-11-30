function Widget_resourceUpload() {

	this.napierResourceManagerUrl = null;

	this.initExtend = function() {
		this.napierResourceManagerUrl = this.$widgetDiv.attr("napierResourceManagerUrl");
		addListenerToChannelReplayLast(this, "resourceBrowserChangeDirectory");
	}

	this.onReadyExtend = function() {
		var widgetObject = this;
		$("form", this.$widgetDiv).submit(function() {
			var $this = $(this);
			$this.attr("action", widgetObject.napierResourceManagerUrl + "?" + $this.serialize());
		})
		
		$("iframe[name='resultIframe']").load(function() {
			notifyChannelOfEvent("resourceBrowserRefreshDirectory", {});
		})
		
	}
	
	this.handleEvent = function(channel, event) {
		$("[name='resourcePath']", this.$widgetDiv).val(event.path);
	}
	
}

Widget_resourceUpload.prototype = globalProperties.widgetPrototype;
