<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
	<xsl:output method="xml"/>
	<xsl:template match="/">
		<div>
			<xsl:choose>
				<xsl:when test="/response/success='true'">
					<a class="ui-button" href="javascript:void(0)" action="scheduleNewJob">Schedule a new job</a>
					<a class="ui-button" href="javascript:void(0)" action="schedulerUploadJob">Upload a job script</a>
					<table width="100%" style="text-align:center">
						<thead>
							<tr>
								<th>Name</th>
								<th>Description</th>
								<th>Next Fire Time</th>
								<th>End Time</th>
								<th>Status</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<xsl:apply-templates select="/response/jobs/job"/>
						</tbody>
					</table>
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
		<tr>
			<td>
				<xsl:value-of select="jobName"/>
			</td>
			<td>
				<xsl:value-of select="description"/>
			</td>
			<td>
				<xsl:value-of select="nextFireTime"/>
			</td>
			<td>
				<xsl:value-of select="endTime"/>
			</td>
			<td>
				<xsl:value-of select="status"/>
			</td>
			<td>
				<span class="scheduler-actions">
					<a href="#" class="ui-icon ui-icon-circle-triangle-e" title="trigger" action="triggerJob" jobName="{jobName}"/>
					<a href="#" class="ui-icon ui-icon-pause" title="pause" action="pauseJob" jobName="{jobName}"/>
					<a href="#" class="ui-icon ui-icon-play" title="resume" action="resumeJob" jobName="{jobName}"/>
					<a href="#" class="ui-icon ui-icon-close" title="delete" action="deleteJob" jobName="{jobName}"/>
					<a href="#" class="ui-icon ui-icon-pencil" title="edit" action="editJob" jobName="{jobName}"/>
					<a href="#" class="ui-icon ui-icon-document" title="results" action="jobResults" jobName="{jobName}"/>
				</span>
			</td>
		</tr>
	</xsl:template>
</xsl:stylesheet>
