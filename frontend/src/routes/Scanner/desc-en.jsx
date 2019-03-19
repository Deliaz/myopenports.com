import React from 'react';

export default function () {
    return <div>
        <h2 className="is-size-4">About the scanner</h2>
        <p>Port scanner allows you to make an express check of the most popular ports on your computer.
            Scanning takes less than a minute, the result will be displayed as a table.</p>

        <p>It is worth noting that with such an express scan, the time allotted for connecting to the port
            is less than with the usual port verification.</p>

        <h3 className="is-size-4">
            Port checklist
        </h3>
        <br/>
        <table className="table is-narrow is-striped port-table">
            <thead>
            <tr>
                <th>№</th>
                <th>Port</th>
                <th>Protocol</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td/>
                <td>20</td>
                <td>FTP Data</td>
                <td>File Transfer Protocol - file transfer protocol. Port for data.</td>
            </tr>
            <tr>
                <td/>
                <td>21</td>
                <td>FTP Control</td>
                <td>File Transfer Protocol - file transfer protocol. Port for commands.</td>
            </tr>
            <tr>
                <td/>
                <td>22</td>
                <td>SSH</td>
                <td>Secure SHell - "secure shell". The protocol for remote control of the operating
                    system.
                </td>
            </tr>
            <tr>
                <td/>
                <td>23</td>
                <td>telnet</td>
                <td>TErminaL NETwork. The protocol for implementing a text-based interface over a
                    network.
                </td>
            </tr>
            <tr>
                <td/>
                <td>25</td>
                <td>SMTP</td>
                <td>Simple Mail Transfer Protocol - simple mail transfer protocol.</td>
            </tr>
            <tr>
                <td/>
                <td>42</td>
                <td>WINS</td>
                <td>Windows Internet Name Service. The NetBIOS-Computer Name Mapping Service with host
                    IP addresses.
                </td>
            </tr>
            <tr>
                <td/>
                <td>43</td>
                <td>WHOIS</td>
                <td>"Who is". The protocol for obtaining registration data on the owners of domain
                    names and IP addresses.
                </td>
            </tr>
            <tr>
                <td/>
                <td>53</td>
                <td>DNS</td>
                <td>Domain Name System - domain name system.</td>
            </tr>
            <tr>
                <td/>
                <td>67</td>
                <td>DHCP</td>
                <td>Dynamic Host Configuration Protocol - Dynamic Host Configuration Protocol. Getting
                    dynamic IP.
                </td>
            </tr>
            <tr>
                <td/>
                <td>69</td>
                <td>TFTP</td>
                <td>Trivial File Transfer Protocol is a simple file transfer protocol.</td>
            </tr>
            <tr>
                <td/>
                <td>80</td>
                <td>HTTP / Web</td>
                <td>HyperText Transfer Protocol - hypertext transfer protocol.</td>
            </tr>
            <tr>
                <td/>
                <td>110</td>
                <td>POP3</td>
                <td>Post Office Protocol Version 3 - protocol for receiving e-mail, version 3.</td>
            </tr>
            <tr>
                <td/>
                <td>115</td>
                <td>SFTP</td>
                <td>SSH File Transfer Protocol. Secure Data Transfer Protocol.</td>
            </tr>
            <tr>
                <td/>
                <td>123</td>
                <td>NTP</td>
                <td>Network Time Protocol. The synchronization protocol of the internal clock of the
                    computer.
                </td>
            </tr>
            <tr>
                <td/>
                <td>137</td>
                <td>NetBIOS</td>
                <td>Network Basic Input / Output System. Network I / O protocol. Name service.</td>
            </tr>
            <tr>
                <td/>
                <td>138</td>
                <td>NetBIOS</td>
                <td>Network Basic Input / Output System. Network I / O protocol. Connection
                    service
                </td>
            </tr>
            <tr>
                <td/>
                <td>139</td>
                <td>NetBIOS</td>
                <td>Network Basic Input / Output System. Network I / O protocol. Session service.
                </td>
            </tr>
            <tr>
                <td/>
                <td>143</td>
                <td>IMAP</td>
                <td>Internet Message Access Protocol. Application level protocol for accessing email.
                </td>
            </tr>
            <tr>
                <td/>
                <td>161</td>
                <td>SNMP</td>
                <td>Simple Network Management Protocol is a simple network management protocol. Device
                    management.
                </td>
            </tr>
            <tr>
                <td/>
                <td>179</td>
                <td>BGP</td>
                <td>Border Gateway Protocol, Border Gateway Protocol. Dynamic Routing Protocol.</td>
            </tr>
            <tr>
                <td/>
                <td>443</td>
                <td>HTTPS</td>
                <td>HyperText Transfer Protocol Secure) - HTTP protocol that supports encryption.</td>
            </tr>
            <tr>
                <td/>
                <td>445</td>
                <td>SMB</td>
                <td>Server Message Block. The protocol of remote access to files, printers and network
                    resources.
                </td>
            </tr>
            <tr>
                <td/>
                <td>514</td>
                <td>Syslog</td>
                <td>System Log. The protocol for sending and recording messages about ongoing system
                    events.
                </td>
            </tr>
            <tr>
                <td/>
                <td>515</td>
                <td>LPD</td>
                <td>Line Printer Daemon. Remote printing protocol on the printer.</td>
            </tr>
            <tr>
                <td/>
                <td>993</td>
                <td>IMAP SSL</td>
                <td>The IMAP protocol that supports SSL encryption.</td>
            </tr>
            <tr>
                <td/>
                <td>995</td>
                <td>POP3 SSL</td>
                <td>POP3 protocol supporting SSL encryption.</td>
            </tr>
            <tr>
                <td/>
                <td>1080</td>
                <td>SOCKS</td>
                <td>SOCKet Secure. The protocol for obtaining secure anonymous access.</td>
            </tr>
            <tr>
                <td/>
                <td>1194</td>
                <td>OpenVPN</td>
                <td>Open implementation of Virtual Private Network (VPN) technology.</td>
            </tr>
            <tr>
                <td/>
                <td>1433</td>
                <td>MSSQL</td>
                <td>Microsoft SQL Server - database management system. Port access to the database.
                </td>
            </tr>
            <tr>
                <td/>
                <td>1702</td>
                <td>L2TP (IPsec)</td>
                <td> Virtual Private Networks Support Protocol. As well as a set of data
                    protection protocols.
                </td>
            </tr>
            <tr>
                <td/>
                <td>1723</td>
                <td>PPTP</td>
                <td>Tunnel protocol for secure connection with a point-to-point server.</td>
            </tr>
            <tr>
                <td/>
                <td>3000</td>
                <td>Dev</td>
                <td>Popular port for web-development.</td>
            </tr>
            <tr>
                <td/>
                <td>3128</td>
                <td>Proxy</td>
                <td>This port is often used by proxy servers.</td>
            </tr>
            <tr>
                <td/>
                <td>3268</td>
                <td>LDAP</td>
                <td>Lightweight Directory Access Protocol - a lightweight directory access protocol
                    (directory service).
                </td>
            </tr>
            <tr>
                <td/>
                <td>3306</td>
                <td>MySQL</td>
                <td>Access to MySQL databases.</td>
            </tr>
            <tr>
                <td/>
                <td>3389</td>
                <td>RDP</td>
                <td>Remote Desktop Protocol - Remote Desktop Protocol for Windows.</td>
            </tr>
            <tr>
                <td/>
                <td>5432</td>
                <td>PostgreSQL</td>
                <td>Access to PostgreSQL databases.</td>
            </tr>
            <tr>
                <td/>
                <td>5060</td>
                <td>SIP</td>
                <td>Protocol for establishing a session and transmitting multimedia content.</td>
            </tr>
            <tr>
                <td/>
                <td>5900</td>
                <td>VNC</td>
                <td>Virtual Network Computing - a system for remote access to the desktop computer.</td>
            </tr>
            <tr>
                <td/>
                <td>5938</td>
                <td>TeamViewer</td>
                <td>TeamViewer is a system for providing remote control of a computer and data
                    exchange.
                </td>
            </tr>
            <tr>
                <td/>
                <td>8080</td>
                <td>HTTP / Web</td>
                <td>Alternative port for HTTP protocol. Sometimes used by proxy servers.</td>
            </tr>
            <tr>
                <td/>
                <td>10000</td>
                <td>NDMP</td>
                <td>Popular port: Webmin, SIP voice, VPN IPSec over TCP.</td>
            </tr>
            <tr>
                <td/>
                <td>20000</td>
                <td>DNP</td>
                <td>Popular port: Usermin, SIP voice.</td>
            </tr>
            </tbody>
        </table>
    </div>;
}