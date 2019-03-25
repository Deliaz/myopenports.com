import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';
import './index.css';
import App from './App';
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';
import { YMInitializer } from 'react-yandex-metrika';
import * as Sentry from '@sentry/browser';

if (process.env.NODE_ENV === 'production') {
	// Init Sentry integration
	Sentry.init({dsn: 'https://e3e1cef0a9db45a88c11c3cfb53ce7bf@sentry.io/1423042'});
}

ReactDOM.render(
	<I18nextProvider i18n={i18n}>
		<YMInitializer accounts={[52922749]} />
		<App/>
	</I18nextProvider>,
	document.getElementById('root')
);