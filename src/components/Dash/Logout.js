import React from 'react'
import { connect } from 'react-redux'
import { updateUser } from '../../ducks/reducer'
import axios from 'axios'
import Swal from 'sweetalert2'
import {Link} from  'react-router-dom'

const Logout = props => {
  const logout = () => {
    axios.delete('/auth/logout').then(res => {
      Swal.fire(res.data.message)
      props.updateUser({
        email: '',
        username: '',
        user_id: '',
        bio: ''
      })
    })
  }
  return (
     <Link to='/'><button onClick={() => logout()}>Logout</button></Link>
  )
}

  function mapStateToProps(reduxState) {
    return reduxState
  }
  
  export default connect(
    mapStateToProps,
    { updateUser }
  )(Logout)
