import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import AuthInput from './AuthInput';
import AuthFlowFooter from '../../components/AuthFlowFooter';
import { Link } from 'react-router-dom';
import { SET_DISPLAY_NAME } from '../../store/actions/actionTypes';
import { connect } from 'react-redux';
import { Spinner } from '../../components/common';

class Register extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        errorMessage: '',
        isValid: false,
        loading: false,
    };

    checkIfValid() {
        const { firstName, lastName, email, password, confirmPassword } = this.state;
        const validity = [firstName, lastName, email, password, confirmPassword].every((el) => el);
        this.setState({ isValid: validity });
    }

    render() {
        return (
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-7">
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header">
                                            <h3 className="text-center font-weight-light my-4">Create Account</h3>
                                        </div>
                                        <div className="card-body">
                                            {this.state.loading ? <Spinner /> : <form>
                                                <div className="form-row">
                                                    <AuthInput
                                                        size="half"
                                                        title="First Name Test"
                                                        id="inputFirstName"
                                                        placeholder="Enter First Name"
                                                        type="text"
                                                        value={this.state.firstName}
                                                        onChange={(event) => {
                                                            this.checkIfValid();
                                                            this.setState({
                                                                firstName: event.target.value,
                                                            });
                                                        }}
                                                    />
                                                    <AuthInput
                                                        size="half"
                                                        title="Last Name"
                                                        id="inputLastName"
                                                        placeholder="Enter Last Name"
                                                        type="text"
                                                        value={this.state.lastName}
                                                        onChange={(event) => {
                                                            this.checkIfValid();
                                                            this.setState({
                                                                lastName: event.target.value,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="form-row">
                                                  <AuthInput
                                                      size="full"
                                                      title="Email"
                                                      id="inputEmailAddress"
                                                      placeholder="Enter email address"
                                                      ariaDescribedBy="emailHelp"
                                                      type="email"
                                                      value={this.state.email}
                                                      onChange={(event) => {
                                                          this.checkIfValid();
                                                          this.setState({
                                                              email: event.target.value,
                                                          });
                                                      }}
                                                  />
                                                </div>
                                                <div className="form-row">
                                                    <AuthInput
                                                        size="half"
                                                        title="Password"
                                                        id="inputPassword"
                                                        placeholder="Enter password"
                                                        type="password"
                                                        value={this.state.password}
                                                        onChange={(event) => {
                                                            this.checkIfValid();
                                                            this.setState({
                                                                password: event.target.value,
                                                            });
                                                        }}
                                                    />
                                                    <AuthInput
                                                        size="half"
                                                        title="Confirm Password"
                                                        id="inputConfirmPassword"
                                                        placeholder="Confirm password"
                                                        type="password"
                                                        value={this.state.confirmPassword}
                                                        onChange={(event) => {
                                                            this.checkIfValid();
                                                            this.setState({
                                                                confirmPassword: event.target.value,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="form-group mt-4 mb-0">
                                                    <button
                                                        className="btn btn-primary btn-block"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            this.setState({ loading: true });
                                                            if (!this.state.isValid) {
                                                                this.setState({
                                                                    errorMessage: 'All fields must be filled.',
                                                                    loading: false,
                                                                });
                                                                return;
                                                            }
                                                            if (this.state.password === this.state.confirmPassword) {
                                                                firebase
                                                                    .auth()
                                                                    .createUserWithEmailAndPassword(
                                                                        this.state.email,
                                                                        this.state.password
                                                                    )
                                                                    .then((response) => {
                                                                        this.props.onSetDisplayName(
                                                                            `${this.state.firstName} ${this.state.lastName}`
                                                                        );
                                                                        response.user.updateProfile({
                                                                            displayName: `${this.state.firstName} ${this.state.lastName}`,
                                                                        });
                                                                    })
                                                                    .catch((err) => {
                                                                        console.log(err.message);
                                                                        this.setState({
                                                                            errorMessage: err.message,
                                                                            loading: false,
                                                                        });
                                                                    });
                                                            } else {
                                                                this.setState({
                                                                    errorMessage: 'Passwords do not match.',
                                                                });
                                                            }
                                                        }}
                                                    >
                                                        Create Account
                                                    </button>
                                                    {this.state.errorMessage ? (
                                                        <p className="mt-3 text-danger">{this.state.errorMessage}</p>
                                                    ) : null}
                                                </div>
                                            </form>}
                                        </div>
                                        <div className="card-footer text-center">
                                            <div className="small">
                                                <Link to="/login">Have an account? Go to login</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <AuthFlowFooter />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetDisplayName: (displayName) => {
            dispatch({
                type: SET_DISPLAY_NAME,
                payload: { displayName },
            });
        },
    };
};

export default connect(null, mapDispatchToProps)(Register);
