import React, { Component } from 'react';

const MenuListContext = React.createContext({
    menuList: [],
    error: null,
    setError: () => {},
    clearError: () => {},
    setMenuList: () => {},
});
export default MenuListContext;

export class MenuListProvider extends Component {
    state = {
        menuList: [],
        error: null,
    };

    setMenuList = menuList => {
        this.setState({ menuList });
    };

    setError = error => {
        console.error(error);
        this.setState({ error });
    };

    clearError = () => {
        this.setState({ error: null });
    };

    render() {
        const value = {
            menuList: this.state.menuList,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setMenuList: this.setMenuList,
        };
        return (
            <MenuListContext.Provider value={value}>
                {this.props.children}
            </MenuListContext.Provider>
        );
    }
}
