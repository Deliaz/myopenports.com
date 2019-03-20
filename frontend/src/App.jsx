import React from "react";
import {BrowserRouter as Router, Route, Switch, NavLink} from "react-router-dom";

import {withTranslation} from 'react-i18next';
import './App.css'
import Header from './Header/Header'
import QuickInfo from './QuickInfo/QuickInfo'


import {
    Check,
    Scanner,
    Response,
    Protocols,
    Whois,
    Page404
} from './routes';

function AppRouter({t}) {
    return (
        <Router>
            <div>
                <div className="body-container">
                    <Header/>

                    <div className="container main-content">
                        <div className="columns">
                            <div className="column is-2">
                                <aside className="menu">
                                    <p className="menu-label">
                                        {t('menu_header_services')}
                                    </p>
                                    <ul className="menu-list">
                                        <li><NavLink exact to="/">{t('menu_checkPort')}</NavLink></li>
                                        <li><NavLink to="/scanner">{t('menu_scanner')}</NavLink></li>
                                        <li><NavLink to="/whois">{t('menu_whois')}</NavLink></li>
                                        <li><NavLink to="/response">{t('menu_response')}</NavLink></li>
                                        <li><NavLink to="/protocols">{t('menu_protocols')}</NavLink></li>
                                    </ul>
                                </aside>
                            </div>
                            <div className="column">
                                <Switch>
                                    <Route exact path="/" component={Check}/>
                                    <Route path="/scanner" component={Scanner}/>
                                    <Route path="/whois" component={Whois}/>
                                    <Route path="/response" component={Response}/>
                                    <Route path="/protocols" component={Protocols}/>
                                    <Route component={Page404}/>
                                </Switch>
                            </div>

                            <div className="column is-one-fifth">
                                <p className="menu-label">
                                    {t('sidebar_header_browserInfo')}
                                </p>
                                <div>
                                    <QuickInfo/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="footer">
                    <div className="content has-text-centered">
                        {t('footer_text')}
                    </div>
                </footer>
            </div>
        </Router>


    );
}

export default withTranslation()(AppRouter);