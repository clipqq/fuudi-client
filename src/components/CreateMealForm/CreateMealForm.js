import React, { Component } from 'react'
import { Button, Input, Required } from '../Utils/Utils'
import AuthApiService from '../../services/auth-api-service'

export default class CreateMealForm extends Component {
  static defaultProps = {
    onCreateSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const { meal_title, image_url, locations_served, payment_type_accepted, diet_type, cuisine_type, description, pickup_instructions } = ev.target

    this.setState({ error: null })
    AuthApiService.postCreateMeal({
      title: meal_title.value,
      image: image_url.value,
      locations_served: locations_served.value,
      payment_type: payment_type_accepted.value,
      diet_type: diet_type.value,
      cuisine_type: cuisine_type.value,
      description: description.value,
      pickup_instructions: pickup_instructions.value
    })
      .then(user => {
        meal_title.value = ''
        image_url.value = ''
        locations_served.value = ''
        payment_type_accepted.value = ''
        diet_type.value = ''
        cuisine_type.value = ''
        description.value = ''
        pickup_instructions.value = ''
        this.props.onCreateSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='CreateMealForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='full_name'>
          <label htmlFor='RegistrationForm__meal_title'>
            Your Meal Title <Required />
          </label>
          <Input
            name='full_name'
            type='text'
            required
            id='RegistrationForm__meal_title'>
          </Input>
        </div>
        <div className='user_name'>
          <label htmlFor='RegistrationForm__user_name'>
            User name <Required />
          </label>
          <Input
            name='user_name'
            type='text'
            required
            id='RegistrationForm__user_name'>
          </Input>
        </div>
        <div className='password'>
          <label htmlFor='RegistrationForm__password'>
            Password <Required />
          </label>
          <Input
            name='password'
            type='password'
            required
            id='RegistrationForm__password'>
          </Input>
        </div>
        <div className='nick_name'>
          <label htmlFor='RegistrationForm__nick_name'>
            Nickname
          </label>
          <Input
            name='nick_name'
            type='text'
            required
            id='RegistrationForm__nick_name'>
          </Input>
        </div>
        <Button type='submit'>
          Register
        </Button>
      </form>
    )
  }
}