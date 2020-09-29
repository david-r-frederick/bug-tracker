import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { connect } from 'react-redux';
import AuthInput from '../Register/AuthInput';
import { Spinner } from '../../components/common';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errorMessage: '',
        loading: false,
        rememberPassword: false,
    };

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
                                            <h3 className="text-center font-weight-light my-4">Login</h3>
                                        </div>
                                        <div className="card-body">
                                            {this.state.loading ? (
                                                <Spinner />
                                            ) : (
                                                <form>
                                                    <AuthInput
                                                        auth
                                                        size="full"
                                                        title="Email"
                                                        id="inputEmailAddress"
                                                        placeholder="Enter email address"
                                                        ariaDescribedBy="emailHelp"
                                                        type="email"
                                                        value={this.state.email}
                                                        onChange={(event) => {
                                                            this.setState({
                                                                email: event.target.value,
                                                            });
                                                        }}
                                                    />
                                                    <AuthInput
                                                        auth
                                                        size="full"
                                                        title="Password"
                                                        id="inputPassword"
                                                        placeholder="Enter password"
                                                        type="password"
                                                        value={this.state.password}
                                                        onChange={(event) => {
                                                            this.setState({
                                                                password: event.target.value,
                                                            });
                                                        }}
                                                    />
                                                    <div className="form-group">
                                                        <div className="custom-control custom-checkbox">
                                                            <input
                                                                className="custom-control-input"
                                                                id="rememberPasswordCheck"
                                                                type="checkbox"
                                                                onChange={(event) => {
                                                                    this.setState((prevState) => {
                                                                        return {
                                                                            rememberPassword: !prevState.rememberPassword,
                                                                        };
                                                                    });
                                                                }}
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor="rememberPasswordCheck"
                                                            >
                                                                Remember password
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {this.state.errorMessage ? (
                                                        <p className="mt-3 text-danger">{this.state.errorMessage}</p>
                                                    ) : null}
                                                    <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                                        <Link className="small" to="/pwreset">
                                                            Forgot Password?
                                                        </Link>
                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                this.setState({ loading: true });
                                                                const auth = firebase.auth();
                                                                if (this.state.rememberPassword) {
                                                                    auth.setPersistence(
                                                                        firebase.auth.Auth.Persistence.LOCAL
                                                                    )
                                                                        .then(() => console.log('PERSISTENCE: LOCAL'))
                                                                        .catch((err) => console.log(err.message));
                                                                } else {
                                                                    auth.setPersistence(
                                                                        firebase.auth.Auth.Persistence.SESSION
                                                                    )
                                                                        .then(() => console.log('PERSISTENCE: SESSION'))
                                                                        .catch((err) => console.log(err.message));
                                                                }
                                                                auth.signInWithEmailAndPassword(
                                                                    this.state.email,
                                                                    this.state.password
                                                                ).catch((err) => {
                                                                    this.setState({
                                                                        errorMessage: err.message,
                                                                        loading: false,
                                                                    });
                                                                });
                                                            }}
                                                        >
                                                            Login
                                                        </button>
                                                    </div>
                                                </form>
                                            )}
                                        </div>
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
                                <div className="text-muted">Copyright &copy; Your Website 2020</div>
                                <div>
                                    <a href="/">Privacy Policy</a>
                                    &middot;
                                    <a href="/">Terms &amp; Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}

export default connect(null, null)(Login);
