import React, {Component} from 'react';
import ServiceBlock from '../ServiceBlock';
import classnames from 'classnames';
import {withTranslation} from 'react-i18next';

import enDesc from './desc-en';
import ruDesc from './desc-ru';

import apiRequest from '../../api/api-request';
import './Scanner.css';

class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checking: false,
            resultShown: false,
            lastResult: null
        };
    }

    runCheck() {
        this.setState({
            checking: true
        });

        apiRequest('scanner')
            .then(json => {
                this.setState({
                    checking: false,
                    resultShown: true,
                    lastResult: json.scan_results
                })
            })
            .catch(err => {
                console.error(err);

                this.setState({
                    checking: false,
                    lastResult: null,
                    errMsg: this.props.t('common_serverErrorMsg')
                });
            });
    }

    parseResults(jsonRes) {
        if (!jsonRes || typeof jsonRes !== 'object') {
            return null;
        }
        const {t} = this.props;
        return <div className="columns is-multiline result-list">
            {
                Object.keys(jsonRes).map(port => {
                    const {status, protocol} = jsonRes[port];

                    return <div key={port} className="tags has-addons port-result-tag">
                        <span className="tag grow">{protocol}</span>
                        <span className="tag grow has-text-weight-bold">{port}</span>
                        <span className={classnames('tag', {
                            'is-open-color': status,
                            'is-closed-color': !status
                        })}>{status ? t('p_scanner_open') : t('p_scanner_closed')}</span>
                    </div>
                })
            }
        </div>;
    }

    render() {
        const {t} = this.props;

        return (
            <div>
                <ServiceBlock pageTitle={t('p_scanner_pageTitle')} errMsg={this.state.errMsg}>
                    <div className="column is-two-fifths is-centered action-block">
                        <a className={classnames('button is-info is-medium is-fullwidth', {'is-loading': this.state.checking})}
                           onClick={() => this.runCheck()}>
                            {t('p_scanner_runScanner')}
                        </a>
                    </div>

                    <div className={classnames('column is-full', {'is-hidden': !this.state.resultShown})}>
                        {this.parseResults(this.state.lastResult)}
                    </div>
                </ServiceBlock>

                <div className="service-description">
                    {this.props.i18n.language.includes('ru') ? ruDesc() : enDesc()}
                </div>

            </div>
        );
    }
}

export default withTranslation()(Scanner);