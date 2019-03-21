import React from 'react';
import logo from './myopenports.svg';
import {withTranslation} from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';

import './Header.css';

function Header({i18n}) {
	return <nav className="navbar" role="navigation" aria-label="main navigation">
		<div className="container">
			<div className="navbar-brand">
				<a className="navbar-item" href="/">
					<img src={logo} alt="MyOpenPorts.com go to home"/>
					<span className="website-name">
					MyOpenPorts
						<span className="website-tld">.com</span>
					</span>
				</a>
			</div>


			<div className="navbar-menu">
				<div className="navbar-end">
					<div className="navbar-item">
						<div className="buttons">
							<a className="button is-dark is-small navbar-item" title="Russian language"
							   onClick={() => i18n.changeLanguage('ru')}>
								<span className="country-flag-header">
									<ReactCountryFlag code='ru' svg/>
								</span>
								Русский
							</a>

							<a className="button is-dark is-small navbar-item" title="English language"
							   onClick={() => i18n.changeLanguage('en')}>
								<span className="country-flag-header">
									<ReactCountryFlag code='us' svg/>
								</span>
								English
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>;
}

export default withTranslation()(Header);