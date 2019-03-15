import React, {Component} from 'react';
import Helmet from 'react-helmet';

const PAGE_TITLE = 'Your Browser Info';

class Browser extends Component {
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
                        <div className="column is-two-fifths">

                            <table className="table is-fullwidth is-bordered is-transparent">
                                <thead>
                                <tr>
                                    <th>One</th>
                                    <th>Two</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Three</td>
                                    <td>Four</td>
                                </tr>
                                <tr>
                                    <td>Five</td>
                                    <td>Six</td>
                                </tr>
                                <tr>
                                    <td>Seven</td>
                                    <td>Eight</td>
                                </tr>
                                <tr>
                                    <td>Nine</td>
                                    <td>Ten</td>
                                </tr>
                                <tr>
                                    <td>Eleven</td>
                                    <td>Twelve</td>
                                </tr>
                                </tbody>
                            </table>

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

export default Browser;