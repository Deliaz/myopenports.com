import React, {Component} from 'react';

import ServiceBlock from '../ServiceBlock'
import classnames from 'classnames';
import isValidDomain from 'is-valid-domain';
import apiRequest from '../../api/api-request';

import './Whois.css';

const PAGE_TITLE = 'WHOIS for Domain';
const API_METHOD = 'whois';

class Whois extends Component {
    constructor(props) {
        super(props);
        this.state = {
            domain: '',
            checking: false,
            lastResult: '',
            isValidDomain: true,
            errMsg: ''
        };
    }

    runCheck() {
        let {domain} = this.state;

        const cleanDomain = domain.replace(/https?:\/\//, '');
        if (cleanDomain !== domain) {
            domain = cleanDomain;
            this.setState({
                domain: cleanDomain
            });
        }

        if (!isValidDomain(domain)) {
            this.setState({
                isValidDomain: false,
                errMsg: 'Doesn\'t seems to be a valid domain'
            });
        } else {
            this.setState({
                isValidDomain: true,
                errMsg: '',
                checking: true
            });

            apiRequest(API_METHOD, {domain})
                .then(json => this.processResult(json))
                .catch(console.error)
        }
    }

    processResult(json) {
        this.setState({
            checking: false,
            lastResult: json.whois_response || '',
            resultShown: true,
            domain: ''
        });

        // Set focus again
        if (this.domainInput) {
            this.domainInput.focus();
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
            isValidDomain: true,
            errMsg: '',
            domain: val
        });
    }


    render() {
        const {domain} = this.state;

        return (
            <div>
                <ServiceBlock pageTitle={PAGE_TITLE} errMsg={this.state.errMsg}>
                    <div className="column is-two-thirds">
                        <div className="field has-addons is-center">
                            <div className="control is-expanded">
                                <input
                                    className={classnames('input is-medium port-input has-text-centered', {
                                        'is-danger': !this.state.isValidDomain
                                    })}
                                    ref={(input) => {
                                        this.domainInput = input;
                                    }}
                                    type="text"
                                    value={domain}
                                    placeholder="example.com"
                                    onKeyPress={e => this.handleKeyPress(e)}
                                    onChange={e => this.handleChange(e)}
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

                    <div className={classnames('column is-full has-text-left', {'is-hidden': !this.state.resultShown})}>
                        <pre className="result-text">{this.state.lastResult}</pre>
                    </div>
                </ServiceBlock>

                <div className="service-description">
                    <h2 className="is-size-4">Domain and IP Information</h2>
                    <p>WHOIS ("Who is?") Is a protocol through which you can get information
                        about a domain name or an IP address.</p>

                    <p>With the help of WHOIS you can find out if the domain is busy, as well as find out contact
                        details of the domain owner, creation date, expiration date of registration and much more.</p>

                    <p>All this information is public, but some registrars allow you to hide direct contacts of the
                        domain owner. In this case, contacts of the registrar company will be indicated.</p>
                </div>
            </div>
        );
    }
}

export default Whois;