function Widget_resourceUpload() {

	this.initExtend = function() {
		addListenerToChannelReplayLast(this, "resourceBrowserChangeDirectory");
	}

	this.onReadyExtend = function() {
		$("form", this.$widgetDiv).submit(function() {
			var $this = $(this);
			$this.attr("action", $this.attr("to") + "?" + $this.serialize());
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
