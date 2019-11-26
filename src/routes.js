import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Dash from './components/Dash/Dash'
import Dash2 from './components/Dash/Dash2'
import Account from './components/Account/Account'

export default (
    <Switch>
        <Route exact path='/' component={Dash}/>
        <Route path='/loggedin' component={Dash2} />
        <Route path='/${username}' component={Account}/>
    </Switch>
)