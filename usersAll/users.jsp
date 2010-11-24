<style>
	.usersTable th{border-bottom:1px solid silver;margin-right:2px;}
	.usersTable td{width:120px;}
	.usersTable td:nth-child(1){width:20px;}
	.usersTable td:nth-child(6){text-align:right;}
	.usersTable td:nth-child(7){width:auto;}
	.usersTable textarea{width:114px;}
</style>
<h1>Users</h1>
<ul id="pageContent">
	<li>
		<span class="h1">Account Details</span>
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
			<tr>
				<td style='text-align:center'><img src='widgets/usersAll/office-small.png'/></td>
				<td><input id='cn0' name='companyName' type='text' value='Open Insure'/></td>
				<td><textarea name="address">123 Long Lane</textarea></td>
				<td></td>
				<td></td>
				<td></td>
				<td><input class='edit' onclick='unlockFields1(this)' type='button' value='Edit' style="width:100px"/></td>
			</tr>
			<tr>
				<th></th>
				<th>Name</th>
				<th>Username</th>
				<th>Password</th>
				<th>IP Check&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="enableIPChecking" value="true" /></th>
				<th>Privileges</th>
			</tr>
			<tr>
				<td style='text-align:center'><img src='widgets/usersAll/person-small.gif'/></td>
				<td><input id='fn0' name='name' type='text' value='Test User'/></td>
				<td><input id='em0' name='email' type='text' value='test'/></td>
				<td><input type="password" name="password" value='pass'/>
				<td><textarea name="validIPs">0.0.0.0</textarea></td>
				<td>
					Dashboard - Admin: <input id='db' class="readonly" name='dashboard' type='checkbox' value="true" checked="checked"/>
					Dashboard - User: <input id='vj' class="readonly" name='viewJobs' type='checkbox' value="true" />
					Submit Jobs: <input id='vaj' class="readonly" name='viewAllJobs' type='checkbox' value="true" checked="checked"/>
				</td>
				<td style="width:110px;text-align:center;">
					<input class='edit' onclick='unlockFields1(this)' type='button' value='Edit' style="width:100px"/>
				</td>
			</tr>
		</table>
	</li>
	<li>
		<span class="h1">Users</span>
		<p>These are the other users set up for your Napier service:</p>
		<table class='usersTable'>
			<tr>
				<th></th>
				<th>Name</th>
				<th>Username</th>
				<th>Password</th>
				<th>IP Check&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="enableIPChecking" value="true" /></th>
				<th>Privileges</th>
			</tr>
			<tr>
				<td style='text-align:center'><img src='widgets/usersAll/person-small.gif'/></td>
				<td><input id='fn0' name='name' type='text' value='MoneySupermarket'/></td>
				<td><input id='em0' name='email' type='text' value='moneysup'/></td>
				<td><input type="password" name="password" value=''/>
				<td><textarea name="validIPs">0.0.0.0</textarea></td>
				<td>
					Dashboard - Admin: <input id='db' class="readonly" name='dashboard' type='checkbox' value="true"/>
					Dashboard - User: <input id='vj' class="readonly" name='viewJobs' type='checkbox' value="true" />
					Submit Jobs: <input id='vaj' class="readonly" name='viewAllJobs' type='checkbox' value="true" checked="checked"/>
				</td>
				<td style="width:110px;text-align:center;">
					<input class='suspend' type='button' value='Suspend' style="width:100px"/>
					<input class='edit' onclick='unlockFields1(this)' type='button' value='Edit' style="width:100px"/>
					<input class='Delete' type='button' value='Delete' style="width:100px"/>
				</td>
			</tr>
			<tr>
				<td colspan="20" style="text-align:right"><input class='add' type='button' value='Add New User'/></td>
			</tr>
		</table>
	</li>
</ul>
