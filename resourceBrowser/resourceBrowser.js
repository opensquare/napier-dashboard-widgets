function Widget_resourceBrowser() {

	this.napierResourceManagerUrl = null;

	this.initExtend = function() {
		this.napierResourceManagerUrl = this.$widgetDiv.attr("napierResourceManagerUrl");
	}

	this.onReadyExtend = function() {
		addListenerToChannel(this, "resourceBrowserRefreshDirectory");
		addListenerToChannel(this, "resourceBrowserViewFile");
	}
	
	this.handleEvent = function(channel, event) {
		if (channel == "resourceBrowserRefreshDirectory") {
			var iframes = $("iframe", this.$widgetDiv);
			if (iframes.size() > 0) {
				if (iframes[0].contentWindow.refreshFileList) {
					iframes[0].contentWindow.refreshFileList();
				}
			}
		} else if (channel = "resourceBrowserViewFile") {
			this.showResource(event.filePath);
		}
	}
	
	this.showResource = function(filePath) {
		var path = "../../proxy/{naper-resource-manager}/resources/" + filePath.replace(/\//g, ";");
		window.open(path, filePath, 'width=800,height=600');
	}
	
}

Widget_resourceBrowser.prototype = globalProperties.widgetPrototype;
