function Widget_resourceBrowserDiff() {

	var copyCount = 0;
	var IPCount = 0;
	var failCount = 0;

	this.initExtend = function() {
		this.resourceManagerUrl = this.$widgetDiv.attr("resourceManagerUrl");
		this.diffChannel = this.$widgetDiv.attr("diffChannel");
		addListenerToChannel(this, this.diffChannel);
		attachCSS("js/tablestorter-css/black/style.css");
	}

	this.onReadyExtend = function() {
		var widgetObject = this;
		$('#copyFiles', widgetObject.$widgetDiv).click(function() {
			widgetObject.copyFiles();
		});
		widgetObject.$widgetDiv.hide();
	}

	this.handleEvent = function(channel, event) {
		
		this.$widgetDiv.show();
		
		// Clear the table
		this.$resourcesTable = $("table.diffTable", this.$widgetDiv);
		this.$resourcesBody = $("tbody", this.$resourcesTable);
		this.$resourcesBody.html("");

		// Clear the message under the table
		$("div.#compMessage", this.$widgetDiv).html("");
		$("div.#counters", this.$widgetDiv).html("");

		var widgetObject = this;
		var targetURL = event.targetURL;
		var sourceURL = event.sourceURL;
		var sourceBucket = event.sourceBucket;
		var messHTML = "<p><b>Source:</b> " + sourceURL + "<br /><b>Target:</b> " + targetURL + "</p>";

		$("div.#compMessage", widgetObject.$widgetDiv).html(messHTML);

		$.ajax({
			url : event.varURL,
			success : function(data) {

				// For each file in the list returned
				data.forEach(function(file) {
					//for (var file in data) {
					var best = null;
					var futureEffectiveDates = "";
					var versionsArray = file[1];
					var fileName = "";

					// For each version of the file returned
					versionsArray.forEach(function(version) {
						//for (var version in versionsArray) {
						var tmpFileName = version.name;
						var effDate = version.effectiveDate;
						var path = version.path;

						// Display the file name on change of file
						if(fileName != tmpFileName) {
							$("table.diffTable", widgetObject.$widgetDiv).append("<tr><td class='tdCheckbox'></td><td>" + path + "<td class='tdName'>" + tmpFileName + "</td><td class='tdEffDate'></td></tr>");
							fileName = tmpFileName;
						}
						// This is for every version of the file
						$("table.diffTable", widgetObject.$widgetDiv).append("<tr><td class='tdCheckbox'><input type='checkbox' name='select' id='selectFile' filename='" + tmpFileName + "' bucket='" + sourceBucket + "' path='" + path + "' effDate='" + effDate + "' targetURL='" + targetURL + "'></td><td class='tdPath'></td><td class='tdName'></td><td class='tdEffDate'>" + effDate + "</td></tr>");
					});
				});
			},
			error : function(data) {
				$("div.#compMessage", widgetObject.$widgetDiv).append("<b>Error comparing the buckets</b>");
			}
		});
	}

	this.copyFiles = function() {

		var widgetObject = this;
		copyCount = 0;
		IPCount = 0;
		failCount = 0;

		// Step through each checked item in the table
		$(":checked", $("#diffTable", widgetObject.$widgetDiv)).each(function() {
			var bucket = $(this).attr("bucket");
			var path = $(this).attr("path");
			var filename = $(this).attr("fileName");
			var effDate = $(this).attr("effDate");
			var targetURL = $(this).attr("targetURL");

			// Add a unique name that can be found later.
			$(this).after("<p name='cp" + filename + effDate + "'>Copying...</p>");

			widgetObject.copySingleFile(bucket, filename, path, effDate, targetURL);
		});
		// Hide every unchecked row.
		$(":checkbox", widgetObject.$widgetDiv).not($(":checked")).closest("tr").hide();

	}

	this.copySingleFile = function(bucket, filename, path, effDate, targetURL) {

		var widgetObject = this;
		// syntax is copy/destination path/filename?source=/source path/filename%effectiveDate=effectiveDate.
		var varURL = widgetObject.resourceManagerUrl + "/copy" + targetURL + filename;
		varURL = varURL + "?source=/" + bucket + "/" + path + filename + "&effectiveDate=" + effDate;
		copyCount++;
		IPCount++;
		widgetObject.showCounters();

		$.ajax({
			url : varURL,

			success : function(data) {

				// Find the unique name and change message to Done
				var selID = "cp" + filename + effDate;
				$('[name*=""' + selID + '""]', widgetObject.$widgetDiv).html("Done");
				IPCount--;
				widgetObject.showCounters();

			},
			error : function(data) {

				// Find the unique name and change message to Failed
				var selID = "cp" + filename + effDate;
				$('[name*=""' + selID + '""]', widgetObject.$widgetDiv).html("Failed");
				failCount++;
				widgetObject.showCounters();
			}
		});

	}
	// Display the counters
	this.showCounters = function() {
		$("div.#counters", this.$widgetDiv).html("<p>Copying: " + copyCount + "<br />In Progress:" + IPCount + " <br /> Failed: " + failCount + "</p>");
	}
}

Widget_resourceBrowserDiff.prototype = globalProperties.widgetPrototype;
