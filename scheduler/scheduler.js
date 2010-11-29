function scheduler_initialise(thisWidget){

	thisWidget.schedulerUpdated = function(){
		thisWidget.refresh();
	};

	thisWidget.resumeJob = function(jobName){
		var url = getSchedulerUrl() + "/REST/jobs/" + jobName + "/resume";
		url = getRelativeUrl(url);
		$.ajax({
			type: "GET",
			url: url,
			success: function(){issueUpdate('schedulerUpdated');}
		});
	};

	thisWidget.triggerJob = function(jobName){
		var url = getSchedulerUrl() + "/REST/jobs/" + jobName + "/trigger";
		url = getRelativeUrl(url);
		confirm("Are you sure you want to trigger " + jobName, function(){
			$.ajax({
				type: "GET",
				url: url,
				success: function(){issueUpdate('schedulerUpdated');}
			});
		});
	};

	thisWidget.deleteJob = function(jobName){
		var url = getSchedulerUrl() + "/REST/jobs/" + jobName + "/delete";
		url = getRelativeUrl(url);
		confirm("Are you sure you want to delete " + jobName, function(){
			$.ajax({
				type: "GET",
				url: url,
				success: function(){issueUpdate('schedulerUpdated');}
			});
		});
	};
}

function uploadSchedulerJobFiles(form){
	var actionUrl = globalProperties.schedulerUrl + "/uploadScript";
	actionUrl = getRelativeUrl(actionUrl);
	$(form).attr("action", actionUrl);
	return ajaxSubmitForm(form, function(form, responseDoc){
		var success = responseDoc.getElementsByTagName("success")[0].childNodes[0].nodeValue;
		if(success=="true"){
			$(form).html("<p class='ui-state-alert'>Uploaded successfully</p>");
		}else{
			var error = responseDoc.getElementsByTagName("error")[0].childNodes[0].nodeValue;
			$(form).before("<p class='ui-state-alert'>File could not be uploaded: " + error + "</p>")
		}
	});
}

function schedulerResults_initialise(thisWidget){
	thisWidget.schedulerResultsRequested = function(query, limit, offset){
		var params = "";
		if(query!=null){
			params = "query=" + query;
		}
		if(limit!=null){
			if(params!=""){params = params + "&";}
			params = params + "limit=" + limit;
		}
		if(offset!=null){
			if(params!=""){params = params + "&";}
			params = params + "offset=" + offset;
		}
		thisWidget.loadHTMLWithParams(params);
	};
}