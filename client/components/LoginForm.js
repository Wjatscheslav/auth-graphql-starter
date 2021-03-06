import React, { Component } from 'react';
import AuthForm from './AuthForm';
import loginMutation from '../mutations/Login';
import { graphql } from 'react-apollo';
import getCurrentUser from '../queries/CurrentUser';
import { hashHistory } from 'react-router';

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = { errors: [] };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.data.currentUser && this.props.data.currentUser) {
            hashHistory.push('/dashboard');
        }
    }

    onSubmit({ email, password }) {
        this.props.mutate({
            variables: {email, password},
            refetchQueries: [{ query: getCurrentUser }]
        }).catch(res => {
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({ errors });
        });
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

export default graphql(getCurrentUser)(graphql(loginMutation)(LoginForm));