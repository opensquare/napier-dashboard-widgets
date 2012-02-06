function Widget_footer() {

	this.onReadyExtend = function() {
		var widgetObject = this;

		$('#clickMe', widgetObject.$widgetDiv).live("click", function() {
			$("#info", this.$widgetDiv).toggle();
		});

		$('#closePopup', widgetObject.$widgetDiv).live("click", function() {
			$("#info", this.$widgetDiv).toggle();
		});
	}
}

Widget_footer.prototype = globalProperties.widgetPrototype;
