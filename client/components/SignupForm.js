import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import signupMutation from '../mutations/Signup';
import getCurrentUser from '../queries/CurrentUser';

class SignupForm extends Component {

    constructor(props) {
        super(props);

        this.state = { errors: [] };
    }

    onSubmit({ email, password }) {
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ getCurrentUser }]
        }).catch(res => {
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({ errors });
        })
    }

    render() {
        return (
            <div>
                <h3>Signup</h3>
                <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)}/>
            </div>
        );
    }

}

export default graphql(signupMutation)(SignupForm);