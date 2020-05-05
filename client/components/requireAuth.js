import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import getCurrentUser from '../queries/CurrentUser';
import { hashHistory } from 'react-router';

export default (WrappedComponent) => {
    class RequireAuth extends Component {

        componentDidUpdate() {
            if (!this.props.data.loading && !this.props.data.currentUser) {
                hashHistory.push('/login');
            }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return graphql(getCurrentUser)(RequireAuth);
}