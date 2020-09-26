import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

// Create a component renders a form allowing a user to sign up by creating a new account.

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: [],
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={firstName} 
                  onChange={this.change} 
                  placeholder="First Name" />
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  value={lastName} 
                  onChange={this.change} 
                  placeholder="Last Name" />
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email Address" />
                <input 
                  id="password" 
                  name="password"
                  type="current-password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
                <input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="new-password"
                  value={confirmPassword} 
                  onChange={this.change} 
                  placeholder="Confirm Password" />
               </React.Fragment>
              )}
            />
          <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  // Clicking a "Sign Up" button sends a POST request to the REST API's /api/users route and creating the user.
  // And update the "Sign Up" screen to display validation errors returned from the REST API.
  
  submit = () => {
    const { context } = this.props;

    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    } = this.state; 

    // New user payload
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    };
    if (password !== confirmPassword) {
      this.setState({
        errors: ["Sorry, Confirm password should match password"],
      });
    } else {
    context.data.createUser(user)
      .then( errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          context.actions.signIn(emailAddress, password)
            .then(() => {
              this.props.history.push('/courses');
          });
        }   
      }).catch((error) => { // handle rejected promises
        console.log(error);
        this.props.history.push('/error'); // push to history stack
      });  
    }
  }
  // "Cancel" button that returns the user to the default route.
  cancel = () => {
    this.props.history.push('/');
  }
}


