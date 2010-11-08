function Widget_resourceBrowser() {

	this.initExtend = function() {
		addListenerToChannel(this, "resourceBrowserRefreshDirectory");
	}

	this.handleEvent = function(channel, event) {
		var iframe = $("iframe", this.$widgetDiv);
		if (iframe.size() > 0) {
			if (iframe[0].contentWindow.refreshFileList) {
				iframe[0].contentWindow.refreshFileList();
			}
		}
	}
	
}

Widget_resourceBrowser.prototype = globalProperties.widgetPrototype;
