<h1>Users</h1>
<ul id="pageContent">
	<li>
		<span class="h1">Account Details</span>
		<p>These are the main account holder's details registered for this Napier service:</p>
		<table id='account'>
			<tr>
				<td style='text-align:center'><img src='widgets/usersAll/office.png'/></td>
				<td>
					<table id='odetails'>
						<tr>
							<th>Organisation Name</th>
							<th>Address</th>
						</tr>
						<tr>
							<td><input id='cn0' name='companyName' type='text' value=''/></td>
							<td><textarea name="address"></textarea></td>
							</td>
						</tr>
					</table>
				</td>
				<td>
					<input class='edit' onclick='unlockFields1(this)' type='button' value='Edit' style="width:100px"/>
				</td>
			</tr>
			<tr>
				<td style='text-align:center'><img src='widgets/usersAll/person.gif'/></td>
				<td>
					<table id='pdetails'>
						<tr>
							<th>Name</th>
							<th>Username</th>
							<th>Password</th>
							<th>IP Checking&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-weight:normal">enabled:</span><input type="checkbox" name="enableIPChecking" value="true" /></th>
							<th>Privileges</th>
						</tr>
						<tr>
							<td><input id='fn0' name='name' type='text' value='Test User'/></td>
							<td><input id='em0' name='email' type='text' value=''/></td>
							<td><input type="password" name="password" value=''/>
							<td><textarea name="validIPs">0.0.0.0</textarea></td>
							<td>
								<table class='privileges'>
									<tr>
										<td>Dashboard - Admin:</td>
										<td><input id='db' class="readonly" name='dashboard' type='checkbox' value="true" /></td>
									</tr>
									<tr>
										<td>Dashboard - User:</td>
										<td><input id='vj' class="readonly" name='viewJobs' type='checkbox' value="true" /></td>
									</tr>
									<tr>
										<td>Submit Jobs:</td>
										<td><input id='vaj' class="readonly" name='viewAllJobs' type='checkbox' value="true" /></td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
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
		<table id='users'>
			<tr>
				<td style='text-align:center'><img src='widgets/usersAll/person.gif'/></td>
				<td>
					<table id='pdetails'>
						<tr>
							<th>Name</th>
							<th>Username</th>
							<th>Password</th>
							<th>IP Checking&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-weight:normal">enabled:</span><input type="checkbox" name="enableIPChecking" value="true" /></th>
							<th>Privileges</th>
						</tr>
						<tr>
							<td><input id='fn0' name='name' type='text' value='Test User'/></td>
							<td><input id='em0' name='email' type='text' value=''/></td>
							<td><input type="password" name="password" value=''/>
							<td><textarea name="validIPs">0.0.0.0</textarea></td>
							<td>
								<table class='privileges'>
									<tr>
										<td>Dashboard - Admin:</td>
										<td><input id='db' class="readonly" name='dashboard' type='checkbox' value="true" /></td>
									</tr>
									<tr>
										<td>Dashboard - User:</td>
										<td><input id='vj' class="readonly" name='viewJobs' type='checkbox' value="true" /></td>
									</tr>
									<tr>
										<td>Submit Jobs:</td>
										<td><input id='vaj' class="readonly" name='viewAllJobs' type='checkbox' value="true" /></td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
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
