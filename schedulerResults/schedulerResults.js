
function Widget_schedulerResults() {

	this.initExtend = function() {
		addListenerToChannel(this, "schedulerResults");
	}
	
	this.onReadyExtend = function() {
		var widgetObject = this;
		
		$(".urlDecode", this.$widgetObject).each(function() {
			$this = $(this);
			$this.html(widgetObject._utf8_decode(unescape($this.html().replace(/\+/g, " "))));
		})
		
		$("[action='changePage']", this.$widgetObject).click(function() {
			widgetObject.parameterMap.offset = $(this).attr("page");
			widgetObject.loadHTML();
			return false;
		});
		$("[action='viewLog']", this.$widgetObject).click(function() {
			var $viewLogLink = $(this);
			notifyChannelOfEvent("schedulerJobLog", {
				jobName: $viewLogLink.attr("jobName"), 
				fireTime: $viewLogLink.attr("fireTime"), 
				fireTimeNice: $viewLogLink.attr("fireTimeNice"),
				type: $viewLogLink.attr("type")
				});
			return false;
		});
	}
	
	this.handleEvent = function(channel, event) {
		this.parameterMap.query =  "job_name='" + event.jobName + "'"
		this.parameterMap.offset = 0;
		this.parameterMap.limit = 10;
		this.loadHTML();
	}
	
	this._utf8_decode = function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
 
		return string;
	}

	
}

Widget_schedulerResults.prototype = globalProperties.widgetPrototype;
