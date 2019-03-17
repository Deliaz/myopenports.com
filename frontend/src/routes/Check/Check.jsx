import React, {Component} from 'react';
import classnames from 'classnames';

import ServiceBlock from '../ServiceBlock'
import apiRequest from '../../api/api-request';
import './Check.css'

const PAGE_TITLE = 'Check port status';

const MIN_PORT = 1;
const MAX_PORT = 65535;
const API_METHOD = 'checkport';

const BAD_PORT_ERR_MSG = 'Port number should be in range from 1 to 65535';
const SERVER_ERR_MSG = 'Server error. Please try again later.';

class Check extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checking: false,
            port: '',
            errMsg: '',
            lastResult: false,
            lastProtocol: '',
            isValidPort: true, // assume it is valid by default
            resultShown: false
        };
    }

    runCheck() {
        const {port} = this.state;

        if (!port || isNaN(port)) {
            this.setState({
                isValidPort: false,
                errMsg: BAD_PORT_ERR_MSG
            });
        } else {
            const portNumber = parseInt(port);
            if (portNumber < MIN_PORT || portNumber > MAX_PORT) {
                this.setState({
                    isValidPort: false,
                    errMsg: BAD_PORT_ERR_MSG
                });
            } else {
                this.setState({
                    isValidPort: true,
                    checking: true,
                    resultShown: false,
                    errMsg: ''
                });

                apiRequest(API_METHOD, {
                    port: this.state.port
                })
                    .then(json => this.processResult(json))
                    .catch(err => {
                        console.error(err);

                        this.setState({
                            checking: false,
                            lastPort: '',
                            lastResult: false,
                            port: '',
                            errMsg: SERVER_ERR_MSG
                        });
                    });
            }
        }
    }

    processResult(json) {
        const isOpened = json.port_status;
        this.setState({
            checking: false,
            lastPort: this.state.port,
            lastResult: isOpened,
            lastProtocol: json.protocol || '',
            port: '',
            resultShown: true
        });

        // Set focus again
        if (this.portInput) {
            this.portInput.focus();
        }
    }

    handleKeyPress(e) {
        if (e.key && e.key.toLowerCase() === 'enter') {
            this.runCheck();
        }
    }

    handleChange(e) {
        const val = e.target.value;
        this.setState({
            isValidPort: true,
            errMsg: '',
            port: val
        });
    }

    closeResultHandler() {
        this.setState({
            resultShown: false
        });
    }

    render() {
        const {port} = this.state;

        return (
            <div>
                <ServiceBlock pageTitle={PAGE_TITLE} errMsg={this.state.errMsg}>
                    <div className="column is-three-fifths">
                        <div className="field has-addons is-center has-addons">
                            <p className="control">
                                <a className="button is-static is-medium">
                                    Port
                                </a>
                            </p>

                            <div className="control is-expanded">
                                <input
                                    className={classnames('input is-medium port-input has-text-centered', {
                                        'is-danger': !this.state.isValidPort
                                    })}
                                    ref={(input) => {
                                        this.portInput = input;
                                    }}
                                    type="text"
                                    value={port}
                                    placeholder="1-65535"
                                    onKeyPress={e => this.handleKeyPress(e)}
                                    onChange={e => this.handleChange(e)}
                                    maxLength="5"
                                    min="1"
                                    disabled={this.state.checking}/>
                            </div>
                            <div className="control">
                                <a className={classnames('button is-info is-medium', {'is-loading': this.state.checking})}
                                   onClick={() => this.runCheck()}>
                                    Check
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className={classnames('column is-three-fifths notification result-block', {
                        'is-hidden': !this.state.resultShown,
                        'is-success': this.state.lastResult,
                        'is-danger': !this.state.lastResult
                    })}>
                        <button className="delete" onClick={() => {
                            this.closeResultHandler()
                        }}/>
                        <span className="result-port-number">Port <strong>{this.state.lastPort}</strong></span>
                        {this.state.lastProtocol ?
                            <span className="result-port-protocol">[{this.state.lastProtocol}]</span> : ''}
                        <span>is {this.state.lastResult ? 'open' : 'closed'}</span>
                    </div>
                </ServiceBlock>

                <div className="service-description">
                    <h2 className="is-size-4">What does the port check result mean?</h2>
                    <p className="is-size-5">Port status is <strong className="tag is-danger">closed</strong></p>
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

                    <p className="is-size-5">Port status is <strong className="tag is-success">opened</strong></p>
                    <p>
                        You can connect to this port, it is accessible from the Internet. If this is what is required -
                        fine.</p>

                    <p>If the reason for which the port may be open is unknown, then it is worth checking the running
                        programs and services. Perhaps some of them quite legally use this port to work with the
                        network.
                        There is a possibility that the port is open due to unauthorized / malicious software. In this
                        case,
                        it is recommended to check the computer with an antivirus.</p>
                </div>
            </div>
        );
    }
}

export default Check;