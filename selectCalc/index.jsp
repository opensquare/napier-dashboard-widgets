<div>
	<label>Calc Ref:</label> <input type="text" id="calcRef" value=""/> 
	<input type="button" value="View" onclick="frames['calcWindow'].location='showComponent?name=viewCalc&calcRef=' + document.getElementById('calcRef').value"/>
</div>
<iframe name="calcWindow" id="calcWindow" style="width:100%;height:600px"></iframe>