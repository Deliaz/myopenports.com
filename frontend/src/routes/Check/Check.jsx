import React, {Component} from 'react';
import classnames from 'classnames';
import {withTranslation} from 'react-i18next';

import ServiceBlock from '../ServiceBlock'
import apiRequest from '../../api/api-request';
import './Check.css'

import enDesc from './desc-en';
import ruDesc from './desc-ru';

const MIN_PORT = 1;
const MAX_PORT = 65535;
const API_METHOD = 'checkport';

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
                errMsg: this.props.t('p_check_errBadPort')
            });
            return;
        }

        const portNumber = parseInt(port);
        if (portNumber < MIN_PORT || portNumber > MAX_PORT) {
            this.setState({
                isValidPort: false,
                errMsg: this.props.t('p_check_errBadPort')
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
                        errMsg: this.props.t('common_serverErrorMsg')
                    });
                });
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
        const {t} = this.props;

        return (
            <div>
                <ServiceBlock pageTitle={t('p_check_pageTitle')} errMsg={this.state.errMsg}>

                    <div className="column is-three-fifths action-block">
                        <div className="field has-addons is-center has-addons">
                            <p className="control">
                                <a className="button is-static is-medium">
                                    {t('p_check_port')}
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
                                    {t('p_check_check')}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className={classnames('column is-three-fifths notification result-block', {
                        'is-hidden': !this.state.resultShown,
                        'is-open-color': this.state.lastResult,
                        'is-close-color': !this.state.lastResult
                    })}>
                        <button className="delete" onClick={() => {
                            this.closeResultHandler()
                        }}/>
                        <span className="result-port-number">{t('p_check_port')} <strong>{this.state.lastPort}</strong></span>
                        {this.state.lastProtocol ?
                            <span className="result-port-protocol">[{this.state.lastProtocol}]</span> : ''}
                        <span>{t('p_check_is')} {this.state.lastResult ? t('p_check_open') : t('p_check_closed')}</span>
                    </div>
                </ServiceBlock>

                <div className="service-description">
                    {this.props.i18n.language.includes('ru') ? ruDesc() : enDesc()}
                </div>
            </div>
        );
    }
}

export default withTranslation()(Check);