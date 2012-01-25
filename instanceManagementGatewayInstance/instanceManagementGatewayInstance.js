function Widget_instanceManagementGatewayInstance() {
	
	this.onReadyExtend = function() {
		this.loadbalancerUrl = this.$widgetDiv.attr("loadbalancerUrl");
		$(".loadbalancerUrl", this.$widgetDiv).html(this.loadbalancerUrl);
	}
}

Widget_instanceManagementGatewayInstance.prototype = globalProperties.widgetPrototype;
