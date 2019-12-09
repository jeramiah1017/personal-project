import React, { Component } from "react";
import axios  from 'axios'
import {updateUser} from '../../ducks/userReducer'
import {connect} from 'react-redux'
import Swal from "sweetalert2";
import {withRouter} from 'react-router-dom'
import './login.css'
// import './login.css';

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = (key, value) => {
    this.setState({[key]: value})
  };
  login  = () => {
    const {email, password} = this.state 
    axios
    .post('/auth/login', {email, password})
    .then(res => {
      this.props.updateUser(res.data.user)
      Swal.fire(res.data.message)
      this.props.history.push('/dash2')
    })
    .catch(err => {
      console.log(err)
      // Swal.fire(err.response.data.message)
      
    })
  }
  render() {
    return (
      <div className="login">
        <div className="login_inner">
          <input class='username' onChange={e => this.handleChange('email', e.target.value)}
          value={this.state.email}
          placeholder='Email'
          type='text' />
          <input class="password"onChange={e => this.handleChange('password', e.target.value)}
          value={this.state.password}
          placeholder='Password'
          type='password'/>
          <button onClick={this.login}>Confirm</button>
        </div>
        
      </div>
      
    );
    
  }
}

export default withRouter(connect(null, {updateUser})(Login))
