import React from "react";
import {BrowserRouter as Router, Route, Switch, NavLink} from "react-router-dom";

import './App.css'
import Header from './Header/Header'
import QuickInfo from './QuickInfo/QuickInfo'


import {Check, Scanner, Ping, Response, Protocols, Browser, Whois, Page404} from './routes';

function AppRouter() {
    return (
        <Router>
            <div className="body-container">
                <Header/>

                <div className="container main-content">
                    <div className="columns">
                        <div className="column is-one-fifth">
                            <aside className="menu">
                                <p className="menu-label">
                                    Services
                                </p>
                                <ul className="menu-list">
                                    <li><NavLink exact to="/">Check port</NavLink></li>
                                    <li><NavLink to="/scanner">Port scanner</NavLink></li>
                                    <li><NavLink to="/whois">WHOIS</NavLink></li>
                                    <li><NavLink to="/ping">Ping</NavLink></li>
                                    <li><NavLink to="/response">Site response</NavLink></li>
                                    <li><NavLink to="/browser">Browser info</NavLink></li>
                                    <li><NavLink to="/protocols">Protocols</NavLink></li>
                                </ul>
                            </aside>
                        </div>
                        <div className="column">
                            <Switch>
                                <Route exact path="/" component={Check}/>
                                <Route path="/scanner" component={Scanner}/>
                                <Route path="/whois" component={Whois}/>
                                <Route path="/ping" component={Ping}/>
                                <Route path="/response" component={Response}/>
                                <Route path="/browser" component={Browser}/>
                                <Route path="/Protocols" component={Protocols}/>
                                <Route component={Page404}/>
                            </Switch>
                        </div>

                        <div className="column is-one-quarter">
                            <p className="menu-label">
                                Browser info
                            </p>
                            <div>
                                <QuickInfo/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Router>


    );
}

export default AppRouter;