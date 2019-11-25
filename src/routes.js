import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Dash from './components/Dash/Dash'
import Account from './components/Account/Account'

export default (
    <Switch>
        <Route exact path='/' component={Dash}/>
        <Route path='/${username}'/>
    </Switch>
)