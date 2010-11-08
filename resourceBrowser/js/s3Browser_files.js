function selectFile(filePath){
	document.getElementById("selectedFile").value=filePath;
	var fileDiv = document.getElementById("files");
	var files = fileDiv.getElementsByTagName("a");
	for(i=0;i<files.length;i++){
		var file = files[i];
		if(file.getAttribute("filePath")==filePath){
			file.className = file.className.replace(" selected", "");
			file.className = file.className + " selected";
		}else{
			file.className = file.className.replace(" selected", "");
		}
	}
}

function prepareFileMenus(){
	// Show menu when a file item is right clicked
	$("#files A:not(.archive)").contextMenu({
		menu: 'fileMenu'
	}, function(action, el, pos) {
		var itemName = $(el).attr("itemName");
		var filePath = $(el).attr("filePath");
		var keywords = $(el).attr("keywords");
		selectFile(filePath);
		
		switch (action) {
		    case "view":
			{
			    parent.viewFile(filePath);
			    break;
			}
		    case "history":
		        {
		            parent.viewHistory(filePath);
		            break;
			}
		    case "rename":
			{
			    parent.renameFile(itemName, filePath);
			    break;
			}

		    case "delete":
			{
			    parent.deleteFile(itemName, filePath);
			    break;
			}
        	}
	});
	
	// Assign double clicks
	$("#files A").bind("dblclick", function(el){
	      	//var filePath = $(el).attr("filePath");
		//selectFile(filePath);
		parent.viewFile();
	    });
}