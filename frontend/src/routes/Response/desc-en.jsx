import React from 'react';

export default function () {
	return <div>
		<h2 className="is-size-4">Headers in the server response</h2>

		<p>This service allows you to view the server response headers and find the HTTP status code. This is the
			information that the server sends in response to an HTTP request.</p>
		<p>Headers contain information about the result of the browser request, the technologies used on the server, the
			size of the content, these cookies. Also, the behavior of the client (browser) is often transmitted in the
			server response headers.</p>

		<p>By the headers you can see exactly which web server (Apache, nginx, etc.) and the operating system are used
			on the server. You can also see the time by which the server lives.</p>
	</div>;
}