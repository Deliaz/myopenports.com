import React, {Component} from 'react';
import classnames from 'classnames';

import ServiceBlock from '../ServiceBlock'
import apiRequest from '../../api/api-request';

const PAGE_TITLE = 'Port information';

const MIN_PORT = 1;
const MAX_PORT = 65535;
const API_METHOD = 'portinfo';

const BAD_PORT_ERR_MSG = 'Port number should be in range from 1 to 65535';
const SERVER_ERR_MSG = 'Server error. Please try again later.';

class Protocols extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checking: false,
            port: '',
            lastPort: '',
            errMsg: '',
            lastResult: false,
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
        const info = json.info;
        this.setState({
            checking: false,
            lastPort: this.state.port,
            lastResult: info,
            port: '',
            resultShown: true
        });

        // Set focus again
        if (this.portInput) {
            this.portInput.focus();
        }
    }

    printResults() {
        const result = this.state.lastResult;
        if (result) {
            return <div className="box has-text-left">
                <div>Port: <strong>{this.state.lastPort}</strong></div>
                <div>Name: <strong>{result.name}</strong></div>
                <div>Description: <strong>{result.description}</strong></div>
            </div>
        } else {
            return <div className="box has-text-centered">
                Port <strong>{this.state.lastPort}</strong> is not assigned to any protocol
            </div>
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
                    <div className="column is-three-fifths action-block">
                        <div className="field has-addons is-center has-addons">
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
                                    Get info
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className={classnames('column is-two-thirds', {
                        'is-hidden': !this.state.resultShown
                    })}>
                        {this.printResults()}
                    </div>
                </ServiceBlock>

                <div className="service-description">
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
                </div>
            </div>
        );
    }
}

export default Protocols;