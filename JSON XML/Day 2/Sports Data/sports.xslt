<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="UTF-8" indent="yes" />
    <xsl:template match="/">
        <html>
            <head>
                <title>
                    <xsl:value-of select="sports/title"/>
                </title>
                <style>
                    body {
                    font-family: Arial, Helvetica, sans-serif;
                    background-color: #f5f5f5;
                    margin: 0;
                    padding: 20px;
                    }
                    .container {
                    max-width: 800px;
                    margin: 0 auto 16px auto;
                    background-color: #ffffff;
                    padding: 24px 32px;
                    border-radius: 8px;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                    color: #222222;
                    margin-bottom: 4px;
                    }
                    h2 {
                    color: #555555;
                    font-weight: normal;
                    margin-top: 0;
                    }
                    p {
                    color: #666666;
                    line-height: 1.5;
                    }
                    table {
                    width: 100%;
                    max-width: 800px;
                    margin: 0 auto;
                    border-collapse: collapse;
                    background-color: #ffffff;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
                    }
                    th, td {
                    border: 1px solid #dddddd;
                    padding: 10px 14px;
                    text-align: left;
                    }
                    th {
                    background-color: #2c3e50;
                    color: #ffffff;
                    }
                    tr.scheduled {
                    background-color: #d4edda;
                    }
                    tr.completed {
                    background-color: #e0e0e0;
                    }
                    tbody tr:hover {
                    filter: brightness(0.95);
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>
                        <xsl:value-of select="sports/title"/>
                    </h1>
                    <h2>
                        <xsl:value-of select="sports/caption"/>
                    </h2>
                    <p>
                        <xsl:value-of select="sports/description"/>
                    </p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Sport</th>
                            <th>Date</th>
                            <th>Venue</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="sports/events/event">
                            <tr>
                                <xsl:attribute name="class">
                                    <xsl:choose>
                                        <xsl:when test="status = 'Scheduled'">scheduled</xsl:when>
                                        <xsl:when test="status = 'Completed'">completed</xsl:when>
                                        <xsl:otherwise>other</xsl:otherwise>
                                    </xsl:choose>
                                </xsl:attribute>
                                <td>
                                    <xsl:value-of select="id"/>
                                </td>
                                <td>
                                    <xsl:value-of select="name"/>
                                </td>
                                <td>
                                    <xsl:value-of select="sport"/>
                                </td>
                                <td>
                                    <xsl:value-of select="date"/>
                                </td>
                                <td>
                                    <xsl:value-of select="venue"/>
                                </td>
                                <td>
                                    <xsl:value-of select="status"/>
                                </td>
                            </tr>
                        </xsl:for-each>
                    </tbody>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>