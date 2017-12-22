import React, {Component} from 'react';
import classes from './ContactData.css';
import Button from "../../../components/UI/Button/Button";
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipCode: '',
            city: '',
            country: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: this.state.name,
                address: {
                    street: this.state.address.street,
                    zipCode: this.state.address.zipCode,
                    city: this.state.address.city,
                    country: this.state.address.country
                },
                email: this.state.email
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');

            })
            .catch(error => {
                this.setState({loading: false});

            });
    };

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your name"/>
                <input type="email" name="email" placeholder="Your email"/>
                <input type="text" name="street" placeholder="Your street"/>
                <input type="text" name="city" placeholder="Your city"/>
                <input type="text" name="zipCode" placeholder="Your zipCode"/>
                <input type="text" name="country" placeholder="Your country"/>
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner/>;
        }

        return (
            <div className={classes.ComponentData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;