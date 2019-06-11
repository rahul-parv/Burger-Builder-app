import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import styles from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Inputs from '../../components/UI/Inputs/Inputs';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                modified: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                modified: false
            }
        },
        isFormValid: false,
        isSignUp: true
    }

    switchSignUpMode = () => {
        this.setState(prevState => {
            return {
                isSignUp: !this.state.isSignUp
            }
        })
    }

    inputChangeHandler = (event, controlName) => {
        const updatedAuthForm = updateObject(this.state.authForm, {
            [controlName]: updateObject(this.state.authForm[controlName], {
                modified: true, // set invalid if field is touched.
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.authForm[controlName].validation),
            })
        });

        let isFormValid = true;
        for (const key in updatedAuthForm) {
            isFormValid = (updatedAuthForm[key].valid || updatedAuthForm[key].valid === undefined) && isFormValid;
        }
        this.setState({ authForm: updatedAuthForm, isFormValid: isFormValid });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignUp);
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath) {
            this.props.onSetAuthRedirectPath();
        }
    }

    render() {
        const formElementArray = [];
        let errorMsg = null;
        for (const key in this.state.authForm) {
            formElementArray.push({
                id: key,
                config: this.state.authForm[key]
            });
        }
        let form = formElementArray.map(formElem => (
                <Inputs
                    key={formElem.id}
                    elementType={formElem.config.elementType}
                    elementConfig={formElem.config.elementConfig}
                    value={formElem.config.value}
                    invalid={!formElem.config.valid && formElem.config.modified}
                    changed={(event) => this.inputChangeHandler(event, formElem.id)} />
            ));
        form.push(<Button
            key='submitBtnKey'
            btnType='Success'
            disabled={!this.state.isFormValid}
            clicked={this.submitHandler}>
            Submit
        </Button>);
        
        if (this.props.loading) {
            form = <Spinner />
        }
        if (this.props.error) {
            errorMsg = <p className={styles.AuthError}>{this.props.error.message}</p>
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={styles.Auth}>
                {authRedirect}
                <h3>{this.state.isSignUp ? 'Registration' : 'Login'}</h3>
                {errorMsg}
                <form>
                    {form}
                </form>
                <Button
                    btnType='Danger'
                    clicked={this.switchSignUpMode}>
                    Switch to {this.state.isSignUp ? 'Sign In' : 'Sign Up'}
                </Button>
            </div>
        )
    }
}

const mapstateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.idToken !== null,
        authRedirectPath: state.auth.authRedirectPath,
        buildingBurger: state.burgerState.building
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, pass, isSignUpMode) => dispatch(actions.auth(email, pass, isSignUpMode)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapstateToProps, mapDispatchToProps)(Auth);