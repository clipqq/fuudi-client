import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TokenService from '../../services/token-service'
import './Header.css'

export default class Header extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
  }

  renderHeaderLoggedIn() {
    return (
      <div className='Header__logged-in'>
        <Link
          to='/create-meal'>
          Create a Meal
        </Link>
        {' '}
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
      </div>
    )
  }

  renderHeaderNotLoggedIn() {
    return (
      <div className='Header__not-logged-in'>
        <Link
          to='/login'>
          Log in
        </Link>
        <Link
          to='/register'>
          Register
        </Link>
      </div>
    )
  }

  render() {
    return <>
      <nav className='Header'>
        <h1>
          <Link to='/'>
            <FontAwesomeIcon className='red' icon='utensils' />
            {' '}
            Fuudi
          </Link>
        </h1>
        <span className='Header__tagline--wide'>Be a foodie. Rediscover home cooked.</span>
        {TokenService.hasAuthToken()
          ? this.renderHeaderLoggedIn()
          : this.renderHeaderNotLoggedIn()}
      </nav>

      <span className='Header__tagline--narrow'>Be a foodie. Rediscover home cooked.</span>
    </>
  }
}
