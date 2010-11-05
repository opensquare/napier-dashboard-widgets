
function Widget_modeSwitched(){
	
	this.modeSwitchChannel = null;
	this.selectedMode = null;
	
	this.initExtend = function() {
		this.modeSwitchChannel = this.$widgetDiv.attr("modeSwitchChannel");
	}
	
	this.onReadyExtend = function() {
		addListenerToChannel(this, this.modeSwitchChannel);
		this.handleModeSwitch(readLastEventFromChannel(this.modeSwitchChannel, this));
	}
	
	this.handleEvent = function(channel, event) {
		this.handleModeSwitch(event);
	}
	
	this.handleModeSwitch = function(event) {
		this.selectedMode = event;
		$(this.$widgetDiv.children(".widget-content")).children().hide();
		if (this.selectedMode != null) {
			$("[name='mode-" + this.selectedMode + "']", this.$widgetDiv).show();
		}
	}
}

Widget_modeSwitched.prototype = globalProperties.widgetPrototype;