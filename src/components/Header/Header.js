import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import './Header.css'
import Hamburger from '../Hamburger/Hamburger'

export default class Header extends Component {
    handleLogoutClick = () => {
        TokenService.clearAuthToken()
    }

    renderHeaderLoggedIn() {
        return (
            <div className="Header__logged-in">
                <Router>
                    <Link onClick={this.handleLogoutClick} to="/">
                        Logout
                    </Link>
                </Router>
            </div>
        )
    }

    renderHeaderNotLoggedIn() {
        return (
            <div className="Header__not-logged-in">
                <Router>
                    <div>
                        <Link to="/login">Log in</Link>
                        <Link to="/register">Register</Link>
                    </div>
                </Router>
            </div>
        )
    }

    render() {
        return (
            <>
                <nav className="Header">
                    <Hamburger />

                    {TokenService.hasAuthToken()
                        ? this.renderHeaderLoggedIn()
                        : this.renderHeaderNotLoggedIn()}
                </nav>

                <span className="Header__tagline--wide">
                    Be a foodie. Rediscover home cooked.
                </span>

                <span className="Header__tagline--narrow">
                    Be a foodie. Rediscover home cooked.
                </span>
            </>
        )
    }
}
