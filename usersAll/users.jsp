<style>
	.usersTable th{border-bottom:1px solid silver;margin-right:2px;}
	.usersTable td{width:120px;}
	.usersTable td:nth-child(1){width:20px;}
	.usersTable td:nth-child(6){text-align:right;}
	.usersTable td:nth-child(7){width:auto;}
	.usersTable textarea{width:114px;}
	.usersTable input[type="checkbox"]{margin:0 4px;}
</style>
<h1>Users</h1>
<ul id="pageContent">
	<li>
		<h2>Account Details</h2>
		<p>These are the main account holder's details registered for this Napier service:</p>
		<table class="usersTable">
			<tr>
				<th></th>
				<th>Organisation Name</th>
				<th>Address</th>
				<th></th>
				<th></th>
				<th></th>
			</tr>
			<tr id="usersAccountOrg">
				<td style='text-align:center'><img src='widgets/usersAll/office-small.png'/></td>
				<td><input name='companyName' type='text' value='Open Insure' disabled="disabled" /></td>
				<td><textarea name="address" disabled="disabled">123 Long Lane</textarea></td>
				<td></td>
				<td></td>
				<td></td>
				<td style="width:110px;text-align:center;">
					<input id="usersAccountOrgEdit" onclick="unlock($('#usersAccountOrg'),$(this).siblings())" type="button" value="Edit" style="width:100px"/>
					<input onclick="lock($('#usersAccountOrg'),$('#usersAccountOrgEdit'))" type="button" value="Save" style="width:100px;display:none;"/>
					<input onclick="lock($('#usersAccountOrg'),$('#usersAccountOrgEdit'))" type="button" value="Cancel" style="width:100px;display:none;"/>
				</td>
			</tr>
			<tr>
				<th></th>
				<th>Name</th>
				<th>Username</th>
				<th>Password</th>
				<th>IP Checking <input type="checkbox" name="enableIPChecking" value="true" disabled="disabled" style="float:right"/></th>
				<th>Privileges</th>
			</tr>
			<tr id="usersAccountUser">
				<td style='text-align:center'><img src='widgets/usersAll/person-small.gif'/></td>
				<td><input name='name' type='text' value='Test User' disabled="disabled"/></td>
				<td><input name='email' type='text' value='test' disabled="disabled"/></td>
				<td><input type="password" name="password" value='passpass' disabled="disabled"/>
				<td><textarea name="validIPs" disabled="disabled">0.0.0.0</textarea></td>
				<td>
					Dashboard - Admin: <input name='dashboard' type='checkbox' value="true" checked="checked" disabled="disabled" />
					Dashboard - User: <input name='viewJobs' type='checkbox' value="true" disabled="disabled" />
					Submit Jobs: <input name='viewAllJobs' type='checkbox' value="true" checked="checked" disabled="disabled" />
				</td>
				<td style="width:110px;text-align:center;">
					<input id="usersAccountUserEdit" onclick="unlock($('#usersAccountUser'),$(this).siblings())" type="button" value="Edit" style="width:100px"/>
					<input onclick="lock($('#usersAccountUser'),$('#usersAccountUserEdit'))" type="button" value="Save" style="width:100px;display:none;"/>
					<input onclick="lock($('#usersAccountUser'),$('#usersAccountuserEdit'))" type="button" value="Cancel" style="width:100px;display:none;"/>
				</td>
			</tr>
		</table>
	</li>
	<li>
		<h2>Users</h2>
		<p>These are the other users set up for your Napier service:</p>
		<table class='usersTable'>
			<tr>
				<th></th>
				<th>Name</th>
				<th>Username</th>
				<th>Password</th>
				<th>IP Checking <input type="checkbox" name="enableIPChecking" value="true" disabled="disabled" style="float:right;"/></th>
				<th>Privileges</th>
			</tr>
			<tr id="usersTable1">
				<td style='text-align:center'><img src='widgets/usersAll/machine-small.gif'/></td>
				<td><input name='name' type='text' value='MoneySupermarket' disabled="disabled"/></td>
				<td><input name='email' type='text' value='msm-test' disabled="disabled"/></td>
				<td><input type="password" name="password" value='passpass' disabled="disabled"/>
				<td><textarea name="validIPs" disabled="disabled">0.0.0.0</textarea></td>
				<td>
					Dashboard - Admin: <input name='dashboard' type='radio' value="true" disabled="disabled"/>
					Dashboard - User: <input name='dashboard' type='radio' value="true" disabled="disabled"/>
					Submit Jobs: <input name='viewAllJobs' type='checkbox' value="true" checked="checked" disabled="disabled"/>
				</td>
				<td style="width:110px;text-align:center;">
					<input class="usersTable1Edit" onclick="unlock($('#usersTable1'),$(this).siblings())" type="button" value="Edit" style="width:100px"/>
					<input onclick="lock($('#usersTable1'),$('.usersTable1Edit'))" type="button" value="Save" style="width:100px;display:none;"/>
					<input onclick="lock($('#usersTable1'),$('.usersTable1Edit'))" type="button" value="Cancel" style="width:100px;display:none;"/>
					<input class="usersTable1Edit" type='button' value='Suspend' style="width:100px"/>
					<input class="usersTable1Edit" type='button' value='Delete' style="width:100px"/>
				</td>
			</tr>
			<tr>
				<th></th>
				<th>Name</th>
				<th>Username</th>
				<th>Password</th>
				<th>IP Checking <input type="checkbox" name="enableIPChecking" value="true" disabled="disabled" style="float:right;"/></th>
				<th>Privileges</th>
			</tr>
			<tr id="usersTable2">
				<td style='text-align:center'><img src='widgets/usersAll/machine-small.gif'/></td>
				<td><input name='name' type='text' value='CompareTheMarket' disabled="disabled"/></td>
				<td><input name='email' type='text' value='ctm-test' disabled="disabled"/></td>
				<td><input type="password" name="password" value='passpass' disabled="disabled"/>
				<td><textarea name="validIPs" disabled="disabled">0.0.0.0</textarea></td>
				<td>
					Dashboard - Admin: <input name='dashboard' type='radio' value="true" disabled="disabled"/>
					Dashboard - User: <input name='dashboard' type='radio' value="true" disabled="disabled"/>
					Submit Jobs: <input name='viewAllJobs' type='checkbox' value="true" checked="checked" disabled="disabled"/>
				</td>
				<td style="width:110px;text-align:center;">
					<input class="usersTable2Edit" onclick="unlock($('#usersTable2'),$(this).siblings())" type="button" value="Edit" style="width:100px"/>
					<input onclick="lock($('#usersTable2'),$('.usersTable2Edit'))" type="button" value="Save" style="width:100px;display:none;"/>
					<input onclick="lock($('#usersTable2'),$('.usersTable2Edit'))" type="button" value="Cancel" style="width:100px;display:none;"/>
					<input class="usersTable2Edit" type='button' value='Suspend' style="width:100px"/>
					<input class="usersTable2Edit" type='button' value='Delete' style="width:100px"/>
				</td>
			</tr>
		</table>
		<p></p>
		<h2><a onclick="$('#usersNewUser').slideToggle()">Add New User...</a></h2>
		<p></p>
		<table id="usersNewUser" class="usersTable" style="display:none;background-color:#d8e0ff">
			<tr>
				<th></th>
				<th>Name</th>
				<th>Username</th>
				<th>Password</th>
				<th>IP Checking <input type="checkbox" name="enableIPChecking" value="true" style="float:right;"/></th>
				<th>Privileges</th>
			</tr>
			<tr>
				<td style='text-align:center'><img src='widgets/usersAll/machine-small.gif'/></td>
				<td><input id='fn0' name='name' type='text'/></td>
				<td><input id='em0' name='email' type='text'/></td>
				<td><input type="password" name="password" />
				<td><textarea name="validIPs" ></textarea></td>
				<td>
					Dashboard - Admin: <input id='db' class="readonly" name='dashboard' type='checkbox' value="true"/>
					Dashboard - User: <input id='vj' class="readonly" name='viewJobs' type='checkbox' value="true"/>
					Submit Jobs: <input id='vaj' class="readonly" name='viewAllJobs' type='checkbox' value="true"/>
				</td>
				<td style="width:110px;text-align:center;">
					<input type='button' value='Save' style="width:100px"/>
					<input type='button' value='Cancel' style="width:100px"/>
				</td>
			</tr>
		</table>
	</li>
</ul>
