import React, { Component } from 'react';
import { Button, Input, Required, Select } from '../Utils/Utils';
import AuthApiService from '../../services/auth-api-service';

export default class CreateMealForm extends Component {
    static defaultProps = {
        onCreateSuccess: () => {
        },
    };

    state = { error: null };

    handleSubmit = ev => {
        ev.preventDefault();
        const {
            meal_title,
            image_url,
            locations_served,
            payment_type_accepted,
            diet_type,
            cuisine_type,
            description,
            pickup_instructions,
        } = ev.target;
        this.setState({ error: null });
        AuthApiService.postMeal({
            title: meal_title.value,
            image: image_url.value,
            locations_served: locations_served.value,
            payment_type: payment_type_accepted.value,
            diet_type: diet_type.value,
            cuisine_type: cuisine_type.value,
            description: description.value,
            pickup_instructions: pickup_instructions.value,
        })
            .then(meal => {
                meal_title.value = '';
                image_url.value = '';
                locations_served.value = '';
                payment_type_accepted.value = '';
                diet_type.value = '';
                cuisine_type.value = '';
                description.value = '';
                pickup_instructions.value = '';
                this.props.onCreateSuccess();
            })
            .catch(res => {
                // Getting a console warning, change below to DO something
                // User can click form submit twice, fix that
                this.setState({ error: res.error });
            });
    };

    render() {
        const { error } = this.state;
        return (
            <form className="CreateMealForm" onSubmit={this.handleSubmit}>
                <div role="alert">
                    {error && <p className="red">{error}</p>}
                </div>

                <div className="meal_title">
                    <label htmlFor="RegistrationForm__meal_title">
                        Your Meal Title <Required />
                    </label>
                    <Input
                        name="meal_title"
                        type="text"
                        required
                        id="RegistrationForm__meal_title"
                    ></Input>
                </div>

                <div className="locations_served">
                    <label htmlFor="RegistrationForm__locations_served">
                        Locations you serve <Required />
                    </label>
                    <Input
                        name="locations_served"
                        type="text"
                        required
                        id="RegistrationForm__locations_served"
                    ></Input>
                </div>

                <div className="description">
                    <label htmlFor="RegistrationForm__description">
                        Describe your meal <Required />
                    </label>
                    <Input
                        name="description"
                        type="text"
                        required
                        id="RegistrationForm__description"
                    ></Input>
                </div>

                <div className="pickup_instructions">
                    <label htmlFor="RegistrationForm__pickup_instructions">
                        How to pickup your food <Required />
                    </label>
                    <Input
                        name="pickup_instructions"
                        type="text"
                        required
                        id="RegistrationForm__pickup_instructions"
                    ></Input>
                </div>

                <div className="payment_type_accepted">
                    <label htmlFor="RegistrationForm__payment_type_accepted">
                        Payment Types Accepted <Required />
                    </label>
                    <Select name="payment_type_accepted">
                        required
                        <option value="Cash">Cash</option>
                        <option value="Credit">Credit</option>
                        <option value="Debit">Debit</option>
                        <option value="Venmo">Venmo</option>
                        <option value="Paypal">Paypal</option>
                    </Select>
                </div>

                {/* // END REQUIRED FIELDS */}

                <div className="cuisine_type">
                    <label htmlFor="RegistrationForm__cuisine_type">
                        Cuisine Type (Chinese, Moroccan, etc.)
                    </label>
                    <Input
                        name="cuisine_type"
                        type="text"
                        id="RegistrationForm__cuisine_type"
                    ></Input>
                </div>

                <div className="diet_type">
                    <label htmlFor="RegistrationForm__diet_type">
                        Diet Type
                    </label>
                    <Select name="diet_type">
                        <option value="Vegan">Vegan</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Paleo">Paleo</option>
                        <option value="Ketogenic">Ketogenic</option>
                        <option value="Atkins">Atkins</option>
                        <option value="South Beach">South Beach</option>
                        <option value="Raw">Raw</option>
                        <option value="Mediterranean">Mediterranean</option>
                    </Select>
                </div>

                <div className="image_url">
                    <label htmlFor="RegistrationForm__image_url">
                        Image URL
                    </label>
                    <Input
                        name="image_url"
                        type="text"
                        id="RegistrationForm__image_url"
                    ></Input>
                </div>

                <Button type="submit">Create</Button>
            </form>
        );
    }
}
