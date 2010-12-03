<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
	<xsl:output method="xml"/>
	<xsl:template match="/">
		<div>
			<xsl:choose>
				<xsl:when test="/response/success='true'">
					<table>
						<tr>
							<td><h2>Scheduler Status: </h2></td>
							<td>
								<xsl:value-of select="/response/status"/>
							</td>
							<td>
								<a href="#" class="ui-button" action="start">Start</a>
								<a href="#" class="ui-button" action="stop">Stop</a>
							</td>
						</tr>
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
</xsl:stylesheet>
