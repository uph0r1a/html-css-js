<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="UTF-8" indent="yes" />
    <xsl:template match="/">
        <html>
            <head>
                <title>
                    <xsl:value-of select="library/title" />
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
                    p {
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
                    tbody tr:nth-child(even) {
                    background-color: #f9f9f9;
                    }
                    tbody tr:hover {
                    background-color: #f1f1f1;
                    }
                </style>
            </head>
            
            <body>
                <div class="container">
                    <h1>
                        <xsl:value-of select="library/title" />
                    </h1>
                    <h2>
                        <xsl:value-of select="library/caption"></xsl:value-of>
                    </h2>
                    <p>
                        <xsl:value-of select="library/description"></xsl:value-of>
                    </p>
                    
                    <table>
                        <thead>
                            <tr>
                                <th>Book ID</th>
                                <th>Book Title</th>
                                <th>Book Author</th>
                                <th>Book Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <xsl:for-each select="library/books/book">
                                <tr>
                                    <td>
                                        <xsl:value-of select="id"></xsl:value-of>
                                    </td>
                                    <td>
                                        <xsl:value-of select="title"></xsl:value-of>
                                    </td>
                                    <td>
                                        <xsl:value-of select="author"></xsl:value-of>
                                    </td>
                                    <td>
                                        <xsl:value-of select="price"></xsl:value-of>
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