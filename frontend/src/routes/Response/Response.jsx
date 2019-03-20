import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {isWebUri} from 'valid-url';
import Url from 'url';
import isIpCheck from 'is-ip';

import ServiceBlock from '../ServiceBlock'
import classnames from 'classnames';
import apiRequest from '../../api/api-request';

import enDesc from './desc-en';
import ruDesc from './desc-ru';

import './Response.css';

const API_METHOD = 'response';

class Whois extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: '',
            lastUri: '',
            checking: false,
            lastResult: '',
            lastResultCode: null,
            lastResultCodeMsg: null,
            lastResultRedirects: [],
            isValidUri: true,
            resultShown: false,
            errMsg: ''
        };
    }

    runCheck() {
        let {uri} = this.state;
        const isIp = isIpCheck(uri);

        // Prepend protocol
        if (!uri.startsWith('http') && !isIp) {
            uri = 'http://' + uri;
        }
        const parsedUri = Url.parse(uri);

        if (!isIp) {
            if (!parsedUri.hostname || !parsedUri.hostname.includes('.')) {
                this.setState({
                    isValidUri: false,
                    errMsg: this.props.t('p_response_errInvalidUri')
                });
                return;
            }

            if (!isWebUri(uri)) {
                this.setState({
                    isValidUri: false,
                    errMsg: this.props.t('p_response_errInvalidUri')
                });
                return;
            }
        }

        this.setState({
            isValidUri: true,
            errMsg: '',
            checking: true
        });

        apiRequest(API_METHOD, {uri})
            .then(json => this.processResult(json))
            .catch(err => this.processError(err));
    }

    processResult(json) {
        this.setState({
            checking: false,
            lastResult: json.response.headers,
            lastResultCode: json.response.code,
            lastResultCodeMsg: json.response.code_msg,
            lastResultRedirects: json.response.redirects,
            resultShown: true,
            uri: '',
            lastUri: this.state.uri
        });

        // Set focus again
        if (this.uriInput) {
            this.uriInput.focus();
        }
    }

    processError(err) {
        if (err && err.code_name === 'not_found') {
            this.setState({
                errMsg: this.props.t('p_response_errUriNotFound')
            });
        } else {
            this.setState({
                errMsg: this.props.t('common_serverErrorMsg')
            });
        }

        this.setState({
            uri: '',
            lastUri: '',
            checking: false,
            isValidUri: true,
            lastResults: null,
            resultShown: false
        });
    }

    printResults() {
        const response = this.state.lastResult;

        if (response) {
            const headers = Object.keys(response);

            return headers.map(header => {
                const val = typeof response[header] === 'string' ? response[header] : response[header].join('<br>');

                return <div key={header} className="">
                    <div className="has-text-weight-bold">{header}</div>
                    <div className="is-family-monospace header-value">{val}</div>
                    <hr/>
                </div>;
            })
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
            isValidUri: true,
            errMsg: '',
            uri: val
        });
    }


    render() {
        const {uri} = this.state;
        const {t} = this.props;

        return (
            <div>
                <ServiceBlock pageTitle={t('p_response_pageTitle')} errMsg={this.state.errMsg}>
                    <div className="column is-10 action-block">
                        <div className="field has-addons is-center">
                            <p className="control">
                                <a className="button is-static is-medium">
                                    {t('p_response_url')}
                                </a>
                            </p>

                            <div className="control is-expanded">
                                <input
                                    className={classnames('input is-medium has-text-centered', {
                                        'is-danger': !this.state.isValidUri
                                    })}
                                    ref={(input) => {
                                        this.uriInput = input;
                                    }}
                                    type="text"
                                    value={uri}
                                    placeholder="https://example.com"
                                    onKeyPress={e => this.handleKeyPress(e)}
                                    onChange={e => this.handleChange(e)}
                                    disabled={this.state.checking}/>
                            </div>
                            <div className="control">
                                <a className={classnames('button is-info is-medium', {'is-loading': this.state.checking})}
                                   onClick={() => this.runCheck()}>
                                    {t('p_response_actionBtnTitle')}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div
                        className={classnames('has-text-left result-text-block column is-11', {'is-hidden': !this.state.resultShown})}>
                        <div className="has-text-weight-semibold request-uri">URL: {this.state.lastUri}</div>
                        <div className="redirect-chain-block">
                            {this.state.lastResultRedirects.map(redir => {
                                return <div key={redir.redirectUri} className="redirect-chain-item">
                                    &rarr; <span className="tag is-dark">{redir.statusCode}</span>
                                    <span className="is-family-monospace redirect-uri">{redir.redirectUri}</span>
                                </div>;
                            })}
                        </div>
                        <div>
                            <div className="control tag-response-code">
                                <span>&rarr; </span>
                                <div className="tags has-addons is-inline-block">
                                    <span className="tag is-dark">{this.state.lastResultCode}</span>
                                    <span className="tag is-primary">{this.state.lastResultCodeMsg}</span>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        {this.printResults()}
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