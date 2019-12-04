import React, { Component } from 'react'
import { Section } from '../../components/Utils/Utils'
import CreateMealForm from '../../components/CreateMealForm/CreateMealForm'

export default class CreateMealPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = user => {
    const { history } = this.props
    history.push('/login')
  }

  render() {
    return (
      <Section className='CreateMealPage'>
        <h2>Create a New Meal!</h2>
        <CreateMealForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </Section>
    )
  }
}
