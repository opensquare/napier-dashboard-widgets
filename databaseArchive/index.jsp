<p>Archives available:</p>
<style>
	.databaseTable td:nth-child(1){text-align:center;}
</style>
<table class="databaseTable">
	<tr>
		<th colspan="2">Date</th>
		<th>Start</th>
		<th>End</th>
		<th>No of Records</th>
	</tr>
	<tr>
		<td><img src="widgets/databaseArchive/index_card.gif" /></td>
		<td>16 Nov 2010</td>
		<td>01 Jan 2010 00:00:00</td>
		<td>31 Jan 2010 23:59:59</td>
		<td>167,432</td>
	</tr>
</table>
<p></p>
<input type="button" value="New Archive..." onclick="$('#newArchive').toggle()"/>
<table id="newArchive" class="databaseTable" style="display:none">
	<tr>
		<th colspan="2">Date</th>
		<th>Start</th>
		<th>End</th>
		<th>No of Records</th>
	</tr>
	<tr>
		<td><img src="widgets/databaseArchive/index_card.gif" /></td>
		<td>22 Nov 2010</td>
		<td><input/></td>
		<td><input/></td>
		<td></td>
		<td>
			<input type="button" value="Start"/>
		</td>
	</tr>
</table>		
