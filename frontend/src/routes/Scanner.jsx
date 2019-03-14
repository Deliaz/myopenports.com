import React, {Component} from 'react';
import Helmet from 'react-helmet';

const PAGE_TITLE = 'Port Scanner';

class Scanner extends Component {
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
                        <div className="column is-two-fifths is-centered">

                            <a className="button is-info is-fullwidth is-medium">Start scanner</a>

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

export default Scanner;