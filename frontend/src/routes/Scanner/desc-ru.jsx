import React from 'react';

export default function () {
	return <div>
		<h2 className="is-size-4">О сканнере</h2>
		<p>Сканер портов позволяет произвести экспресс-проверку наиболее популярных портов на вашем компьютере.
			Сканирование длится менее минуты, после чего будет выведен результат, в виде таблицы.</p>

		<p>Стоит отметить, что при таком экспресс-сканировании время, отведенное на подключение к порту меньше, чем при
			обычной проверке порта.</p>

		<h3 className="is-size-4">
			Какие порты проверяются?
		</h3>
		<br/>
		<table className="table is-narrow is-striped port-table">
			<thead>
			<tr>
				<th>№</th>
				<th>Порт</th>
				<th>Протокол</th>
				<th>Описание</th>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td/>
				<td>20</td>
				<td>FTP Data</td>
				<td>File Transfer Protocol — протокол передачи файлов. Порт для данных.</td>
			</tr>
			<tr>
				<td/>
				<td>21</td>
				<td>FTP Control</td>
				<td>File Transfer Protocol — протокол передачи файлов. Порт для команд.</td>
			</tr>
			<tr>
				<td/>
				<td>22</td>
				<td>SSH</td>
				<td>Secure SHell — "безопасная оболочка". Протокол удаленного управления операционной системой.</td>
			</tr>
			<tr>
				<td/>
				<td>23</td>
				<td>telnet</td>
				<td>TErminaL NETwork. Протокол реализации текстового интерфейса по сети.</td>
			</tr>
			<tr>
				<td/>
				<td>25</td>
				<td>SMTP</td>
				<td>Simple Mail Transfer Protocol — простой протокол передачи почты.</td>
			</tr>
			<tr>
				<td/>
				<td>42</td>
				<td>WINS</td>
				<td>Windows Internet Name Service. Служба сопоставления NetBIOS-имён компьютеров с IP-адресами узлов.
				</td>
			</tr>
			<tr>
				<td/>
				<td>43</td>
				<td>WHOIS</td>
				<td>"Who is". Протокол получения регистрационных данных о владельцах доменных имён и IP адресах.</td>
			</tr>
			<tr>
				<td/>
				<td>53</td>
				<td>DNS</td>
				<td>Domain Name System — система доменных имён.</td>
			</tr>
			<tr>
				<td/>
				<td>67</td>
				<td>DHCP</td>
				<td>Dynamic Host Configuration Protocol — протокол динамической настройки узла. Получение динамических
					IP.
				</td>
			</tr>
			<tr>
				<td/>
				<td>69</td>
				<td>TFTP</td>
				<td>Trivial File Transfer Protocol — простой протокол передачи файлов.</td>
			</tr>
			<tr>
				<td/>
				<td>80</td>
				<td>HTTP / Web</td>
				<td>HyperText Transfer Protocol — протокол передачи гипертекста.</td>
			</tr>
			<tr>
				<td/>
				<td>110</td>
				<td>POP3</td>
				<td>Post Office Protocol Version 3 — протокол получения электронной почты, версия 3.</td>
			</tr>
			<tr>
				<td/>
				<td>115</td>
				<td>SFTP</td>
				<td>SSH File Transfer Protocol. Протокол защищенной передачи данных.</td>
			</tr>
			<tr>
				<td/>
				<td>123</td>
				<td>NTP</td>
				<td>Network Time Protocol. Протокол синхронизации внутренних часов компьютера.
				</td>
			</tr>
			<tr>
				<td/>
				<td>137</td>
				<td>NetBIOS</td>
				<td>Network Basic Input/Output System. Протокол обеспечения сетевых операций ввода/вывода. Служба
					имен.
				</td>
			</tr>
			<tr>
				<td/>
				<td>138</td>
				<td>NetBIOS</td>
				<td>Network Basic Input/Output System. Протокол обеспечения сетевых операций ввода/вывода. Служба
					соединения.
					service
				</td>
			</tr>
			<tr>
				<td/>
				<td>139</td>
				<td>NetBIOS</td>
				<td>Network Basic Input/Output System. Протокол обеспечения сетевых операций ввода/вывода. Служба
					сессий.
				</td>
			</tr>
			<tr>
				<td/>
				<td>143</td>
				<td>IMAP</td>
				<td>Internet Message Access Protocol. Протокол прикладного уровня для доступа к электронной
					почте.
				</td>
			</tr>
			<tr>
				<td/>
				<td>161</td>
				<td>SNMP</td>
				<td>Simple Network Management Protocol — простой протокол сетевого управления. Управление
					устройствами.
				</td>
			</tr>
			<tr>
				<td/>
				<td>179</td>
				<td>BGP</td>
				<td>Border Gateway Protocol, протокол граничного шлюза. Протокол динамической маршрутизации.</td>
			</tr>
			<tr>
				<td/>
				<td>443</td>
				<td>HTTPS</td>
				<td>HyperText Transfer Protocol Secure) — протокол HTTP, поддерживающий шифрование.</td>
			</tr>
			<tr>
				<td/>
				<td>445</td>
				<td>SMB</td>
				<td>Server Message Block. Протокол удалённого доступа к файлам, принтерам и сетевым ресурсам.
				</td>
			</tr>
			<tr>
				<td/>
				<td>514</td>
				<td>Syslog</td>
				<td>System Log. Протокол отправки и регистрации сообщений о происходящих системных событиях.
				</td>
			</tr>
			<tr>
				<td/>
				<td>515</td>
				<td>LPD</td>
				<td>Line Printer Daemon. Протокол удаленной печати на принтере.</td>
			</tr>
			<tr>
				<td/>
				<td>993</td>
				<td>IMAP SSL</td>
				<td>Протокол IMAP, поддерживающий SSL шифрование.</td>
			</tr>
			<tr>
				<td/>
				<td>995</td>
				<td>POP3 SSL</td>
				<td>Протокол POP3 поддерживающий SSL шифрование.</td>
			</tr>
			<tr>
				<td/>
				<td>1080</td>
				<td>SOCKS</td>
				<td>SOCKet Secure. Протокол получения защищенного анонимного доступа.</td>
			</tr>
			<tr>
				<td/>
				<td>1194</td>
				<td>OpenVPN</td>
				<td>Открытая реализация технологии Виртуальной Частной Сети (VPN).</td>
			</tr>
			<tr>
				<td/>
				<td>1433</td>
				<td>MSSQL</td>
				<td>Microsoft SQL Server — система управления базами данных. Порт доступа к базе.
				</td>
			</tr>
			<tr>
				<td/>
				<td>1702</td>
				<td>L2TP (IPsec)</td>
				<td>Протокол поддержки виртуальных частных сетей. А также набор протоколов обеспечения защиты данных.
				</td>
			</tr>
			<tr>
				<td/>
				<td>1723</td>
				<td>PPTP</td>
				<td>Туннельный протокол защищённого соединения с сервером типа точка-точка.</td>
			</tr>
			<tr>
				<td/>
				<td>3000</td>
				<td>Dev</td>
				<td>Попурялный порт для веб-разработки</td>
			</tr>
			<tr>
				<td/>
				<td>3128</td>
				<td>Proxy</td>
				<td>В данный момент порт часто используется прокси-серверами.</td>
			</tr>
			<tr>
				<td/>
				<td>3268</td>
				<td>LDAP</td>
				<td>Lightweight Directory Access Protocol — облегчённый протокол доступа к каталогам (службе
					каталогов).
				</td>
			</tr>
			<tr>
				<td/>
				<td>3306</td>
				<td>MySQL</td>
				<td>Доступ к MySQL базам данных.directory access protocol
					(directory service).
				</td>
			</tr>
			<tr>
				<td/>
				<td>3389</td>
				<td>RDP</td>
				<td>Remote Desktop Protocol — протокол удалённого рабочего стола для Windows.</td>
			</tr>
			<tr>
				<td/>
				<td>5432</td>
				<td>PostgreSQL</td>
				<td>Доступ к PostgreSQL базам данных.</td>
			</tr>
			<tr>
				<td/>
				<td>5060</td>
				<td>SIP</td>
				<td>Протокол установления сеанса и передачи мультимедиа содержимого.</td>
			</tr>
			<tr>
				<td/>
				<td>5900</td>
				<td>VNC</td>
				<td>Virtual Network Computing — система удалённого доступа к рабочему столу компьютера.</td>
			</tr>
			<tr>
				<td/>
				<td>5938</td>
				<td>TeamViewer</td>
				<td>TeamViewer — система обеспечения удалённого контроля компьютера и обмена данными.</td>
			</tr>
			<tr>
				<td/>
				<td>8080</td>
				<td>HTTP / Web</td>
				<td>Альтернативный порт для HTTP протокола. Иногда используется прокси-серверами.</td>
			</tr>
			<tr>
				<td/>
				<td>10000</td>
				<td>NDMP</td>
				<td>Популярный порт: Webmin, SIP-голос, VPN IPSec over TCP.</td>
			</tr>
			<tr>
				<td/>
				<td>20000</td>
				<td>DNP</td>
				<td>Популярный порт: Usermin, SIP-голос.</td>
			</tr>
			</tbody>
		</table>
	</div>;
}