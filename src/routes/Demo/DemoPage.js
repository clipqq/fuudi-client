import React, { Component } from 'react'
import Demo from '../../components/Demo/Demo'
import { Section } from '../../components/Utils/Utils'

export default class LoginPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {},
        },
    }

    handleLoginSuccess = () => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/'
        history.push(destination)
    }

    render() {
        return (
            <Section className="LoginPage">
                <h2>Demo Login</h2>
                <Demo onLoginSuccess={this.handleLoginSuccess} />
            </Section>
        )
    }
}
