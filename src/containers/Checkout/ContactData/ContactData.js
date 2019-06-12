import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Inputs from '../../../components/UI/Inputs/Inputs';
import * as actions from '../../../store/actions/index';
import WithErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-orders';
import { updateObject, checkValidity } from '../../../shared/utility';

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
                modified: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                modified: false
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
                modified: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 6,
                    minLength: 6
                },
                valid: false,
                modified: false
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
                modified: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayVal: 'Fastest'},
                        {value: 'cheapest', displayVal: 'Cheapest'}
                    ]
                },
                value: 'fastest'
            }
        },
        isFormValid: false
    }

    inputChangeHandler = (event, elemIdentifier) => {
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [elemIdentifier]: updateObject(this.state.orderForm[elemIdentifier], {
                modified: true, // set invalid if field is touched.
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.orderForm[elemIdentifier].validation)
            })
        });

        let isFormValid = true;
        for (const key in updatedOrderForm) {
            isFormValid = (updatedOrderForm[key].valid || updatedOrderForm[key].valid === undefined) && isFormValid;
        }
        this.setState({orderForm: updatedOrderForm, isFormValid: isFormValid});
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (const formElemIdentifier in this.state.orderForm) {
            formData[formElemIdentifier] = this.state.orderForm[formElemIdentifier].value;
        }
        const orderDetails = {
            ingredients: this.props.ings,
            price: this.props.tPrice,
            orderData: formData
        }
        
        this.props.onPurchaseOrderStart(orderDetails);
    }

    render() {
        const formElementArray = [];
        for (const key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = <form>
            {formElementArray.map(formElem => (
                <Inputs key={formElem.id}
                    elementType={formElem.config.elementType}
                    elementConfig={formElem.config.elementConfig}
                    value={formElem.config.value}
                    invalid={!formElem.config.valid && formElem.config.modified}
                    changed={(event) => this.inputChangeHandler(event, formElem.id)} />
            ))}
        </form>
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
                <Button
                    btnType='Success'
                    disabled={!this.state.isFormValid}
                    clicked={this.orderHandler}>
                    Order
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerState.ingredients,
        tPrice: state.burgerState.totalPrice,
        loading: state.orderState.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseOrderStart: (orderDetails) => dispatch(actions.purchaseBurger(orderDetails))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios));