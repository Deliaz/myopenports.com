import React, {Component} from 'react';
import uaParser from 'ua-parser-js';
import copy from 'copy-to-clipboard';
import ReactCountryFlag from 'react-country-flag';
import classnames from 'classnames';
import {withTranslation} from 'react-i18next';

import apiRequest from '../api/api-request';
import getLocalIp from './local-ip';

import './QuickInfo.css';
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

		this._isMounted = false;
	}

	componentDidMount() {
		this._isMounted = true;
		this._isMounted && this.requestInformation();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	requestInformation() {
		apiRequest(METHOD_NAME)
			.then(json => {
				this._isMounted && this.setState({
					ip: json.ip,
					city: json.city,
					country: json.country,
					region: json.region
				});
			})
			.catch(e => {
				console.error(e);
			});

		getLocalIp()
			.then(localIp => {
				this._isMounted && this.setState({
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

			return <div className="info-item-wrapper">
				<div className="info-title">
					{this.props.t('sidebar_quickInfoLocations')}
				</div>
				<div className="has-text-right">
					<span className="country-flag">
						<ReactCountryFlag code={country.toLowerCase()} svg/>
					</span>
					<span>{str}</span>
				</div>
			</div>;
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

		return <div className="info-item-wrapper">
			<div className="info-title">{this.props.t('sidebar_quickInfoLocalIp')}</div>
			<div className="control is-pulled-right">
				<div className="tags has-addons">
					<span className="tag is-medium ip-tag is-white">{this.state.localIp}</span>
				</div>
			</div>
		</div>;
	}

	render() {
		const browserStr = `${this.state.uaInfo.browser.name} ${this.state.uaInfo.browser.version}`;
		const osStr = `${this.state.uaInfo.os.name} ${this.state.uaInfo.os.version}`;
		const ua = this.state.uaInfo.ua;
		const {t} = this.props;
		return <div>
			<div className="info-item-wrapper">
				<div className="info-title">{t('sidebar_quickInfoYourIp')}</div>
				<div>
					<div className="control is-pulled-right">
						<div className="tags has-addons">
							<span className="tag is-primary is-medium ip-tag">{this.state.ip}</span>
							<a title="Copy IP" data-tooltip="Copy IP"
							   className={classnames('tag is-medium ip-copy-btn', {
								   'is-copied': this.state.ipCopied
							   })}
							   onClick={() => this.handleCopyClick()}>
								<img src={iconCopy} alt="Copy Icon" className={classnames('copy-icon', {
									'copied': this.state.ipCopied
								})}/>
							</a>
						</div>
					</div>
				</div>
			</div>
			{this.printLocalIp()}

			<div className="info-item-wrapper">
				<div className="info-title">{t('sidebar_quickInfoBrowser')}</div>
				<div className="has-text-right">
					{browserStr}
				</div>
			</div>

			<div className="info-item-wrapper">
				<div className="info-title">
					{t('sidebar_quickInfoOS')}
				</div>
				<div className="has-text-right">
					{osStr}
				</div>
			</div>

			<div className="info-item-wrapper">
				<div className="info-title">
					{t('sidebar_quickInfoUA')}
				</div>
				<div className="is-size-7">
					{ua}
				</div>
			</div>

			{this.getLocationInfo()}
		</div>;
	}
}

export default withTranslation()(QuickInfo);