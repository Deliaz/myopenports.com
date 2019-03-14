import React, {Component} from 'react';
import Helmet from 'react-helmet';

const PAGE_TITLE = 'Site Response';

class Response extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>{PAGE_TITLE}</title>
                </Helmet>

                <h1 className="title">{PAGE_TITLE}</h1>

                <div className="service-block">

                    <div className="columns is-mobile is-centered">
                        <div className="column is-three-quarters">

                            <div className="field has-addons is-center">
                                <div className="control is-expanded">
                                    <input className="input is-medium" type="text" placeholder="https://example.com"/>
                                </div>
                                <div className="control">
                                    <a className="button is-info is-medium">
                                        Get response
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque fugiat ipsum itaque optio, porro quo
                    repellendus tempora veritatis? Animi aspernatur explicabo harum inventore minima numquam possimus
                    quae quod reprehenderit ullam?
                </div>
            </div>
        );
    }
}

export default Response;