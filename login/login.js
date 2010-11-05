function Widget_login() {
	
	this.onReadyExtend = function() {
		var widgetObject = this;
		
		$("form", this.$widgetDiv).submit(function() {
			var $loginFormJQ = $(this);
			widgetObject.clearErrors();
			
			$.ajax( {
				type: "POST",
				url: "login",
				data: $loginFormJQ.serialize(),
				dataType: "json",
				
				success: function(data){
					var $parents = $loginFormJQ.parents(".widget");
					var $layoutWidget = $($parents[$parents.length - 1]);
					$layoutWidget.removeAttr("id");
		    		$layoutWidget.attr("name", data.nextWidget);
					$layoutWidget.empty();
		    		setLayout();
		    		initialize(true);
				},
				
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					httpStatus = XMLHttpRequest.status;
					switch(httpStatus) {
						case 401:
							widgetObject.addError("Invalid username or password. Please try again.");
						break;
						default:
							widgetObject.addError("Problem while loading.");
					}
				}
			});
		
		    return false; // stops the form submitting in the normal way
		});
		$("input[name='username']", this.$widgetDiv).focus();
	}
	
}

Widget_login.prototype = globalProperties.widgetPrototype;
