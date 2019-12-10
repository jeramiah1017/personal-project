import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Dash from './components/Dash/Dash'
import Dash2 from './components/Dash/Dash2'
import Account from './components/Account/Account'
import Stripe from './components/Stripe/Stripe'

export default (
    <Switch>
        <Route exact path='/' component={Dash}/>
        <Route path='/dash2' component={Dash2} />
        <Route path='/donate'component={Stripe}/>
        <Route path='/${username}' component={Account}/>
    </Switch>
)