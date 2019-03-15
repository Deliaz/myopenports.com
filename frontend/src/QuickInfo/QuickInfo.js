import React, {Component} from 'react';
import uaParser from 'ua-parser-js';
import copy from 'copy-to-clipboard';
import ReactCountryFlag from 'react-country-flag';
import classnames from 'classnames';

import apiRequest from '../api/api-request';

import './QuickInfo.css'

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
    }

    getLocationInfo() {
        const {city = '', country, region} = this.state;

        if (city || country || region) {
            const str = (country ? country + ' - ' : '') + city + (city ? ` (${region})` : region);
            return <tr>
                <td>Location</td>
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

    render() {
        const browserStr = `${this.state.uaInfo.browser.name} ${this.state.uaInfo.browser.version}`;
        const osStr = `${this.state.uaInfo.os.name} ${this.state.uaInfo.os.version}`;

        return <table className="table is-fullwidth quick-browser-info">
            <tbody>
            <tr>
                <td>Your IP</td>
                <td>
                    <div className="control">
                        <div className="tags has-addons">
                            <span className="tag is-primary is-medium ip-tag">{this.state.ip}</span>
                            <span className={classnames('tag is-medium ip-copy-btn', {
                                'is-copied': this.state.ipCopied
                            })}
                               onClick={() => this.handleCopyClick()}>
                                {!this.state.ipCopied ? 'copy' : 'copied'}
                            </span>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>Browser</td>
                <td>{browserStr}</td>
            </tr>
            <tr>
                <td>OS</td>
                <td>{osStr}</td>
            </tr>
            {this.getLocationInfo()}
            </tbody>
        </table>;
    }
}

export default QuickInfo;