
function Widget_modeSwitcher() {

	this.modeSwitchChannel = null;
	this.useHashUrl;
	this.selectedMode;
	this.skipSettingHashUrl = false;
	
	this.initExtend = function() {
		this.useHashUrl = this.$widgetDiv.attr("useHashUrl") == "true" ? true : false;
		this.modeSwitchChannel = this.$widgetDiv.attr("modeSwitchChannel");
	}
	
	this.onReadyExtend = function() {
		var widgetObject = this;

		setInterval(function() {
			widgetObject.checkAddressChange();
		}, 200);
		
		$("[name='modeSwitch']", this.$widgetDiv).click(function() {
			widgetObject.handleModeSwitch(this.getAttribute("mode"));
		});
		
		// Select the first mode
		var modeButtonToClick;
		if (this.useHashUrl && getHashUrl() != "") {
			var mode = getHashUrl().split("#")[0];
			var match = $("[name='modeSwitch'][mode='" + mode + "']", this.$widgetDiv);
			if (match.length > 0) {
				modeButtonToClick = match[0];
				this.skipSettingHashUrl = true;
			}
		}
		if (!defined(modeButtonToClick)) {
			modeButtonToClick = $("[name='modeSwitch']", this.$widgetDiv)[0];
		}
		$(modeButtonToClick).click();
	}
	
	this.handleModeSwitch = function(event) {
		this.selectedMode = event;
		$("[name='modeSwitch']", this.$widgetDiv).removeClass("selected");
		$("[name='modeSwitch'][mode='" + this.selectedMode + "']", this.$widgetDiv).addClass("selected");
		if (this.useHashUrl) {
			if (!this.skipSettingHashUrl) {
				setHashUrl(this.selectedMode);
			} else {
				this.skipSettingHashUrl = false;
			}
		}
		notifyChannelOfEvent(this.modeSwitchChannel, this.selectedMode);
	}
	
	this.checkAddressChange = function() {
		var hashUrl = getHashUrl();
		if (hashUrl != null && hashUrl.length > 1 && this.selectedMode != hashUrl) {
			this.handleModeSwitch(hashUrl);
		}
	}
}

Widget_modeSwitcher.prototype = globalProperties.widgetPrototype;
