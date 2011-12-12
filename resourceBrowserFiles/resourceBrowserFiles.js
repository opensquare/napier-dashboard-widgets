function Widget_resourceBrowserFiles() {

	this.tableSorterCreated = false;
	this.loadMetadata = false;
	this.bucket = null;
	this.path = null;
	this.showHiddenFiles = null;
	this.binaryExtensionsArray = null;
	this.rightArrow = "<img src='widgets/resourceBrowserFiles/images/arrow-right.png' alt='+'>";
	this.downArrow = "<img src='widgets/resourceBrowserFiles/images/arrow-down.png' alt='-'/>";

	this.initExtend = function() {
		this.resourceManagerUrl = this.$widgetDiv.attr("resourceManagerUrl");
		this.showHiddenFiles = "true" == this.$widgetDiv.attr("showHiddenFiles");
		this.filesChannel = this.$widgetDiv.attr("filesChannel");
		attachCSS("js/tablestorter-css/black/style.css");
		addListenerToChannel(this, this.filesChannel);
	}

	this.onReadyExtend = function() {
		var widgetObject = this;
		
		$(".view", widgetObject.$widgetDiv).hide();
		$("div.versions", widgetObject.$widgetDiv).hide();
		this.recreateDivHtml = $("div.recreate", this.$widgetDiv).html();

		if(this.loadMetadata == true) {
			$("input[name='loadMetadata']", this.$widgetDiv).click();
		}
		$("input[name='loadMetadata']", this.$widgetDiv).change(function() {
			widgetObject.loadMetadata = !widgetObject.loadMetadata;
			widgetObject.loadFiles();
		});

		$("tr[type='text'] [action='view']", this.$widgetDiv).live("click", function() {
			var name = $(this).attr("name");
			var fileKey = $(this).attr("key");
			var path = widgetObject.getFilePath(fileKey);

			$(".view", widgetObject.$widgetDiv).hide();
			$("h3", widgetObject.$widgetDiv).html(name);
			$.ajax({
				url : path,
				dataType : "text",
				success : function(data) {
					widgetObject.$fileContents.val(data);
					widgetObject.$fileContentsPath.val(widgetObject.path + name);
					widgetObject.$contentsForm.show();
				}
			})
			return false;
		});
		// Show hidden versions if user clicks expand.
		$(".versionExp", this.$widgetDiv).live("click", function() {
			widgetObject.expandVersions(this);
		});
		// Display the Download/Delete dropdown
		$("td.actions", this.$widgetDiv).live("click", function() {
			var currStyle = $(this).find("div").attr("style");
			$(this).find("div").toggle();
			// If the dropdown has just been displayed then set it to wait 2 seconds before fading out.
			if(currStyle.indexOf("none") > 0) {
				$(this).find("div").delay(2000).fadeOut(1000);
			}
		});

		$("tr[type='image'] [action='view']", this.$widgetDiv).live("click", function() {
			widgetObject.$contentsForm.hide();
			$("h3", widgetObject.$widgetDiv).html($(this).attr("name"));
			var fileKey = $(this).attr("key");
			$(widgetObject.$viewImageDiv).find("img").attr("src", widgetObject.getFilePath(fileKey));
			widgetObject.$viewImageDiv.show();
			return false;
		});
		
		$("tr[type='binary'] [action='view']", this.$widgetDiv).live("click", function() {
			return false;
		});

		$("a[action='delete']", this.$widgetDiv).live("click", function() {
			var path = widgetObject.getFilePath($(this).attr("key"));
			var pos = path.lastIndexOf("/");
			var filename = path.substring(pos + 1, path.length);
			path = path.substring(0, pos);
			confirm("Are you sure you want to delete " + filename + "?", function() {
				widgetObject.deleteFile(path);
			});
			return false;
		});

		$("input[name='file']", this.$widgetDiv).live("change", function() {
			var filename = $(this).val();

			// Is this a chrome thing? It prefixes the path with c:\fakepath\
			var pos = filename.lastIndexOf("\\");
			if(pos > 0) {
				filename = filename.substring(pos + 1);
			}
			var $filenameBox = $("input[name='filename']", widgetObject.$widgetDiv);
			var filenameValue = $filenameBox.val();

			// .contains is not javascript
			if(filenameValue == "") {
				$filenameBox.val(filename);
			}
			return false;
		});

		$("[action='toggleAdvancedOptions']", this.$widgetDiv).live("click", function() {
			$(".advancedOptions", widgetObject.$widgetDiv).toggleClass('hidden');
			return false;
		});

		$("[name='resourceBrowserFiles-uploadIframe']", this.$widgetDiv).load(function() {
			replayLastChannelEvent(widgetObject, widgetObject.filesChannel);
			$("#busySpinner", this.$widgetDiv).hide();
			$("form :file, form :text", this.$widgetDiv).val("");
			$("form :input[name='effectiveDate']", this.$widgetDiv).val("now");
		});
		replayLastChannelEvent(this, this.filesChannel);
	}

	this.handleEvent = function(channel, event) {
		if (true == event.blank) {
			this.clearFiles();
		} else {
			this.bucket = event.bucket;
			this.path = event.path;
			this.relativePath = event.relativePath;
			this.loadFiles();
		}
	}

	this.clearFiles = function() {
		$("div.recreate", this.$widgetDiv).html("");
	}

	this.loadFiles = function() {
		$("div.recreate", this.$widgetDiv).html(this.recreateDivHtml);
		if(this.loadMetadata == false) {
			$(".metadata", this.$widgetDiv).remove();
		}

		this.$resourcesTable = $("table.resources", this.$widgetDiv);
		this.$resourcesBody = $("tbody", this.$resourcesTable);
		this.$resourcesRowTemplate = $.template(this.$resourcesBody.html());
		this.$resourcesBody.html("");

		this.$versionsDiv = $("div.versions", this.$widgetDiv);
		this.$versionsDivHtml = this.$versionsDiv.html();

		this.$viewIframe = $("[name='viewIframe']", this.$widgetDiv);
		this.$contentsForm = $("[name='contentsForm']", this.$widgetDiv);
		this.$fileContents = $("[name='fileContents']", this.$widgetDiv);
		this.$fileContentsPath = $("form[name='contentsForm'] [name='path']", this.$widgetDiv);
		this.$viewImageDiv = $("[name='viewImageDiv']", this.$widgetDiv);
		$("[name='path']", this.$widgetDiv).val(this.path);
		$(".folderName", this.$widgetDiv).html(this.relativePath);
		var widgetObject = this;
		$("form[name='uploadForm']", this.$widgetDiv).submit(function() {
			var $this = $(this);
			var uploadPath = $("[name='path']", $this).val();
			var uploadFilename = $("[name='filename']", $this).val();
			var file = $("[name='file']", $this).val();
			if(file.length != 0) {
				if(uploadFilename.indexOf(".") != -1) {
					var action = widgetObject.resourceManagerUrl + "/files/" + widgetObject.bucket + "/" + uploadPath + uploadFilename;
					$this.attr("action", action);
					$("#busySpinner", this.$widgetDiv).show();
				} else {
					alert("'New Filename' is required and should include the file extension.");
					return false;
				}
			} else {
				alert("'File' is required.");
				return false;
			}
		});

		$("form[name='contentsForm']", this.$widgetDiv).submit(function() {
			var $this = $(this);
			var uploadPath = $("[name='path']", $this).val();
			var action = widgetObject.resourceManagerUrl + "/files/" + widgetObject.bucket + "/" + uploadPath;
			$this.attr("action", action);
			$("#busySpinner", this.$widgetDiv).show();
		});

		this.loadFileList(this.bucket, this.path);
	}

	this.deleteFile = function(path) {

		var widgetObject = this;
		
		$.ajax({
			url : path,
			type : "DELETE",
			beforeSend : function() {
				$("#busySpinner", widgetObject.$widgetDiv).show();
			},
			success : function() {
				$("#busySpinner", widgetObject.$widgetDiv).hide();
				widgetObject.loadFiles();
			},
			error : function() {
				$("#busySpinner", widgetObject.$widgetDiv).hide();
				alert("Failed to delete file.");
			}
		});
	}

	this.loadFileList = function(bucket, path) {
		var widgetObject = this;
		widgetObject.bucket = bucket;

		var requestData = { };

		if(this.loadMetadata) {
			requestData.metadata = true;
		}

		$.ajax({
			url : widgetObject.resourceManagerUrl + "/files/" + bucket + "/" + path,
			data : requestData,
			success : function(data, textStatus, jqXHR) {
				var now = new Date(Date.parse(jqXHR.getResponseHeader("Date")));
				data.forEach(function(file) {
					//Chrome does not handle "for each(xxx)"
					//for each(var file in data) {
					var best = null;
					var futureEffectiveDates = "";
					var versionsArray = file[1];
					var multiVersions;
					if(versionsArray.length > 1) {
						multiVersions = true;
					}

					var count = versionsArray.length - 1;
					var version = versionsArray[count];

					//Exclude deleted files. Note that you cannot delete a specific version of a file -
					// if you delete any version then the file is considered to be deleted.
					if(!defined(version.postfix) | (defined(version.postfix) && version.postfix != "deleted") && (widgetObject.showHiddenFiles == true || version.name.indexOf("_") != 0)) {
						count = 0;
						//Chrome does not handle "for each(xxx)"
						//for (var version in versionsArray) {
						versionsArray.forEach(function(version) {
							count++;

							version.jsEffectiveDate = new Date(version.effectiveDate);
							version.href = widgetObject.resourceManagerUrl + "/files/" + bucket + "/" + version.key + "/" + version.name;
							if(version.jsEffectiveDate <= now) {
								best = version;
							} else {
								futureEffectiveDates += version.effectiveDate + ", ";
							}
							
							if (best != null) {
								if(defined(version.metadataMap)) {
									version.metadataMap.forEach(function(metaEntry) {
										//for (var metaEntry in version.metadataMap) {
										version["metadata_" + metaEntry[0]] = metaEntry[1];
									});
								}
	
								version["showHide"] = "show";
								if(multiVersions) {
									if(count == versionsArray.length) {
										version["showHideProfile"] = version.name + "currentVersion";
										version["versionInd"] = "+";
									} else {
										version["showHideProfile"] = version.name + "oldVersion";
										version["showHide"] = "hide";
										//version["rowClass"] = "nonAltern";
									}
								}
	
								if(futureEffectiveDates.length > 0) {
									version.futureEffectiveDates = futureEffectiveDates.substring(0, futureEffectiveDates.length - 2);
								}
								version.versions = versionsArray.length;
								version.type = widgetObject.fileTypeFromName(best.name);
								$.tmpl(widgetObject.$resourcesRowTemplate, version).appendTo(widgetObject.$resourcesBody).data("versionsArray", versionsArray).show();
								$("[action='download']", widgetObject.$resourcesBody).each(function() {
									var $this = $(this);
									$this.attr("href", $this.attr("link"));
								});
							}
						});
					}
				});
				// If anything in table
				if($("tbody tr", widgetObject.$resourcesTable).size() > 0) {

					// Do not sort on columns 0 & 3
					widgetObject.$resourcesTable.tablesorter({
						headers : {
							0 : {
								sorter : false
							},
							3 : {
								sorter : false
							}
						}
					});

					// Trigger a sort
					widgetObject.$resourcesTable.trigger("sorton", [[[1, 0]]]);

				}

				// Replace the "+" link with an image
				$("td a.versionExp:contains('+')", widgetObject.$widgetDiv).replaceWith("<a class='versionExp' href='#' lastAction='hide'>" + widgetObject.rightArrow + "</a>");

				// Hide all file versions.
				$("[showHide='hide']", widgetObject.$widgetDiv).hide();

			}
		});

	}

	this.expandVersions = function(element) {

		var lastAction = $(element).attr("lastAction");
		var name = $(element).closest("tr").attr("name");
		var thisTable = $(element).closest("table");
		if(lastAction == "hide") {
			var cssObj = {
				'font-weight' : 'bold',
				'font-style' : 'italic'
			}

			// Set some css for old versions
			$("[showHideProfile='" + name + "oldVersion']", $(thisTable)).css(cssObj);
			$("[showHideProfile='" + name + "oldVersion']", $(thisTable)).show();
			$(element).attr("lastAction", "show");
			$(element).html(this.downArrow);
		} else {
			$("[showHideProfile='" + name + "oldVersion']", $(thisTable)).hide();
			$(element).attr("lastAction", "hide");
			$(element).html(this.rightArrow);
		}
	}

	this.getFilePath = function(fileKey) {
		return this.resourceManagerUrl + "/files/" + this.bucket + "/" + fileKey
	}
	this.fileTypeFromName = function(filename) {
		if (/.(jpg|jpeg|gif|png|bmp|tiff)$/i.test(filename)) return "image";
		else if (/.(pdf|xls)$/i.test(filename)) return "binary";
		else return "text"
	}
}

Widget_resourceBrowserFiles.prototype = globalProperties.widgetPrototype;
