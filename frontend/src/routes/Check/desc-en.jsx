import React from 'react';

export default function () {
    return <div>
        <h2 className="is-size-4">What does the port check result mean?</h2>
        <p className="is-size-5">Port status is <strong className="tag is-closed-color">closed</strong></p>
        <p>Connecting to this port is currently not possible. Malicious programs or intruders cannot use
            this
            port to attack or obtain confidential information. If all unknown ports have the status of
            "closed",
            then this means a good level of protection of the computer from network threats.</p>

        <p>If the port should be open, then this is a bad indicator. The reason for the port inaccessibility
            may be incorrect configuration of network equipment or software. Check the access rights of
            programs
            to the network in the firewall. Make sure the ports are routed through the router.</p>

        <p>The "port closed" result can also be obtained if the port is open, but the response time of your
            computer on the network (ping) is too high. It is practically impossible to connect to the port
            in
            such conditions.</p>

        <p className="is-size-5">Port status is <strong className="tag is-open-color">opened</strong></p>
        <p>
            You can connect to this port, it is accessible from the Internet. If this is what is required -
            fine.</p>

        <p>If the reason for which the port may be open is unknown, then it is worth checking the running
            programs and services. Perhaps some of them quite legally use this port to work with the
            network.
            There is a possibility that the port is open due to unauthorized / malicious software. In this
            case,
            it is recommended to check the computer with an antivirus.</p>
    </div>;
}