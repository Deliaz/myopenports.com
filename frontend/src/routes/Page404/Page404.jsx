import React from 'react';
import {useTranslation} from 'react-i18next';

import notFoundImg from './404.png';

export default function Page404 () {
	const {t} = useTranslation();

	return <div>
		<h1 className="is-size-4 heading title">{t('p_404_pageTitle')}</h1>

		<img src={notFoundImg} alt="404"/>
	</div>;
}