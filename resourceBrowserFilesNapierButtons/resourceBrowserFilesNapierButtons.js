function Widget_resourceBrowserFilesNapierButtons() {

	this.onReadyExtend = function() {
		var widgetObject = this;
		
		var parentForm = this.$widgetDiv.parents("form")[0];
		
		$("input.basis", this.$widgetDiv).change(function() {
			var transformerChainVal = "";
			if($(this).prop("checked")) {
				transformerChainVal = "xslt(xslt=Products/model2request.xsl&filenamePrefix=_&filenameExtension=xsl)";
			}
			$("[name='transformerChain']", parentForm).val(transformerChainVal);
		});
		
	}

}

Widget_resourceBrowserFilesNapierButtons.prototype = globalProperties.widgetPrototype;
