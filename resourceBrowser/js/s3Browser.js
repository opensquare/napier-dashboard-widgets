// Static variables
var page = 1;
var previousTokens = new Array();
var currentToken = null;
var nextToken = null;
var query = "";
var queryType = "";
var comparison = "=";
var sortKey;
var sortOrder;

// Custom variables
var maxItems = 25;
var viewFileUrl = "viewResource.jsp?filePath={filePath}";
var defaultSortKey = "fileName";

function deleteFile(itemName, filePath){
	if(filePath==""){
		alert("You have not selected a file to delete");
		return false;
	}
	var fileName = filePath;
	if(fileName.indexOf("/")>-1){
		fileName = fileName.substring(fileName.lastIndexOf("/")+1);
	}
	var answer = confirm("You are about to delete " + fileName);
	if(answer){
		$.ajax({
			url: "../../resourceManagerAdapter", 
			data: "action=deleteFile&itemName=" + itemName.replace(/\//g, ";") + "&filePath=" + filePath, 
			success: actionResponseRefresh
		});
//		sendRequest("../../resourceManagerAdapter", "action=deleteFile&itemName=" + itemName.replace(/\//g, ";") + "&filePath=" + filePath, actionResponseRefresh);
	}else{
		return false;	
	}
}

function cloneDirectory(dirPath){
	if(dirPath==""){
		alert("You have not selected a directory to rename");
		return false;
	}
	var newDirPath = prompt("Enter a new directory name", dirPath);
	if(newDirPath!=null){
		$.ajax({
			url: "../../resourceManagerAdapter",
			data: "action=cloneDirectory&dirPath=" + dirPath + "&newDirPath=" + newDirPath,
			success: actionResponseReload
		});
//		sendRequest("../../resourceManagerAdapter", "action=cloneDirectory&dirPath=" + dirPath + "&newDirPath=" + newDirPath, actionResponseReload);
	}else{
		return false;	
	}
}

function deleteDirectory(dirPath){
	var dirName = dirPath;
	if(dirName.indexOf("/")>-1){
		dirName = dirName.substring(dirName.lastIndexOf("/")+1);
	}
	var answer = confirm("You are about to delete " + dirName);
	if(answer){
		$.ajax({
			url: "../../resourceManagerAdapter",
			data: "action=deleteDirectory&dirPath=" + dirPath,
			success: actionResponseReload
		});
//		sendRequest("../../resourceManagerAdapter", "action=deleteDirectory&dirPath=" + dirPath, actionResponseReload);
	}else{
		return false;	
	}
}

function renameFile(itemName, filePath){
	//var filePath = document.getElementById("selectedFile").value;
	if(filePath==""){
		alert("You have not selected a file to rename");
		return false;
	}
	var fileName = filePath;
	if(fileName.indexOf("/")>-1){
		fileName = fileName.substring(fileName.lastIndexOf("/")+1);
	}
	var fileDir = filePath.substring(0,filePath.indexOf(fileName));
	var newFileName = prompt("Enter a new file name", fileName);
	if(newFileName!=null){
		$.ajax({
			url: "../../resourceManagerAdapter",
			data: "action=renameFile&itemName=" + itemName.replace(/\//g, ";") + "&newFileName=" + newFileName, 
			success: actionResponseRefresh
		});
//		sendRequest("../../resourceManagerAdapter", "action=renameFile&itemName=" + itemName.replace(/\//g, ";") + "&newFileName=" + newFileName, actionResponseRefresh);
	}else{
		return false;	
	}
}

function renameDirectory(dirPath){
	if(dirPath==""){
		alert("You have not selected a directory to rename");
		return false;
	}
	var dirName = dirPath;
	if(dirName.indexOf("/")){
		dirName = dirName.substring(dirName.lastIndexOf("/")+1);
	}
	var pathToDir = dirPath.substring(0, dirPath.lastIndexOf(dirName));
	var newDirName = prompt("Enter a new directory name", dirName);
	var newDirPath = pathToDir + newDirName;
	if(newDirName!=null){
		$.ajax({
			url: "../../resourceManagerAdapter",
			data: "action=renameDirectory&dirPath=" + dirPath + "&newDirPath=" + newDirPath,
			success: actionResponseReload
		});
//		sendRequest("../../resourceManagerAdapter", "action=renameDirectory&dirPath=" + dirPath + "&newDirPath=" + newDirPath, actionResponseReload);
	}else{
		return false;	
	}
}

function createDirectory(folderPath){
	var folderName = prompt("Enter a name for the new folder", "newfolder");
	if(folderName==null){
		return false;
	}
	var dirPath = folderPath + "/" + folderName;
	$.ajax({
		url: "../../resourceManagerAdapter",
		data: "action=createDirectory&dirPath=" + dirPath,
		success: actionResponseReload
	});
//	sendRequest("../../resourceManagerAdapter", "action=createDirectory&dirPath=" + dirPath, actionResponseReload);
}

function viewFile(filePath){
	if(filePath==null){
		filePath = self.files.document.getElementById("selectedFile").value;
	}
	if(filePath==""){
		alert("You have not selected a file to view");
		return false;
	}
	parent.notifyChannelOfEvent("resourceBrowserViewFile", {filePath: filePath});
}

function viewHistory(filePath){
	if(filePath==null){
		filePath = self.files.document.getElementById("selectedFile").value;
	}
	if(filePath==""){
		alert("You have not selected a file to view");
		return false;
	}
	openPopup("popup.jsp?ref=resourceHistory&resource=" + filePath, 400, 400);
}

function searchByAddress(address){
	if(self.toolbar.document.getElementById("address")!=null){
		self.toolbar.document.getElementById("address").value = address;
	}
	includeArchives = false;
	queryType="address";
	previousToken = new Array();
	page = 1;
	parent.notifyChannelOfEvent("resourceBrowserChangeDirectory", {path: address});
	executeQuery(address, maxItems, null, defaultSortKey, "asc");
}

function getAddress(){
	return self.toolbar.document.getElementById("address").value;
}

function executeQuery(q, mi, nt, sk, so){
	query = q;
	currentToken = nt;
	sortKey = sk;
	sortOrder = so;
	var params = "action=executeQuery&query=" + q + "&maxItems=" + mi;
	if(nt!=null){
		params += "&nextToken=" + nt;
	}
	$.ajax({
		url: "../../resourceManagerAdapter",
		data: params,
		success: populateFileList
	});
//	sendRequest("../../resourceManagerAdapter", params, populateFileList);
}

function actionResponseRefresh(){
	refreshFileList();
}

function refreshFileList(){
	searchByAddress(getAddress());	
}

function actionResponseReload(){
	window.location.reload(true);
}

function populateFileList(data){
	var files = data.getElementsByTagName("resource");
	var archives = false;
	fileDivHTML = "";
	for(i=0;i<files.length;i++){
		try{
			var itemName = "";
			var filePath = files[i].getElementsByTagName("filePath")[0].childNodes[0].nodeValue;
			var fileName = filePath.substring(filePath.lastIndexOf("/")+1);
			var fileType = files[i].getElementsByTagName("fileType")[0].childNodes[0].nodeValue;
			var napierFileType = "basis";
			if (fileType == "xls") {
				napierFileType = "ratingTable";
			}
			var effectiveTime = files[i].getElementsByTagName("effectiveTime")[0].childNodes[0].nodeValue;
			var expiryTime = files[i].getElementsByTagName("expiryTime")[0].childNodes[0].nodeValue;
			if(fileName.indexOf("_")!=0){
				fileDivHTML += "<a class='file " + fileType + "' href='#' itemName='" + itemName + "' filePath='" + filePath + "' napierFileType='" + napierFileType + "' onclick='parent.fileSelected(this.getAttribute(\"filePath\"), this.getAttribute(\"napierFileType\"));selectFile(this.getAttribute(\"filePath\"));'>"
				fileDivHTML += "<span class='fileName'>" + fileName + "</span>";
				fileDivHTML += "<span class='effectiveTime'>" + effectiveTime + "</span>";
				fileDivHTML += "<span class='expiryTime'>" + expiryTime + "</span>";
				fileDivHTML += "</a><br/>";
			}
		}catch(e){
			//alert(e);
		}
	}
	self.files.document.getElementById("files").innerHTML = fileDivHTML;
	previousTokens[page*1-1] = nextToken;
	try{
		nextToken = data.getElementsByTagName("nextToken")[0].childNodes[0].nodeValue;
		displayPageControls(page, true);
	}catch(e){
		nextToken = null;
		displayPageControls(page, false);
	}
	self.files.prepareFileMenus();
	applySortClasses();
}

function displayPageControls(pageNo, next){
	self.files.document.getElementById("pageNo").innerHTML = pageNo;
	if(pageNo==1){
		self.files.document.getElementById("previousControls").style.display="none";
	}else{
		self.files.document.getElementById("previousControls").style.display="inline";
	}
	if(next){
		self.files.document.getElementById("nextControls").style.display="inline";
	}else{
		self.files.document.getElementById("nextControls").style.display="none";
	}
}

function nextPage(){
	page = page*1 + 1;
	executeQuery(query, maxItems, nextToken, sortKey, sortOrder);
}

function previousPage(){
	page = page*1 - 1;
	previousToken = previousTokens[page*1-1];
	executeQuery(query, maxItems, previousToken, sortKey, sortOrder);
}

function firstPage(){
	page = 1;
	previousTokens = new Array();
	nextToken = null;
	executeQuery(query, maxItems, null, sortKey, sortOrder);
}

function finalPage(){
	alert("This has not yet been implemented");
}

function applySortClasses(){
	var headings = self.files.document.getElementById("filesHeadings").getElementsByTagName("a");
	for(i=0;i<headings.length;i++){
		if(headings[i].className.indexOf("sortable")>-1){
			if(sortKey==headings[i].getAttribute("sortKey")){
				headings[i].className = "sortable " + sortOrder;
			}else{
				headings[i].className = "sortable";
			}
		}
	}
}

function sort(key){
	page = 1;
	previousTokens = new Array();
	nextToken = null;
	if(key == sortKey){
		// Switch order
		if(sortOrder == "asc"){
			sortOrder = "desc";
		}else{
			sortOrder = "asc";
		}
	}
	executeQuery(query, maxItems, null, key, sortOrder);
}

function setSearchComparison(partial){
	if(partial){
		comparison="starts-with";
	}else{
		comparison="=";
	}
}

function fileSelected(filePath, napierFileType){
	if(filePath.indexOf("/") > -1){
	    filePath = filePath.substring(filePath.lastIndexOf("/")+1);
	}
	parent.document.getElementById("resourceNameInput").value=filePath;
	parent.document.getElementById("resourceTypeInput").value=napierFileType;
}