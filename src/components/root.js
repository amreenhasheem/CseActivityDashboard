import React from 'react';
import ProjDashBoard from './ProjDashBoard';
import LandingPage from './LandingPage';
import Profile from './Profile';
import {Switch, Route} from 'react-router-dom';

const Root = ()=> (
    <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/profile" component={Profile} />
        <Route path="/projects" component={ProjDashBoard} />
    </Switch>
)

export default Root;