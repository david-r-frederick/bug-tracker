import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import AuthInput from '../Register/AuthInput';
import { Spinner } from '../../components/common';

class PasswordReset extends Component {
    state = {
        email: '',
        confirmationMessage: '',
        showReturnToLoginBtn: false,
        requestSending: false,
        sendSuccess: false,
    };

    requestFirebaseToSendEmail = (event) => {
        event.preventDefault();
        this.setState({ requestSending: true });
        firebase
            .auth()
            .sendPasswordResetEmail(this.state.email)
            .then((res) => {
                this.setState({
                    confirmationMessage:
                        'If there is an account associated with this email, a password reset email has been sent to the email entered. Please check your email for further instructions.',
                    requestSending: false,
                    email: '',
                    sendSuccess: true,
                });
            })
            .catch((err) => {
                this.setState({
                    requestSending: false,
                    email: '',
                    confirmationMessage:
                        `There is not an account associated with this email. Please try again.`,
                });
            });
    };

    renderMain() {
        if (this.state.requestSending) {
            return <Spinner />;
        }
        if (this.state.sendSuccess) {
            return (
                <div className="card-body">
                    <div className="small mb-3 text-muted">{this.state.confirmationMessage}</div>
                    <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                        <Link className="small" to="/login">
                            Return to login
                        </Link>
                    </div>
                </div>
            );
        }
        return (
            <div className="card-body">
            <div className="small mb-3 text-muted">
                    {this.state.confirmationMessage ? this.state.confirmationMessage : 'Enter your email address and we will send you a link to reset your password.'}
                </div>
                <form>
                    <AuthInput
                        title="Email"
                        id="inputEmailAddress"
                        type="email"
                        placeholder="Enter email address"
                        onChange={(event) => {
                            this.setState({ email: event.target.value });
                        }}
                        value={this.state.email}
                        size="full"
                    />
                    <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                        <Link className="small" to="/login">
                            Return to login
                        </Link>
                        <button className="btn btn-primary" onClick={this.requestFirebaseToSendEmail}>
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    render() {
        return (
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-5">
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header">
                                            <h3 className="text-center font-weight-light my-4">Password Recovery</h3>
                                        </div>
                                        {this.renderMain()}
                                        <div className="card-footer text-center">
                                            <div className="small">
                                                <Link to="/register">Need an account? Sign up!</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div id="layoutAuthentication_footer">
                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">Copyright &copy; Bug Tracker 2020</div>
                                <div>
                                    <Link to="/pwreset">Privacy Policy</Link>
                                    &middot;
                                    <Link to="/pwreset">Terms &amp; Conditions</Link>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}

export default PasswordReset;
