function Widget_testHarness() {

	var _this = this;

	this.initExtend = function() {
		_this.calcserviceEndPoint = _this.$widgetDiv.attr('calcservice-end-point');
	};

	this.onReadyExtend = function() {
		var widgetObject = this;
		$('form', widgetObject.$widgetDiv).submit(function() {
			$.ajax({type:"POST", url:_this.calcserviceEndPoint, dataType:"xml", data:$(this).serialize(),
				success:function(data, textStatus, jqXHR) {
					alert(data);
				},
				error:function(jqXHR, textStatus, error) {
					alert("Error. responseText:" + jqXHR.responseText + ", responseXml:" + jqXHR.responseXML);
				}
			});
			return false;
		});
	};
}

Widget_testHarness.prototype = globalProperties.widgetPrototype;
