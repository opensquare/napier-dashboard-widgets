function Widget_users(){
	
	this.onReadyExtend = function() {
		var widgetObject = this;
		
		$("[action='add']", this.widgetDiv).click(function() {
			var $newform = $(".baseform", this.widgetDiv).clone().removeClass("baseform").show();
			$newform.attr("action", "create");
			$(".standardUsers", this.widgetDiv).append($newform);
			widgetObject.initForms($newform);
			$("[action='edit']", $newform).click();
		})
		
		$.ajax({
			url: "user/list",
			success: function(users) {
				for each (var user in users) {
					var appendClass = user.accountHolder == true ? "accountHolders" : "standardUsers";
					var $cloneNode = $(".baseform", widgetObject.widgetDiv);
					var $newNode = $cloneNode.clone().removeClass("baseform");
					$("." + appendClass, widgetObject.widgetDiv).append($newNode);
					$(":input", $newNode).each(function() {
						var $input = $(this);
						if (this.type == "text" || this.type == "password" || this.type == "hidden") {
							if (defined(user[this.name])) {
								$input.val(user[this.name]);
							}
						} else if (this.type == "textarea") {
							if (defined(user[this.name])) {
								$input.text(user[this.name]);
							}
						} else if (this.type == "checkbox") {
							var collection = this.name.substring(0, this.name.indexOf("."));
							var item = this.name.substring(this.name.indexOf(".") + 1);
							$input.attr("checked", ($.inArray(item, user[collection]) != -1));
						}
					})
					$newNode.show();
					widgetObject.initForms($newNode);
				}
			},
			error: function() {
				alert("Failed to load users.");
			}
		})
	}
	
	this.initForms = function(container) {
		$("[action='edit']", container).click(function() {
			var form = $(this).parents(".form")[0];
			unlock(form, $(this).hide().siblings());
			$(":input", form).each(function () {
				var $this = $(this);
				if (this.type == 'text' || this.type == 'textarea') {
					$this.data('origValue', $this.val());
				} else if (this.type == 'checkbox') {
					$this.data('origValue', $this.attr("checked"));
				}
			})
		})
		$("[action='save']", container).click(function() {
			var thisButton = this;
			var $form = $($(this).parents(".form")[0]);
			if (validateForm($form)) {
				var data = $(":input", $form).serialize();
				$form.find(':enabled').attr('disabled', true);
				$.ajax({
					url: $form.attr("actionUrlPrefix") + $form.attr("action"),
					type: "post",
					data: data,
					success: function() {
						$form.attr("update");
						lock($form, $("[action='edit']", $form));
					},
					error: function() {
						alert("Failed to save user.");
					}
				})
			}
		})
		$("[action='cancel']", container).click(function() {
			var $form = $($(this).parents(".form")[0]);
			clearFormValidation($form);
			if ($form.attr("action") == "create") {
				$form.hide();
			} else {
				$(":input", $form).each(function () {
					var $this = $(this);
					if (this.type == 'text' || this.type == 'textarea') {
						$this.val($this.data('origValue'));
					} else if (this.type == 'checkbox') {
						$this.attr("checked", $this.data('origValue'));
					}
				})
				lock($form, $("[action='edit']", $form));
			}
		})
	}
}

Widget_users.prototype = globalProperties.widgetPrototype;




/// Some Global functions .. maybe their scope should be narrowed.

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

function validateForm(form) {
	$(":input[validation='required'][value!='']", form).removeClass("required");
	return $(":input[validation='required'][value='']", form).addClass("required").size() == 0;
}
function clearFormValidation(form) {
	$(":input[validation='required']", form).removeClass("required");
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