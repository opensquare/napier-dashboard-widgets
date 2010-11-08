function openPopup(url, w, h){
	x = (screen.width - w)/2;
	y = (screen.height - h)/2;
	window.open(url, '', 'titlebar=no, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', left=' + x + ', top=' + y);	
}

function submitFileUploadForm(theForm){
	var action = theForm.action;
	if(action.indexOf("?")==-1){action = action + "?";}
	var formElements = theForm.elements;
	for(i=0; i<formElements.length; i++){
		elType = formElements[i].type;
		if(elType!="submit"){
			elName = formElements[i].name;
			elValue = formElements[i].value;
			action = action + elName + "=" + elValue + "&";
		}
	}
	theForm.action = encodeURI(action);
}

function resetForm(theForm){
	theForm.action = theForm.getAttribute("defaultAction");
	var formElements = theForm.elements;
	for(i=0; i<formElements.length;i++){
		var value = "";
		try{
			value = formElements[i].defaultValue;
		}catch(e){;}
		formElements[i].value=value;
	}
}