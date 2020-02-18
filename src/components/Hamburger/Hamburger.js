import React, { Component } from 'react'
import './Hamburger.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TokenService from '../../services/token-service'
import '../Header/Header.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuOpen: false,
        }
    }

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
    }

    handleMenuClick() {
        this.setState({ menuOpen: !this.state.menuOpen })
    }

    handleLinkClick() {
        this.setState({ menuOpen: false })
    }

    render() {
        const styles = {
            container: {
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: '99',
                opacity: 0.9,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgb(173, 0, 0)',
                width: '100%',
                color: 'white',
                fontFamily: 'Helvetica',
                padding: '5px',
            },
            logo: {
                padding: '10px',
                color: 'white',
            },
            body: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
                filter: this.state.menuOpen ? 'blur(2px)' : null,
                transition: 'filter 0.5s ease',
            },
        }
        const menu = ['Create-Meal']
        const menuItems = menu.map((val, index) => {
            return (
                <MenuItem
                    key={index}
                    delay={`${index * 0.1}s`}
                    onClick={() => {
                        this.handleLinkClick()
                    }}
                >
                    <Link to={'/' + val}>{val}</Link>
                </MenuItem>
            )
        })

        return (
            <div>
                <div style={styles.container}>
                    <Link to="/">
                        <div style={styles.logo}>
                            <FontAwesomeIcon
                                className="white"
                                icon="utensils"
                            />{' '}
                            <span className="logo">Fuudi</span>
                        </div>
                    </Link>
                    <MenuButton
                        open={this.state.menuOpen}
                        onClick={() => this.handleMenuClick()}
                        color="white"
                    />
                </div>

                <Menu open={this.state.menuOpen}>{menuItems}</Menu>
            </div>
        )
    }
}

/* MenuItem.jsx*/
class MenuItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: false,
        }
    }

    handleHover() {
        this.setState({ hover: !this.state.hover })
    }

    render() {
        const styles = {
            container: {
                opacity: 0,
                animation: '1s appear forwards',
                animationDelay: this.props.delay,
            },
            menuItem: {
                fontFamily: 'Helvetica',
                fontSize: '1.5rem',
                padding: '1rem 0',
                margin: '0 5%',
                cursor: 'pointer',
                color: this.state.hover ? 'white' : '#fafafa',
                transition: 'color 0.2s ease-in-out',
                animation: '0.5s slideIn forwards',
                animationDelay: this.props.delay,
            },
            line: {
                width: '50%',
                height: '2px',
                background: 'red',
                margin: '0 auto',
                animation: '0.5s shrink forwards',
                animationDelay: this.props.delay,
            },
        }
        return (
            <div style={styles.container}>
                <div
                    style={styles.menuItem}
                    onMouseEnter={() => {
                        this.handleHover()
                    }}
                    onMouseLeave={() => {
                        this.handleHover()
                    }}
                    onClick={this.props.onClick}
                >
                    {this.props.children}
                </div>
                <div style={styles.line} />
            </div>
        )
    }
}

/* Menu.jsx */
class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: this.props.open ? this.props.open : false,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open !== this.state.open) {
            this.setState({ open: nextProps.open })
        }
    }

    render() {
        const styles = {
            container: {
                position: 'fixed',
                top: 0,
                left: 0,
                height: this.state.open ? '50%' : 0,
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                background: 'white',
                opacity: 0.95,
                transition: 'height 0.3s ease',
                zIndex: 2,
            },
            menuList: {
                paddingTop: '3rem',
            },
        }
        return (
            <div style={styles.container}>
                {this.state.open ? (
                    <div style={styles.menuList}>{this.props.children}</div>
                ) : null}
            </div>
        )
    }
}

/* MenuButton.jsx */
class MenuButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: this.props.open ? this.props.open : false,
            color: this.props.color ? this.props.color : 'red',
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open !== this.state.open) {
            this.setState({ open: nextProps.open })
        }
    }

    handleClick() {
        this.setState({ open: !this.state.open })
    }

    render() {
        const styles = {
            container: {
                height: '40px',
                width: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '4px',
            },
            line: {
                height: '2px',
                width: '20px',
                background: this.state.color,
                transition: 'all 0.2s ease',
            },
            lineTop: {
                transform: this.state.open ? 'rotate(45deg)' : 'none',
                transformOrigin: 'top left',
                marginBottom: '5px',
            },
            lineMiddle: {
                opacity: this.state.open ? 0 : 1,
                transform: this.state.open ? 'translateX(-16px)' : 'none',
            },
            lineBottom: {
                transform: this.state.open
                    ? 'translateX(-1px) rotate(-45deg)'
                    : 'none',
                transformOrigin: 'top left',
                marginTop: '5px',
            },
        }
        return (
            <div
                style={styles.container}
                onClick={
                    this.props.onClick
                        ? this.props.onClick
                        : () => {
                              this.handleClick()
                          }
                }
            >
                <div style={{ ...styles.line, ...styles.lineTop }} />
                <div style={{ ...styles.line, ...styles.lineMiddle }} />
                <div style={{ ...styles.line, ...styles.lineBottom }} />
            </div>
        )
    }
}

/* Main.jsx */
export default class Hamburger extends React.Component {
    render() {
        const styles = {
            main: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',
            },
        }
        return (
            <div style={styles.main}>
                <App />
            </div>
        )
    }
}
