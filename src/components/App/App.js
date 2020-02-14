import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
// import PrivateRoute from '../Utils/PrivateRoute'
// import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import MenuListPage from '../../routes/MenuListPage/MenuListPage'
import MenuPage from '../../routes/MenuPage/MenuPage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import CreateMealPage from '../../routes/CreateMealPage/CreateMealPage'
// import OrdersPage from '../../routes/OrdersPage/OrdersPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import './App.css'

class App extends Component {
    state = { hasError: false }

    static getDerivedStateFromError(error) {
        console.error(error)
        return { hasError: true }
    }

    render() {
        return (
            <div className="App">
                <header className="App__header">
                    <Header />
                </header>
                <main className="App__main">
                    {this.state.hasError && (
                        <p className="red">There was an error! Oh no!</p>
                    )}
                    <Router>
                        <Switch>
                            <Route exact path={'/'} component={MenuListPage} />
                            <Route path={'/login'} component={LoginPage} />
                            <Route
                                path={'/register'}
                                component={RegistrationPage}
                            />
                            <Route
                                path={'/create-meal'}
                                component={CreateMealPage}
                            />
                            {/* <Route path={'/orders'} component={OrdersPage} /> */}
                            <Route
                                path={'/menu/:menuId'}
                                component={MenuPage}
                            />
                            <Route component={NotFoundPage} />
                        </Switch>
                    </Router>
                </main>
            </div>
        )
    }
}

export default App
