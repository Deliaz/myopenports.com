import React, {Component} from 'react';
import Helmet from 'react-helmet';
import classnames from 'classnames';

import './ServiceBlock.css';

class ServiceBlock extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return <div>
			<Helmet title={this.props.pageTitle}/>

			<h1 className="title heading is-size-4">{this.props.pageTitle}</h1>

			<div
				className="service-block columns is-multiline is-centered has-text-centered is-flex">

				<div className={classnames('error-message has-text-danger ', {
					'is-hidden': !this.props.errMsg
				})}>
					{this.props.errMsg}
				</div>
				{this.props.children}
			</div>

			<div id="yandex_rtb_R-A-419701-1" style={{minHeight: '2px'}}/>
			{
				(function (w, d, n, s, t) {
					w[n] = w[n] || [];
					w[n].push(function () {
						window.Ya.Context.AdvManager.render({
							blockId: 'R-A-419701-1',
							renderTo: 'yandex_rtb_R-A-419701-1',
							async: true
						});
					});
					t = d.getElementsByTagName('script')[0];
					s = d.createElement('script');
					s.type = 'text/javascript';
					s.src = '//an.yandex.ru/system/context.js';
					s.async = true;
					t.parentNode.insertBefore(s, t);
				})(window, window.document, 'yandexContextAsyncCallbacks')
			}
		</div>;
	}
}

export default ServiceBlock;