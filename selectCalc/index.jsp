<div>
	<label>Calc Ref:</label> <input type="text" id="calcRef" value=""/> 
	<input type="button" value="View" onclick="frames['calcWindow'].location='showComponent?name=viewCalc&calcRef=' + document.getElementById('calcRef').value"/>
</div>
<iframe name="calcWindow" id="calcWindow" style="border:1px solid;height:600px;margin:10px 2px;width:99%;"></iframe>