import {createStore} from 'redux'
import { combineReducers } from 'redux'
import champs from './champsReducer'
import users from './userReducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
    champs,
    users,
})

export default createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)