function Widget_resourceBrowserDirectoryTree() {

	this.selectedNodePath
	this.bucket = null;
	this.path = null;

	this.initExtend = function() {
		this.targetChannel = this.$widgetDiv.attr("targetChannel");
		this.filesChannel = this.targetChannel + "-files";
		this.diffChannel = this.targetChannel + "-diff";
		this.refreshChannel = this.targetChannel + "-refresh";
		this.resourceManagerUrl = this.$widgetDiv.attr("resourceManagerUrl");
		this.resourcesPath = this.$widgetDiv.attr("resourcesPath");
		this.displayBucketForm = "true" == this.$widgetDiv.attr("displayBucketForm");

		this.hideRoot = "true" == this.$widgetDiv.attr("hideRoot");
	}

	this.handleEvent = function(channel, event) {
		this.newTarget(event.bucket, event.path, event.refreshUrl);
	}
	
	this.newTarget = function(bucket, path, refreshUrl) {
		this.bucket = bucket;
		this.path = path;
		$('input[name*="targetBucket"]', this.$widgetDiv).attr("value", this.bucket);
		notifyChannelOfEvent(this.refreshChannel, refreshUrl);
		notifyChannelOfEvent(this.filesChannel, {
			blank: true
		});
		this.loadTree(this.bucket, this.path);
	}

	this.onReadyExtend = function() {
		var widgetObject = this;
		
		this.$tree = $(".tree", this.$widgetDiv);
		this.templateHtml = this.$tree.html();

		if (!this.displayBucketForm) {
			$("form", widgetObject.$widgetDiv).remove();
		}

		$("a.dir", widgetObject.$tree).live("click", function() {
			$("a.dir", widgetObject.$tree).removeClass("active");
			$(this).addClass("active");
			var path = $(this).attr("path");
			widgetObject.selectedNodePath = path;
			notifyChannelOfEvent(widgetObject.filesChannel, {
				bucket : widgetObject.bucket,
				path : path,
				relativePath: path.substr(widgetObject.path.length)
			});
			return false;
		});
		// Register click function for Create Directory button
		$('#createDir', widgetObject.$widgetDiv).click(function() {
			if(defined(widgetObject.selectedNodePath) & widgetObject.selectedNodePath != null) {
				// Get the active directory's parent
				var element = $("a.active", widgetObject.$tree).parent();
				element.path = widgetObject.selectedNodePath;
				widgetObject.createDirectory(element, widgetObject);
			}
		});
		// Register click function for Synchronise Directory button
		$('#syncDir', widgetObject.$widgetDiv).click(function() {
			if(defined(widgetObject.selectedNodePath) & widgetObject.selectedNodePath != null) {
				// Get the active directory's parent
				var element = $("a.active", widgetObject.$tree).parent();
				element.path = widgetObject.selectedNodePath;
				widgetObject.syncDirectory(element, widgetObject);
			}
		});
		// Register click function for Delete Directory button
		$('#delDir', widgetObject.$widgetDiv).click(function() {
			if(defined(widgetObject.selectedNodePath) & widgetObject.selectedNodePath != null) {
				// Get the active directory's parent
				var element = $("a.active", widgetObject.$tree).parent();
				element.path = widgetObject.selectedNodePath;
				confirm("Are you sure you want to delete directory " + element.path + "?", function() {
					// nothing yet
				});
			}
		});

		$("form", this.$widgetDiv).submit(function() {
			notifyChannelOfEvent(widgetObject.targetChannel, {
				bucket : this.targetBucket.value,
				path : widgetObject.path
			});
			return false;
		});
		var hashUrl = getHashUrl();
		if(hashUrl != "") {
			$("input[name='targetBucket']", widgetObject.$widgetDiv).val(hashUrl);
		}
		
		if(this.targetChannel != null) {
			addListenerToChannelReplayLast(this, this.targetChannel);
		} else {
//			alert("ResourceBrowserDirectoryTree: error - no target channel.");
		}
		
		if (this.resourcesPath != null && this.resourcesPath != "") {
			var resourcesPath = this.resourcesPath;
			var bucket = resourcesPath;
			var path = "";
			var slashIndex = resourcesPath.indexOf("/");
			if (slashIndex != -1) {
				bucket = resourcesPath.substr(0, slashIndex);
				path = resourcesPath.substr(slashIndex + 1);
			}
			this.newTarget(bucket, path);
		}
		
	}

	this.loadTree = function(bucket, rootPath) {
		var widgetObject = this;
		widgetObject.selectedNodePath = null;
		widgetObject.bucket = bucket;
		widgetObject.rootPath = rootPath;
		widgetObject.$tree.empty();

		$.ajax({
			url : widgetObject.resourceManagerUrl + "/directory-tree/" + bucket + "/" + rootPath,
			success : function(data) {
				widgetObject.createDirectoryNode(data, widgetObject.$tree, rootPath, widgetObject.templateHtml);
				if(widgetObject.hideRoot) {
					$("a.dir", widgetObject.$tree).first().hide();
				} else {
					$("a.dir", widgetObject.$tree).first().click();
				}
			}
		});
	}

	this.addContextMenu = function($selection) {
		var widgetObject = this;
		$selection.contextMenu('context-menu-1', {
			'Create Directory' : {
				click : function(element) {
					widgetObject.createDirectory(element, widgetObject);
				},
			},
			'Synchronise Directory' : {
				click : function(element) {
					widgetObject.syncDirectory(element, widgetObject);
				},
			}
		}, {
			disable_native_context_menu : false,
		});
	}

	this.diffTwoBuckets = function(targetBucket, targetURL, sourceURL, sourceBucket) {
		var widgetObject = this;
		sourceURL = this.checkSlashes(sourceURL);
		targetURL = this.checkSlashes(targetURL);
		varURL = widgetObject.resourceManagerUrl + "/diff" + targetURL;
		varURL = varURL + "?source=" + sourceURL;

		notifyChannelOfEvent(widgetObject.diffChannel, {
			varURL : varURL,
			targetBucket : targetBucket,
			targetURL : targetURL,
			sourceBucket : sourceBucket,
			sourceURL : sourceURL,
			purpose : widgetObject.purpose
		});
	}

	this.createDirectory = function(element, widgetObject) {
		var name = prompt("New directory name", "");
		if(name.length > 0) {
			var $directoryNode = widgetObject.createDirectoryNode({
				name : name,
				path : $(".dir", element).attr("path") + name + "/"
			}, $(element), widgetObject.rootPath, widgetObject.templateHtml);
			$("a", $directoryNode).last().click();
		}
	}

	this.syncDirectory = function(element, widgetObject) {
		// get the path attribute of the element of type dir. We think the DIV is the
		// current element, not the <a ...> element that is clicked on.
		var targetURL = widgetObject.bucket + "/" + $(".dir", element).attr("path");
		var sourceBucket = prompt("Source bucket", widgetObject.bucket);
		var sourceDir = prompt("Source Directory", "/");
		var sourceURL = sourceBucket + sourceDir;
		sourceURL = widgetObject.checkSlashes(sourceURL);

		if(targetURL.length > 1 && sourceURL.length > 1) {
			widgetObject.diffTwoBuckets(widgetObject.bucket, targetURL, sourceURL, sourceBucket);
		}
	}

	this.checkSlashes = function(checkURL) {
		var len = checkURL.length;
		if(len > 0) {
			len--;
			// Ensure the last character is a /
			if(checkURL.charAt(len) != "/") {
				checkURL = checkURL + "/";
			}

			//Ensure the first char is "/"
			if(checkURL.charAt(0) != "/")
				checkURL = "/" + checkURL;
		}
		return checkURL;
	}

	this.createDirectoryNode = function(directoryObject, $parentNode, rootPath, templateHtml) {
		var widgetObject = this;
		var $directoryNode = $(templateHtml);
		$("a .name", $directoryNode).html(directoryObject.name);
		try {
			$("a", $directoryNode).attr("path", directoryObject.path).show();
		} catch (err) {
			//	alert("Error!");
		}

		$parentNode.append($directoryNode);
		this.addContextMenu($directoryNode);
		var childObject;
		var dirList = directoryObject.subDirectories;
		if(defined(dirList)) {
			dirList.forEach(function(item) {
				widgetObject.createDirectoryNode(item, $directoryNode, rootPath, templateHtml);
			});
		}
		//for (var childObject in directoryObject.subDirectories) {
		//	this.createDirectoryNode(childObject, $directoryNode, rootPath, templateHtml);
		//}
		return $directoryNode;
	}
}

Widget_resourceBrowserDirectoryTree.prototype = globalProperties.widgetPrototype;
