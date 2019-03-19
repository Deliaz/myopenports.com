import React from 'react';

export default function () {
    return <div>
        <h2 className="is-size-4">Port and protocol specifications</h2>
        <p>This service allows you to map the port number to one or more network protocols, within which
            this port is usually used. The service is useful when the reason for opening the port is
            unknown.</p>

        <p>For the search, the official database of ports and protocols from IANA (Internet Assigned Numbers
            Authority) is used. The IANA is the organization that manages Internet protocol parameters, as
            well as IP address spaces and top-level domains.</p>

        <h3 className="is-size-5">Port ranges</h3>
        <p>The entire range of port numbers (from 0 to 65535) is divided into three categories.</p>

        <strong>0 - 1023 Well-Known Ports</strong>
        <p>The numbers are reserved by IANA for system processes or network programs with administrative
            rights. Ports from this category should not be used without registering with IANA.</p>

        <strong>1024 - 49151 Registered ports</strong>
        <p>Ports registered for use by conventional programs and application layer protocols. This category
            of ports is most popular for commercial software. Registration is also required to use any
            port.</p>

        <strong>49152 - 65535 Dynamic Ports</strong>
        <p>Designed for free but temporary use. Registration of ports in this category is not possible.</p>
    </div>;
}