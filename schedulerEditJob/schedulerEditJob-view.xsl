<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
	<xsl:output method="xml"/>
	<xsl:template match="/">
		<div class="dialogue">
			<xsl:choose>
				<xsl:when test="/response/success='true'">
					<xsl:apply-templates select="/response/job"/>
				</xsl:when>
				<xsl:otherwise>
					<p>
						<b>Error connecting to scheduler</b>
					</p>
				</xsl:otherwise>
			</xsl:choose>
		</div>
	</xsl:template>
	<xsl:template match="job">
		<p>Enter details about the job.</p>
		<form method="POST">
			<xsl:attribute name="action">{schedulerUrl}/REST/jobs</xsl:attribute>
			<input type="hidden" name="jobType" value="PactJythonJob"/>
			<table>
				<tr>
					<td>Job Name: </td>
					<td>
						<input type="text" name="jobName" value="{jobName}"/>
					</td>
				</tr>
				<tr>
					<td>Description: </td>
					<td>
						<input type="text" name="description" value="{description}"/>
					</td>
				</tr>
				<tr>
					<td>Script: </td>
					<td>
						<input type="text" name="script" value="{script}"/>
					</td>
				</tr>
				<tr>
					<td>Method: </td>
					<td>
						<input type="text" name="method" value="{method}"/>
					</td>
				</tr>
				<tr>
					<td>Params: </td>
					<td>
						<input type="text" name="params">
							<xsl:attribute name="value"><xsl:for-each select="params/*"><xsl:value-of select="name()"/>=<xsl:value-of select="text()"/><xsl:if test="not(position()=last())">,</xsl:if></xsl:for-each></xsl:attribute>
						</input>
					</td>
				</tr>
				<tr>
					<td>Output Directory: </td>
					<td>
						<input type="checkbox" name="outputDirectory">
							<xsl:if test="outputDirectory='true'">
								<xsl:attribute name="checked">true</xsl:attribute>
							</xsl:if>
						</input>
					</td>
				</tr>
				<tr>
					<td>Start Date: </td>
					<td>
						<input type="text" name="startDate" class="datepicker">
							<xsl:choose>
								<xsl:when test="substring-before(nextFireTime, ' ')=substring-before(/response/now, ' ')">
									<xsl:attribute name="value"/>
								</xsl:when>
								<xsl:otherwise>
									<xsl:attribute name="value"><xsl:value-of select="substring-before(nextFireTime, ' ')"/></xsl:attribute>
								</xsl:otherwise>
							</xsl:choose>
						</input>
					</td>
				</tr>
				<tr>
					<td>Start Time: </td>
					<td>
						<input type="text" name="startTime">
							<xsl:choose>
								<xsl:when test="startTime=nextFireTime">
									<xsl:attribute name="value"><xsl:value-of select="substring-before(substring-after(startTime, ' '), ' ')"/></xsl:attribute>
								</xsl:when>
								<xsl:otherwise>
									<xsl:attribute name="value"><xsl:value-of select="substring-before(substring-after(nextFireTime, ' '), ' ')"/></xsl:attribute>
								</xsl:otherwise>
							</xsl:choose>
						</input>
					</td>
				</tr>
				<tr>
					<td>End Date: </td>
					<td>
						<input type="text" name="endDate" class="datepicker">
							<xsl:attribute name="value"><xsl:value-of select="substring-before(endTime, ' ')"/></xsl:attribute>
						</input>
					</td>
				</tr>
				<tr>
					<td>End Time: </td>
					<td>
						<input type="text" name="endTime">
							<xsl:attribute name="value"><xsl:value-of select="substring-before(substring-after(endTime, ' '), ' ')"/></xsl:attribute>
						</input>
					</td>
				</tr>
				<tr>
					<td>Repeat: </td>
					<td>Every <input type="text" name="interval" value="{interval}" style="width:50px;"/>
						<select name="period" style="margin:0px 5px 0px 5px">
							<option value="s">
								<xsl:if test="period='s'">
									<xsl:attribute name="selected">true</xsl:attribute>
								</xsl:if>Seconds</option>
							<option value="m">
								<xsl:if test="period='m'">
									<xsl:attribute name="selected">true</xsl:attribute>
								</xsl:if>Minutes</option>
							<option value="h">
								<xsl:if test="period='h'">
									<xsl:attribute name="selected">true</xsl:attribute>
								</xsl:if>Hours</option>
							<option value="d">
								<xsl:if test="period='d'">
									<xsl:attribute name="selected">true</xsl:attribute>
								</xsl:if>Days</option>
							<option value="w">
								<xsl:if test="period='w'">
									<xsl:attribute name="selected">true</xsl:attribute>
								</xsl:if>Weeks</option>
							<option value="M">
								<xsl:if test="period='M'">
									<xsl:attribute name="selected">true</xsl:attribute>
								</xsl:if>Months</option>
							<option value="y">
								<xsl:if test="period='y'">
									<xsl:attribute name="selected">true</xsl:attribute>
								</xsl:if>Years</option>
						</select>
					</td>
				</tr>
			</table>
			<input type="submit" class="ui-button" value="Schedule Job"/>
		</form>
	</xsl:template>
</xsl:stylesheet>
