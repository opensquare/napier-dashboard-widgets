<style>
	#pageContent th{border-bottom:1px solid silver;margin-right:2px;}
	#pageContent td{width:120px;}
	#pageContent td:nth-child(1){width:30px;}
	#pageContent td:nth-child(2){width:300px;}
	#pageContent td:nth-child(3){width:80px;}
	#pageContent td:nth-child(7){width:auto;}
</style>
<h1>Instances</h1>
<ul id="pageContent">
	<li>
		<span class="h1">Gateway Instance</span>
		<p>This instance provides the web endpoint for your Napier service.  You will need to give the URL to those users who are authorised to submit jobs.</p>
		<table>
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
		<span class="h1">Calc Instances</span>
		<p>Instances listed here carry out the calculation function of your Napier service.</p>
		<table>
			<tr>
				<th></th>
				<th>Description</th>
				<th>Approx Capacity/Hour</th>
				<th>Start</th>
				<th>Stop</th>
				<th>Status</th>
			</tr>
			<tr>
				<td><img src="" /></td>
				<td>Amazon US East Small (i-6d04b504)</td>
				<td>3,000</td>
				<td>12 Nov 2010 08:12:32</td>
				<td></td>
				<td>Registered</td>
				<td>
					<input type="button" value="Reset"/>
					<input type="button" value="Deregister"/>
				</td>
			</tr>
			<tr style="border-top:1px solid silver;font-weight:bold">
				<td></td>
				<td style="text-align:right">Approx overall capacity/hour</td>
				<td>3,000</td>
			</tr>
		</table>
		<p></p>
		<input type="button" value="Start New Instance..." onclick="$('#newInstance').toggle()"/>
		<table id="newInstance" style="display:none">
			<tr>
				<th></th>
				<th>Description</th>
				<th>Approx Capacity/Hour</th>
				<th>Start</th>
				<th>Stop</th>
			</tr>
			<tr>
				<td><img src="" /></td>
				<td>
					<select>
						<option>Amazon US East</option>
						<option>Amazon US West</option>
						<option>Amazon EU West</option>
						<option>Amazon Asia Pacific</option>
					</select>
					<select onchange="$('#newInstanceCapacity').html(this.value)">
						<option value="1,000">Micro</option>
						<option value="3,000" selected="selected">Small</option>
						<option value="4,500">Medium</option>
						<option value="6,000">Large</option>
					</select>
				</td>
				<td id="newInstanceCapacity">3,000</td>
				<td><input/></td>
				<td><input/></td>
				<td></td>
				<td>
					<input type="button" value="Start"/>
				</td>
			</tr>
		</table>		
	</li>
	<li>
		<span class="h1">History</span>
		<p></p>
		<textarea style="width:600px;height:400px;"/>
		<input type="button" value="Clear Log"/>
	</li>
</ul>
