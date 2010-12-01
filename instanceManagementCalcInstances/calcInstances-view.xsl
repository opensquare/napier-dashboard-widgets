<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
	<xsl:output method="xml"/>
	<xsl:template match="/">
		<h2>Calc Instances</h2>
		<p>Instances listed here carry out the calculation function of your Napier service.</p>
		<table class="instancesTable">
			<tr>
				<th/>
				<th>Description</th>
				<th>CPU Load</th>
				<th>Started</th>
				<th>Status</th>
			</tr>
			<xsl:for-each select="/instances/instance">
			<tr class="instanceRow" privateIP="{PrivateIPAddress}">
				<td>
					<img src="widgets/instanceManagementCalcInstances/machine-small.gif"/>
				</td>
				<td><xsl:value-of select="InstanceLocation"/><xsl:value-of select="' '"/><xsl:value-of select="InstanceType"/> (<xsl:value-of select="InstanceId"/>)</td>
				<td style="background-image:-moz-linear-gradient(left center,lightblue 3%,white 23%);">3%</td>
				<td><xsl:value-of select="LaunchTime"/></td>
				<td><xsl:value-of select="translate(InstanceState, 'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')"/> (<span class="registrationSpan">Checking....</span>)</td>
				<td>
					<input type="button" value="Reset">
						<xsl:attribute name="onclick">window.open('http://<xsl:value-of select="PublicDnsName"/>:8080/calcservice/REST/action=clearCache')</xsl:attribute>
					</input>
					<input type="button" value="Register" class="registerButton" style="display:none">
						<xsl:attribute name="url">http://<xsl:value-of select="PublicDnsName"/>:8080/calcservice/REST/register</xsl:attribute>
					</input>
					<input type="button" value="Deregister" class="deregisterButton" style="display:none">
						<xsl:attribute name="url">http://<xsl:value-of select="PublicDnsName"/>:8080/calcservice/REST/deregister</xsl:attribute>
					</input>
				</td>
			</tr>
			</xsl:for-each>
			<tr id="instancesTotals">
				<td/>
				<td style="text-align:right">Overall Average CPU Load</td>
				<td>3%</td>
			</tr>
		</table>
	</xsl:template>
</xsl:stylesheet>