<style>
	#pageContent th{border-bottom:1px solid silver;margin-right:2px;}
	#pageContent td{width:120px;}
	#pageContent td:nth-child(1){width:30px;}
	#pageContent td:nth-child(2){width:300px;}
</style>
<table>
	<tr>
		<th></th>
		<th>Description</th>
		<th>Disk Space</th>
		<th>Disk Used</th>
		<th>Status</th>
	</tr>
	<tr>
		<td><img src="widgets/databaseInstance/database.gif" /></td>
		<td>Master (184.73.237.43)</td>
		<td>300Gb</td>
		<td>43%</td>
		<td>Active</td>
		<td><input type="button" value="settings..."/></td>
	</tr>
	<tr>
		<td><img src="widgets/databaseInstance/database.gif" /></td>
		<td>Slave (184.73.237.44)</td>
		<td>500Gb</td>
		<td>62%</td>
		<td>Active</td>
		<td>
			<input type="button" value="Pause Replication"/>
			<input type="button" value="settings..."/>
		</td>
	</tr>
</table>
