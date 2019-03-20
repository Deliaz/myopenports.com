import React, {Component} from 'react';
import uaParser from 'ua-parser-js';
import copy from 'copy-to-clipboard';
import ReactCountryFlag from 'react-country-flag';
import classnames from 'classnames';
import {withTranslation} from 'react-i18next';

import apiRequest from '../api/api-request';
import getLocalIp from './local-ip';

import './QuickInfo.css'
import iconCopy from './icon-copy.svg';

const METHOD_NAME = 'clientinfo';
const DELAY_RESTORE_COPY_BTN = 4500;

class QuickInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uaInfo: uaParser(window.navigator.userAgent),
            ip: '',
            city: '',
            country: '',
            region: '',
            localIp: '',
            ipCopied: false
        };
    }

    componentDidMount() {
        apiRequest(METHOD_NAME)
            .then(json => {
                this.setState({
                    ip: json.ip,
                    city: json.city,
                    country: json.country,
                    region: json.region
                })
            })
            .catch(e => {
                console.error(e);
            });

        getLocalIp()
            .then(localIp => {
                this.setState({
                    localIp
                });
            })
            .catch(err => {
                // Just prints error and do nothing
                console.error(err);
            });
    }

    getLocationInfo() {
        const {city = '', country, region} = this.state;

        if (city || country || region) {
            let str = country || '';
            str += city ? ` - ${city}` : '';
            str += region ? ` (${region})` : '';
            return <tr>
                <td>{this.props.t('sidebar_quickInfoLocations')}</td>
                <td>
                    <span className="country-flag">
                        <ReactCountryFlag code={country.toLowerCase()} svg/>
                    </span>
                    <span>{str}</span>
                </td>
            </tr>
        }

        return null;
    }

    handleCopyClick() {
        copy(this.state.ip);

        this.setState({
            ipCopied: true
        });

        setTimeout(() => {
            this.setState({
                ipCopied: false
            });
        }, DELAY_RESTORE_COPY_BTN);
    }

    printLocalIp() {
        if (!this.state.localIp) {
            return null;
        }

        return <tr>
            <td>{this.props.t('sidebar_quickInfoLocalIp')}</td>
            <td>
                <div className="control">
                    <div className="tags has-addons">
                        <span className="tag is-medium ip-tag is-white">{this.state.localIp}</span>
                    </div>
                </div>
            </td>
        </tr>
    }

    render() {
        const browserStr = `${this.state.uaInfo.browser.name} ${this.state.uaInfo.browser.version}`;
        const osStr = `${this.state.uaInfo.os.name} ${this.state.uaInfo.os.version}`;
        const {t} = this.props;

        return <table className="table is-fullwidth quick-browser-info">
            <tbody>
            <tr>
                <td>{t('sidebar_quickInfoYourIp')}</td>
                <td>
                    <div className="control">
                        <div className="tags has-addons">
                            <span className="tag is-primary is-medium ip-tag">{this.state.ip}</span>
                            <span className={classnames('tag is-medium ip-copy-btn', {
                                'is-copied': this.state.ipCopied
                            })}
                                  onClick={() => this.handleCopyClick()}>
                                <img src={iconCopy} alt="Copy Icon" className={classnames('copy-icon', {
                                    'copied': this.state.ipCopied
                                })}/>
                            </span>
                        </div>
                    </div>
                </td>
            </tr>
            {this.printLocalIp()}
            <tr>
                <td>{t('sidebar_quickInfoBrowser')}</td>
                <td>{browserStr}</td>
            </tr>
            <tr>
                <td title="Operating System">{t('sidebar_quickInfoOS')}</td>
                <td>{osStr}</td>
            </tr>
            {this.getLocationInfo()}
            </tbody>
        </table>;
    }
}

export default withTranslation()(QuickInfo);