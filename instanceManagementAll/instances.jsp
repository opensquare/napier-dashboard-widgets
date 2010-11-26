<style>
	.instancesTable th{border-bottom:1px solid silver;margin-right:2px;}
	.instancesTable td{width:120px;}
	.instancesTable td:nth-child(1){width:30px;}
	.instancesTable td:nth-child(2){width:300px;}
	.instancesTable td:nth-child(3){width:80px;}
	.instancesTable td:nth-child(6){width:auto;}
	#instancesAuto input[type="text"]{width:30px;}
	#instancesAuto input[type="text"]{width:18px;text-align:right;padding:2px;}
	#instancesAuto td:nth-child(3),#instancesAuto td:nth-child(4){width:160px;}
	#instancesAuto td:nth-child(5){width:auto;}
</style>
<h1>Instances</h1>
<ul id="pageContent">
	<li>
		<h2>Gateway Instance</h2>
		<p>This instance provides the web endpoint for your Napier service.  You will need to give the URL to those users who are authorised to submit jobs.</p>
		<table class="instancesTable">
			<tr>
				<th></th>
				<th>URL</th>
				<th>Status</th>
			</tr>
			<tr>
				<td><img src="widgets/instanceManagementAll/globe.gif" /></td>
				<td>https://184.73.237.43:8433/loadbalancer</td>
				<td>Active</td>
				<td>
					<input type="button" value="Stop!"/>
				</td>
			</tr>
		</table>
	</li>
	<li>
		<h2>Calc Instances</h2>
		<p>Instances listed here carry out the calculation function of your Napier service.</p>
		<table class="instancesTable">
			<tr>
				<th></th>
				<th>Description</th>
				<th>CPU/Hour</th>
				<th>Started</th>
				<th>Status</th>
			</tr>
			<tr>
				<td><img src="widgets/instanceManagementAll/machine-small.gif" /></td>
				<td>Amazon US East Small (i-6d04b504)</td>
				<td style="background-image:-moz-linear-gradient(left center,lightblue 3%,white 23%);">3%</td>
				<td>12 Nov 2010 08:12:32</td>
				<td>Registered</td>
				<td>
					<input type="button" value="Reset"/>
					<input type="button" value="Deregister"/>
				</td>
			</tr>
			<tr>
				<td></td>
				<td style="text-align:right">Total Average CPU/Hour</td>
				<td>3%</td>
			</tr>
		</table>
		<h2 style="margin:20px 0 10px 0">
			Automatic Scaling 
			<label style="font-weight:normal;margin-left:80px">Enabled</label>
			<input type="checkbox" checked="checked"  onclick="$('#instancesAuto').slideToggle()"/>
		</h2>
		<table id="instancesAuto" class="instancesTable">
			<tr>
				<th></th>
				<th>Type</th>
				<th>Start thresholds</th>
				<th>Stop thresholds</th>
			</tr>
			<tr>
				<td><img src="widgets/instanceManagementAll/machine-small.gif" /></td>
				<td>
					<select>
						<option>Amazon US East</option>
						<option>Amazon US West</option>
						<option>Amazon EU West</option>
						<option>Amazon Asia Pacific</option>
					</select>
					<select>
						<option>Micro</option>
						<option selected="selected">Small</option>
						<option>Medium</option>
						<option>Large</option>
					</select>
				</td>
				<td>CPU/Hour <input type="text" value="60"/> &nbsp; Max No. <input type="text" value="20"/></td>
				<td>CPU/Hour <input type="text" value="40"/> &nbsp; Min No. <input type="text" value="1"/></td>
				<td><input type="button" value="Update"/></td>
			</tr>
		</table>		
		<p></p>
		<!-- input type="button" value="Start New Instance..." onclick="$('#newInstance').slideToggle()"/>
		<table id="newInstance" class="instancesTable" style="display:none">
			<tr>
				<th></th>
				<th>Description</th>
			</tr>
			<tr>
				<td><img src="widgets/instanceManagementAll/machine-small.gif" /></td>
				<td>
					<select>
						<option>Amazon US East</option>
						<option>Amazon US West</option>
						<option>Amazon EU West</option>
						<option>Amazon Asia Pacific</option>
					</select>
					<select>
						<option>Micro</option>
						<option selected="selected">Small</option>
						<option>Medium</option>
						<option>Large</option>
					</select>
				</td>
				<td>
					<input type="button" value="Start"/>
				</td>
			</tr>
		</table -->
	</li>
	<li>
		<h2>History</h2>
		<p></p>
		<textarea style="width:600px;height:400px;"/>
		<input type="button" value="Clear Log"/>
	</li>
</ul>
