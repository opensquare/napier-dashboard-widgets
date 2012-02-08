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
							<td style="padding:0px 15px;">
								<h2><xsl:value-of select="/response/status"/></h2>
							</td>
							<td>
								<xsl:choose>
									<xsl:when test="/response/status='running'">
										<a href="#" class="button" action="stop">Stop</a>
									</xsl:when>
									<xsl:otherwise>
										<a href="#" class="button" action="start">Start</a>
									</xsl:otherwise>
								</xsl:choose>
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
