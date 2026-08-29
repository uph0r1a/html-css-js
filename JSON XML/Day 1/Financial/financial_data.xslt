<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <html>
            <head>
                <title>
                    <xsl:value-of select="finance/title"/>
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
                    margin: 0 auto;
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
                    p.description {
                    color: #666666;
                    line-height: 1.5;
                    }
                    table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 16px;
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
                    tbody tr:hover {
                    filter: brightness(0.96);
                    }
                    tr.completed {
                    background-color: #e8f5e9;
                    }
                    tr.completed td:last-child {
                    color: #2e7d32;
                    font-weight: bold;
                    }
                    tr.pending {
                    background-color: #fff8e1;
                    }
                    tr.pending td:last-child {
                    color: #b8860b;
                    font-weight: bold;
                    }
                    tr.other {
                    background-color: #ffebee;
                    }
                </style>
            </head>
            
            <body>
                <div class="container">
                    <h1>
                        <xsl:value-of select="finance/title"/>
                    </h1>
                    <h2>
                        <xsl:value-of select="finance/caption"/>
                    </h2>
                    <p class="description">
                        <xsl:value-of select="finance/description"/>
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <xsl:for-each select="finance/transactions/transaction">
                                <tr>
                                    <xsl:attribute name="class">
                                        <xsl:choose>
                                            <xsl:when test="status = 'Completed'">completed</xsl:when>
                                            <xsl:when test="status = 'Pending'">pending</xsl:when>
                                            <xsl:otherwise>other</xsl:otherwise>
                                        </xsl:choose>
                                    </xsl:attribute>
                                    <td>
                                        <xsl:value-of select="id"/>
                                    </td>
                                    <td>
                                        <xsl:value-of select="date"/>
                                    </td>
                                    <td>
                                        <xsl:value-of select="type"/>
                                    </td>
                                    <td>
                                        <xsl:value-of select="amount"/>
                                    </td>
                                    <td>
                                        <xsl:value-of select="status"/>
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </tbody>
                    </table>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>