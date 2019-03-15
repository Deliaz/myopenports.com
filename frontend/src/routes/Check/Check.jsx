import React, {Component} from 'react';
import Helmet from 'react-helmet';
import classnames from 'classnames';

import apiRequest from '../../api/api-request';
import './Check.css'

const PAGE_TITLE = 'Check port status';

const MIN_PORT = 1;
const MAX_PORT = 65535;
const API_METHOD = 'checkport';

class Check extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checking: false,
            port: '',
            lastResult: false,
            isValidPort: true, // assume it is valid by default
            resultShown: false
        };
    }

    runCheck() {
        const {port} = this.state;

        if (!port || isNaN(port)) {
            this.setState({
                isValidPort: false
            });
        } else {
            const portNumber = parseInt(port);
            if (portNumber < MIN_PORT || portNumber > MAX_PORT) {
                this.setState({
                    isValidPort: false
                });
            } else {
                this.setState({
                    isValidPort: true,
                    checking: true,
                    resultShown: false
                });

                apiRequest(API_METHOD, {
                    port: this.state.port
                })
                    .then(json => {
                        const isOpened = json.port_status === 'open';
                        this.setState({
                            checking: false,
                            lastPort: this.state.port,
                            lastResult: isOpened,
                            port: '',
                            resultShown: true
                        });
                    })
                    .catch(err => {
                        console.error(err);
                    });

                // TODO Set focus again
            }
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
                <Helmet>
                    <title>{PAGE_TITLE}</title>
                </Helmet>

                <h1 className="title">{PAGE_TITLE}</h1>

                <div
                    className="service-block check-port columns is-multiline is-centered is-vcentered has-text-centered">

                    <div className={classnames('error-message has-text-danger ', {
                        'is-hidden': this.state.isValidPort
                    })}>
                        Port number should be in range from 1 to 65535
                    </div>

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
                                    type="text"
                                    value={port}
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
                        Port <strong>{this.state.lastPort}</strong> is {this.state.lastResult ? 'open' : 'close'}
                    </div>
                </div>

                <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fugiat ipsum itaque optio, porro quo
                    repellendus tempora veritatis? Animi aspernatur explicabo harum inventore minima numquam possimus
                    quae quod reprehenderit ullam?
                </div>
            </div>
        );
    }
}

export default Check;