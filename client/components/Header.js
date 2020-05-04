import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import getCurrentUser from '../queries/CurrentUser';
import { Link } from 'react-router';
import logoutMutation from '../mutations/Logout';

class Header extends Component{
    render() {
        return (
            <nav>
                <div className='nav-wrapper'>
                    <Link to='/' className='brand-logo left'>
                        Home
                    </Link>
                    <ul className='right'>
                        {this.renderButtons()}
                    </ul>
                </div>
            </nav>
        );
    }

    renderButtons() {
        const { loading, user } = this.props.data;

        if (loading) {
            return <div />;
        }
        if (user) {
            return (
                <li>
                    <a onClick={this.onLogoutClick.bind(this)}>Logout</a>
                </li>
            );
        } else {
            return (
                <div>
                    <li>
                        <Link to='/signup'>Signup</Link>
                    </li>
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                </div>
            )
        }
    }

    onLogoutClick() {
        this.props.mutate({
            refetchQueries: [{ query: getCurrentUser }]
        });
    }
}

export default graphql(logoutMutation)(graphql(getCurrentUser)(Header));