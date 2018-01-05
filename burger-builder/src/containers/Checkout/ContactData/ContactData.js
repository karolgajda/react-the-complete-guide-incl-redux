import React, {Component} from 'react';
import classes from './ContactData.css';
import Button from "../../../components/UI/Button/Button";
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from "../../../components/UI/Input/Input";
import {connect} from "react-redux";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                changed: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                changed: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                changed: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your zip code'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                changed: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your city'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                changed: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                changed: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', display: 'Fastest'},
                        {value: 'cheapest', display: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
                changed: false
            },
        },
        formIsValid: false,
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ings,
            price: this.props.tP,
            customer: {
                name: this.state.orderForm.name.value,
                address: {
                    street: this.state.orderForm.street.value,
                    zipCode: this.state.orderForm.zipCode.value,
                    city: this.state.orderForm.city.value,
                    country: this.state.orderForm.country.value
                },
                email: this.state.orderForm.email.value
            },
            deliveryMethod: this.state.orderForm.deliveryMethod.value
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

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, inputId) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedOrderFormElement = {...updatedOrderForm[inputId]};
        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.changed = true;
        updatedOrderFormElement.valid = this.checkValidity(event.target.value, updatedOrderFormElement.validation);
        updatedOrderForm[inputId] = updatedOrderFormElement;
        let formIsValid = true;
        for (let inputId in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputId].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    };

    render() {
        const formElementsArray = [];
        for (let elementName in this.state.orderForm) {
            const element = this.state.orderForm[elementName];

            const input = <Input
                key={elementName}
                elementType={element.elementType}
                elementConfig={element.elementConfig}
                value={element.value}
                invalid={!element.valid}
                shouldValidate={element.validation}
                changedElement={element.changed}
                changed={(event) => this.inputChangedHandler(event, elementName)}
            />;

            formElementsArray.push(input);
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        tP: state.totalPrice
    }
};


export default connect(mapStateToProps)(ContactData);