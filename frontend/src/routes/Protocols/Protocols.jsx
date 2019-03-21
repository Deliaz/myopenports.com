import React, {Component} from 'react';
import classnames from 'classnames';
import {withTranslation} from 'react-i18next';

import ServiceBlock from '../ServiceBlock';
import apiRequest from '../../api/api-request';

import enDesc from './desc-en';
import ruDesc from './desc-ru';

const MIN_PORT = 1;
const MAX_PORT = 65535;
const API_METHOD = 'portinfo';

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
		const {t} = this.props;

		if (!port || isNaN(port)) {
			this.setState({
				isValidPort: false,
				errMsg: t('p_protocols_errBadPort')
			});
			return;
		}

		const portNumber = parseInt(port);
		if (portNumber < MIN_PORT || portNumber > MAX_PORT) {
			this.setState({
				isValidPort: false,
				errMsg: t('p_protocols_errBadPort')
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
				.catch(() => {
					this.setState({
						checking: false,
						lastPort: '',
						lastResult: false,
						port: '',
						errMsg: t('common_serverErrorMsg')
					});
				});
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
		const {t} = this.props;
		if (result) {
			return <div className="box has-text-left">
				<div>{t('p_protocols_port')}: <strong>{this.state.lastPort}</strong></div>
				<div>{t('p_protocols_name')}: <strong>{result.name}</strong></div>
				<div>{t('p_protocols_description')}: <strong>{result.description}</strong></div>
			</div>;
		} else {
			return <div className="box has-text-centered">
				{t('p_protocols_port')} <strong>{this.state.lastPort}</strong> {t('p_protocols_notAssigned')}
			</div>;
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
				<ServiceBlock pageTitle={t('p_protocols_pageTitle')} errMsg={this.state.errMsg}>
					<div className="column is-8-desktop is-6-fullhd is-8-touch action-block">
						<div className="field has-addons is-center">
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
									{t('p_protocols_getInfo')}
								</a>
							</div>
						</div>
					</div>

					<div className={classnames('column is-two-thirds is-10-mobile', {
						'is-hidden': !this.state.resultShown
					})}>
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

export default withTranslation()(Protocols);