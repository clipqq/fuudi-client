import React, { Component } from 'react';

export const nullMenu = {
    author: {},
    tags: [],
};

const MenuContext = React.createContext({
    menu: nullMenu,
    reviews: [],
    error: null,
    setError: () => {},
    clearError: () => {},
    setMenu: () => {},
    clearMenu: () => {},
    setReviews: () => {},
    addReview: () => {},
});

export default MenuContext;

export class MenuProvider extends Component {
    state = {
        menu: nullMenu,
        error: null,
    };

    setError = error => {
        console.error(error);
        this.setState({ error });
    };

    clearError = () => {
        this.setState({ error: null });
    };

    setMenu = menu => {
        this.setState({ menu });
    };

    setReviews = reviews => {
        this.setState({ reviews });
    };

    clearMenu = () => {
        this.setMenu(nullMenu);
        this.setReviews([]);
    };

    addReview = review => {
        this.setReviews([...this.state.reviews, review]);
    };

    render() {
        const value = {
            menu: this.state.menu,
            reviews: this.state.reviews,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setMenu: this.setMenu,
            setReviews: this.setReviews,
            clearMenu: this.clearMenu,
            addReview: this.addReview,
        };
        return (
            <MenuContext.Provider value={value}>
                {this.props.children}
            </MenuContext.Provider>
        );
    }
}
