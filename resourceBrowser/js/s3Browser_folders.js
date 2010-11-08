function prepareFolderMenus(){
	// Show menu when a file item is clicked
	$("#folders A").contextMenu({
		menu: 'folderMenu'
	}, function(action, el, pos) {
		var dirPath = $(el).attr("dirPath");
		switch (action) {
		    case "rename":
			{
			    parent.renameDirectory(dirPath);
			    break;
			}

		    case "delete":
			{
			    parent.deleteDirectory(dirPath);
			    break;
			}
		     case "create":
			{
			    parent.createDirectory(dirPath);
			    break;
			}
		    case "clone":
		    {
		    	parent.cloneDirectory(dirPath);
		    }
        	}
	});
}