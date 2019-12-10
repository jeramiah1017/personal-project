import React, {Component} from 'react';
import {
  CardElement,
  injectStripe,
  StripeProvider,
  Elements,
} from 'react-stripe-elements';
import { white } from 'ansi-colors';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom'

// You can customize your Elements to give it the look and feel of your site.
const createOptions = () => {
  return {
    style: {
      base: {
        body: white,
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#c23d4b',
      },
    }
  }
};

class _CardForm extends Component {
  state = {
    errorMessage: '',
  };

  handleChange = ({error}) => {
    if (error) {
      this.setState({errorMessage: error.message});
    }
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (this.props.stripe) {
      this.props.stripe.createToken().then(this.props.handleResult);
    
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };
  alert = () => {
    Swal.fire('Thank you for supporting (:')
  }

  render() {
    return (
      <div className="CardDemo">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            Card details
            <CardElement
              onChange={this.handleChange}
              {...createOptions()}
            />
          </label>
          <div className="error" role="alert">
            {this.state.errorMessage}
          </div>
          {/* <input type='number' placeholder='amount'/> */}
         <Link to='/' onClick={() => {this.alert()}}><button>Pay</button></Link>
        </form>
      </div>
    );
  }
}

const CardForm = injectStripe(_CardForm);

export default class CardDemo extends Component {
  render() {
    return (
      <StripeProvider apiKey={	
        'pk_test_XSf8NXtEJVhzz5EFKbQ5C2bJ00o24B34D3'}>
        <Elements>
          <CardForm handleResult={this.props.handleResult} />
        </Elements>
      </StripeProvider>
    );
  }
}