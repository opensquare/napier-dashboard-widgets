function Widget_resourceBrowserFilesNapierButtons() {

    this.initExtend = function(){
        var iframe = this.$widgetDiv.parents(".widget").find("iframe")[0];
        $(iframe).load(function(e){
            var $releaseInput = $("input.release", this.$widgetDiv);
            if($releaseInput.prop("checked")){
                $.ajax({
                    url : "proxy/loadbalancer/instances/all/REST/action/clearCache",
                    type : "GET",
                    error : function() {
                        alert("Failed to deploy to calcservice instances");
                    }
                });
            }
        });
    }

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
