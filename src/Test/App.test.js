import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App/App'
import Demo from '../components/Demo/Demo'
import LoginPage from '../components/LoginForm/LoginForm'
import Header from '../components/Header/Header'
import RegistrationForm from '../components/RegistrationForm/RegistrationForm'
import CreateMealForm from '../components/CreateMealForm/CreateMealForm'

import { BrowserRouter } from 'react-router-dom'

it('App renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        div,
    )
    ReactDOM.unmountComponentAtNode(div)
})

it('Demo renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter>
            <Demo />
        </BrowserRouter>,
        div,
    )
    ReactDOM.unmountComponentAtNode(div)
})
it('Login renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter>
            <LoginPage />
        </BrowserRouter>,
        div,
    )
    ReactDOM.unmountComponentAtNode(div)
})

it('Header renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter>
            <Header />
        </BrowserRouter>,
        div,
    )
    ReactDOM.unmountComponentAtNode(div)
})
it('RegistrationForm renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter>
            <RegistrationForm />
        </BrowserRouter>,
        div,
    )
    ReactDOM.unmountComponentAtNode(div)
})

it('CreateMealForm renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter>
            <CreateMealForm />
        </BrowserRouter>,
        div,
    )
    ReactDOM.unmountComponentAtNode(div)
})
