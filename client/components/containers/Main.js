import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Landingpage, SecondPage } from './';

const Main = () => {
    return (
        <Switch>
            <Route exact path="/" render={props => <Landingpage {...props} />} />
            <Route exact path="/secondPage" render={props => <SecondPage {...props} />} />
        </Switch>
    );
};

export default Main;