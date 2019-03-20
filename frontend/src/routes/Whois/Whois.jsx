import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';

import ServiceBlock from '../ServiceBlock'
import classnames from 'classnames';
import checkValidDomain from 'is-valid-domain';
import apiRequest from '../../api/api-request';

import enDesc from './desc-en';
import ruDesc from './desc-ru';

import './Whois.css';

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

        if (!checkValidDomain(domain)) {
            this.setState({
                isValidDomain: false,
                errMsg: this.props.t('p_whois_errInvalidDomain')
            });
        } else {
            this.setState({
                isValidDomain: true,
                errMsg: '',
                checking: true
            });

            apiRequest(API_METHOD, {domain})
                .then(json => this.processResult(json))
                .catch(() => {
                    this.setState({
                        domain: '',
                        checking: false,
                        isValidDomain: true,
                        errMsg: this.props.t('common_serverErrorMsg')
                    });
                })
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
        const {t} = this.props;

        return (
            <div>
                <ServiceBlock pageTitle={t('p_whois_pageTitle')} errMsg={this.state.errMsg}>
                    <div className="column is-two-thirds-widescreen is-11-touch action-block">
                        <div className="field has-addons is-center">
                            <p className="control is-hidden-touch">
                                <span className="button is-static is-medium">
                                    {t('p_whois_domain')}
                                </span>
                            </p>

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
                                    {t('p_whois_actionBtnTitle')}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div
                        className={classnames('has-text-left result-text-block', {'is-hidden': !this.state.resultShown})}>
                        <pre className="result-text">{this.state.lastResult}</pre>
                    </div>
                </ServiceBlock>

                <div className="service-description">
                    {this.props.i18n.language.includes('ru') ? ruDesc() : enDesc()}
                </div>
            </div>
        );
    }
}

export default withTranslation()(Whois);