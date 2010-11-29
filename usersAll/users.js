function lockFields1(){	
	Inputs = document.getElementsByTagName("input");
	for(var i = 0; i<Inputs.length; i++)
	{
		if(Inputs[i].type != 'button' && Inputs[i].type != 'submit')
		{
			Inputs[i].disabled = true;
		}
		else if(Inputs[i].className=='editConfirm' || Inputs[i].className=='hide')
		{
			Inputs[i].style.display = 'none';
		}
		else
		{
			Inputs[i].style.display = 'inline';
		}
	}
	Inputs = document.getElementsByTagName("textarea");
	for(var i = 0; i<Inputs.length; i++)
	{
		Inputs[i].disabled = true;
	}
}


function unlock(node1,node2){
	//parameters - 1) parent node containing fields to be unlocked, 2) (optional) other items (save/cancel buttons usually) to show
	$(node1).find(':disabled').removeAttr('disabled');
	$(node2).show();
}

function lock(node1,node2){
	//parameters - 1) parent node containing fields to be locked, 2) (optional) other item (edit button usually) to show (and hide any siblings)
	$(node1).find(':enabled').attr('disabled',true);
	$(node2).removeAttr('disabled').show().siblings().hide();
}

function unlockFields1(currentNode){
        var parent = currentNode.parentNode;
        parent = parent.parentNode;
        parent = parent.parentNode;
//        alert(parent.nodeName);
	Inputs = parent.getElementsByTagName("input");
	for(var i = 0; i<Inputs.length; i++)
	{
		if(Inputs[i].type != 'button')
		{
			if(Inputs[i].type != 'submit' && Inputs[i].className != 'readonly')
			{
				Inputs[i].disabled = false;
			}
			else
			{
				Inputs[i].style.display = 'inline';
			}
		}
		else if(Inputs[i].className=='editConfirm')
		{
			Inputs[i].style.display = 'inline';
		}
		else 
		{
			Inputs[i].style.display = 'none';
		}
	}  
	Inputs = parent.getElementsByTagName("textarea");
	for(var i = 0; i<Inputs.length; i++)
	{
		if(Inputs[i].className != 'readonly')
		{
			Inputs[i].disabled = false;
		}
	}   
}

function openWindow(type){
	 if(type=='change')
	 {
		 var width  = 300;
		 var height = 200;	 	
	 }
	 else if(type=='forgot')
	 {
		 var width  = 600;
		 var height = 300;	 	
	 }

	 var left   = (screen.width  - width)/2;
	 var top    = (screen.height - height)/2;
	 var params = 'width='+width+', height='+height;
	 params += ', top='+top+', left='+left;
	 params += ', directories=no';
	 params += ', location=no';
	 params += ', menubar=no';
	 params += ', resizable=yes';
//	 params += ', resizable=no';	 
	 params += ', scrollbars=no';
	 params += ', status=no';
	 params += ', toolbar=no';
	 
	 //alert(type);
	 if(type=='change')
	 {
		 newwin=window.open('changePassword.jsp','windowname5', params);
		 if (window.focus) {newwin.focus()}
		 return false;	 	
	 }
	 else if(type=='forgot')
	 {
		 newwin=window.open('forgetPassword.jsp','windowname5', params);
		 if (window.focus) {newwin.focus()}
		 return false;	 	
	 }
}

function popUp(type, aid){
	var width  = 600;
	 var height = 300;	 	
	 var left   = (screen.width  - width)/2;
	 var top    = (screen.height - height)/2;
	 var id = aid;
	 var params = 'width='+width+', height='+height;
	 params += ', top='+top+', left='+left;
	 params += ', directories=no';
	 params += ', location=no';
	 params += ', menubar=no';
	 params += ', resizable=yes';	 
	 params += ', scrollbars=yes';
	 params += ', status=no';
	 params += ', toolbar=no';
	 if(type=='jobsRSS'){
		var url = "rss/jobsRSS.jsp?accountID="+id+"&showJobSubmissions=" + document.getElementById("jobSubmission").checked+"&showJobCompletions=" + document.getElementById("jobCompletion").checked+"&showJobErrors=" + document.getElementById("jobError").checked;
		newwin=window.open(url, '', params);	 	
		if (window.focus) {newwin.focus()}
		return false;	 	
	 }else if(type=="billingRSS"){
	 	var url = "rss/billingRSS.jsp?accountID="+id+"&creditLimit=" + document.getElementById("creditLimit").value;
	 	newwin=window.open(url, '', params);	 	
		if (window.focus) {newwin.focus()}
		return false;
	 }else if(type=="storageRSS"){
		var url = "rss/storageRSS.jsp?accountID="+id+"&storageLimit=" + document.getElementById("storageLimit").value;
		newwin=window.open(url, '', params);	 	
		if (window.focus) {newwin.focus()}
		return false;
	 }
}

function showTable(){
	document.getElementById("addNewUser").style.display = 'block';
}

function hideTable(){
	document.getElementById("addNewUser").style.display = 'none';
}

function suspend(userID){
      //  alert(userID);
	window.location="suspend.jsp?id="+userID;
        unsuspendButton = document.getElementsByClassName("unsuspend");
        unsuspendButton[0].style.display = "inline";
}

function unsuspend(userID){
      //  alert(userID);
	window.location="unsuspend.jsp?id="+userID;
}

function remove(userID, fName, lName){
	 var answer = confirm("You are about to permanently delete " + fName + " " + lName + ".");
	 if(answer){
	 	window.location = "remove.jsp?id=" + userID;
	 }else{
	 	return false;
	 }
	
}

function checkPw() {
	var pw1 = document.getElementById("pw1");
	var pw2 = document.getElementById("pw2");
	if(pw1.value != pw2.value){
		alert("Please make sure you input identical password twice.")
		pw1.focus();
	}
}

function validate_required(field,alerttxt){
	with (field)
	{
		if (value==null||value==""){
			alert(alerttxt);
			return false;
		}
		else{
			return true
		}
	}
}

function validate_email(field,alerttxt){
	with (field)
	{
		apos=value.indexOf("@");
		dotpos=value.lastIndexOf(".");
		if (apos<1||dotpos-apos<2){
			alert(alerttxt);
			return false;
		}
		else {
			return true;
		}
	}
}

function validate_form(thisform){
	with (thisform)
	{
		if (validate_required(firstName,"First name must be filled out!")==false){
			firstName.focus();
			return false;
		}

		if (validate_required(email,"Username must be filled out!")==false){
			email.focus();
			return false;
		}	
		//if (validate_email(email,"Please input a correct email address!")==false){
		//	email.focus();
		//	return false;
		//}
		if (validate_required(password,"Password must be filled out!")==false){
			email.focus();
			return false;
		}		
	}
}

function validatePassword(thisform){
	if(thisform.password.value==thisform.password2.value){
		return true;
	}else{
		alert("Passwords do not match!");
		return false;
	}
}