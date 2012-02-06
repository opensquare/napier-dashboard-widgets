<style>
	.colorcombo-body a {
		cursor: pointer;
	}
	.usersTable td{
		width:120px;
	}
	.usersTable td:nth-child(1){
		width:20px;
	}
	.usersTable td:nth-child(6){
		text-align:right;
	}
	.usersTable td:nth-child(7){
		width:auto;
	}
	.usersTable textarea{
		min-width:120px;
		max-width:160px;
		min-height:60px;
		max-height:80px;
	}
	.usersTable input[type="checkbox"]{
		margin:0 4px;
	}
	.usersTable input[type="text"]:disabled,.usersTable input[type="checkbox"]:disabled,.usersTable input[type="password"]:disabled,.usersTable textarea:disabled{
		border:none;
		padding:1px;
		background:none;
		color:inherit;
	}
	.required{
		border: solid 1px red !important;
	}
	.usersTable tr[inactive="show"] td {
		zcolor: #D1CFCF;
		opacity: 0.8;
	}
	.usersTable tr[inactive="show"] td input[type='text']{
		zcolor: #D1CFCF;
		opacity: 0.8;
	}
	.usersTable tr[inactive="show"] td input[type='password']{
		zcolor: #D1CFCF;
		opacity: 0.8;
	}
	.usersTable tr[inactive="hide"] td {
		display: none;
	}
	.usersTable tr.accHolder {
		background-color: rgba(0,0,0,0.1);
	}
	.usersTable th {
		font-weight:bold;
		text-align:left;
		background:#444;
		color:#fff;
		padding:2px 4px;
		border-right:1px solid #fff;
		font-size:90%;
        }
        .usersTable td {
		padding:2px;
		font-size:90%;
        }
        .usersTable table input {
		font-size:90%;
        }
        .usersTable table .dark {
		background:#aaa;
        }
        .usersTable table .data1 {
		background:#ddd;
        }
        .usersTable table table{
		border:none;
        }
	.h1 {
		display:block;
		font-size:140%;
		font-weight:bold;
		padding-top:6px;
	}

        .p {
		display: block;
		padding: 2px 20px 2px 2px;
        }
        .subOptions {
		list-style-type: disc;
		padding-left: 16px;
		text-decoration: none;
        }
        h1{
		font-size:160%;
		font-weight:normal;
        }
        h2{
		font-size:120%;
        }
        input.button {
                width:100px;
                margin:2px;
        }
</style>
<div style="border:1px dotted #ddd; margin:10px 0 30px 0;padding:4px;clear:both;">
	<span class="userId" style="display:none"><%=((com.osl.core.user.PortalUser)session.getAttribute("user")).getUserId()%></span>
	<h2>Users</h2>
	<div>
		Show inactive users
		<input type="checkbox" name="showInactive" id="showInactive"/>
	</div>
	<p>
		These are the users set up for your service:
	</p>
	<div class="recreate">
		<table class='usersTable standardUsers'>
			<tr>
				<th colspan="2">Name</th>
				<th>Username</th>
				<th>Password</th>
				<th>IP Checking
				<!--input type="checkbox" name="enableIPChecking" value="true" disabled="disabled" style="float:right"/-->
				</th>
				<th style="width: 160px">Privileges</th>
				<th style="width: 110px; visibility: hidden;"></th>
			</tr>
			<tr class="form baseformTable" actionUrlPrefix="user/" action="update" style="display: none;">
				<td style='text-align:center'><img src='{widgetPath}/person-small.gif'/>
					<input name='userId' type='hidden' value='' />
				</td>
				<td>
					<input name='name' type='text' value='' disabled="disabled" validation="required"/>
				</td>
				<td>
					<input name='username' type='text' value='' disabled="disabled" validation="required"/>
				</td>
				<td>
					<input type="password" name="password" value='' disabled="disabled" validation="required"/>
				</td>
				<td>
					<textarea name="validIPsString" disabled="disabled"></textarea></td>
				<td id="permCheckButtons"></td>
				<td style="width:110px;text-align:center;">
					<input action="edit" class="button" type="button" value="Edit"/>
					<input action="save" class="button" type="button" value="Save" style="display:none;"/>
					<input action="cancel" class="button" type="button" value="Cancel" style="display:none;"/>
				</td>
			</tr>
		</table>
		<p></p>
		<a action="add" class="button">Add New User</a>
		<p></p>
	</div>
</div>
