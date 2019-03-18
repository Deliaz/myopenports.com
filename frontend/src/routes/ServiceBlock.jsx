import React, {Component} from 'react';
import Helmet from 'react-helmet';
import classnames from 'classnames';

import './ServiceBlock.css'

class ServiceBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return <div>
            <Helmet>
                <title>{this.props.pageTitle}</title>
            </Helmet>


            <h1 className="title heading is-size-4">{this.props.pageTitle}</h1>

            <div
                className="service-block columns is-multiline is-centered has-text-centered">

                <div className={classnames('error-message has-text-danger ', {
                    'is-hidden': !this.props.errMsg
                })}>
                    {this.props.errMsg}
                </div>
                {this.props.children}
            </div>
        </div>
    }
}

export default ServiceBlock;