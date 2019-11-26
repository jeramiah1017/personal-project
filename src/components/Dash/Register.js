import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import './Register.css'
import {updateUser} from '../../ducks/reducer'
import {connect} from 'react-redux'

class Register extends Component {
  state = {
    email: '',
    name: '',
    password1: '',
    password2: '',
    bio: ''
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  register = () => {
    if (this.state.password1 === this.state.password2) {
      const {username, email, bio, password1:password} = this.state
      axios
        .post('/auth/register', {username, email, password, bio})
        .then(res => {
          console.log(res.data)
          this.props.updateUser(res.data.user)
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    } else {
      console.log('passwords dont match')
    }
  }

  render() {
    return (
      <div className='register'>
        <input
          value={this.state.email}
          onChange={e => this.handleChange('email', e.target.value)}
          placeholder="Email"
          type="text"
        />
        <input
          value={this.state.username}
          onChange={e => this.handleChange('username', e.target.value)}
          placeholder="username"
          type="text"
        />
        <input
          value={this.state.password1}
          onChange={e => this.handleChange('password1', e.target.value)}
          placeholder="Password"
          type="password"
        />
        <input
          value={this.state.password2}
          onChange={e => this.handleChange('password2', e.target.value)}
          placeholder="Retype password"
          type="password"
        />
        <input 
        value={this.state.bio}
        onChange={e => this.handleChange('bio', e.target.value)}
        placeholder="How do you feel about league of legends ??"
        type='text'
        />
        <button onClick={this.register}>Register</button>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return reduxState
}
const mapDispatchToProps = {
  updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)