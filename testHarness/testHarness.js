function Widget_testHarness() {

	var _this = this;

	this.initExtend = function() {
		_this.calcserviceEndPoint = _this.$widgetDiv.attr('calcservice-end-point');
	};

	this.onReadyExtend = function() {
		var widgetObject = this;
		$('form', widgetObject.$widgetDiv).submit(function() {
			$.ajax({type:"POST", url:_this.calcserviceEndPoint, dataType:"text", data:$(this).serialize(),
				success:function(xmlString, textStatus, jqXHR) {
					$('#testHarnessResponse', widgetObject.$widgetDiv).val(xmlString);
				},
				error:function(jqXHR, textStatus, error) {
					if (jqXHR.status != 200) {
						alert("Error talking to calcservice.");
					}
				}
			});
			return false;
		});
		$('#retrieveCalcButton', widgetObject.$widgetDiv).click(function() {
			var calcRef = $.trim($('#calcRefInput').val());
			if (calcRef !== '') {
				var url = _this.calcserviceEndPoint + '/' + calcRef;
				$.ajax({type:"GET", url:url, dataType:"text",
					success:function(responseString, textStatus, jqXHR) {
						$('#testHarnessResponse', widgetObject.$widgetDiv).val(responseString);
					},
					error:function(jqXHR, textStatus, error) {
						if (jqXHR.status != 200) {
							alert("Error talking to calcservice.");
						}
					}
				});
			}
		});
	};
}

Widget_testHarness.prototype = globalProperties.widgetPrototype;
