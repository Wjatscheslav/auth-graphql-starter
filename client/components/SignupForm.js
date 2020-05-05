import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import signupMutation from '../mutations/Signup';

class SignupForm extends Component {

    render() {
        return (
            <div>
                <h3>Signup</h3>
                <AuthForm />
            </div>
        );
    }

}

export default graphql(signupMutation)(SignupForm);