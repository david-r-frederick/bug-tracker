import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { CHANGE_COLOR_THEME } from '../../store/actions/actionTypes';

class Settings extends Component {
    state = {
        email: '',
        responseMessage: '',
        error: false,
        darkTheme: true,
    };

    makeUserAdmin = () => {
        const addAdminRole = firebase.functions().httpsCallable('addAdminRole');
        addAdminRole({ email: this.state.email }).then((result) => {
            console.log(result);
            if (result.data.message) {
                this.setState({ responseMessage: result.data.message });
            } else {
                this.setState({
                    responseMessage: result.data.errorInfo.message,
                    error: true,
                });
            }
        });
    };

    render() {
        return (
            <Fragment>
                <h1 className="mt-4">Settings</h1>
                <div className="card-body">
                    <div className="form-group">
                        <div className="form-row">
                            <div className="col-md-4 mt-4">
                                <strong>
                                    <p>Name</p>
                                </strong>
                            </div>
                            <div className="col-md-8 mt-4">
                                <p>{this.props.displayName}</p>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-4 mt-4">
                                <strong>
                                    <p>Email</p>
                                </strong>
                            </div>
                            <div className="col-md-8 mt-4">
                                <p>{this.props.user.email}</p>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-4 mt-4">
                                <strong>
                                    <p>Theme</p>
                                </strong>
                            </div>
                            <div className="col-md-8 mt-4">
                                <button
                                    className={`btn btn-${this.props.colorTheme}`}
                                    onClick={() => {
                                        this.setState((prevState) => {
                                            return {
                                                darkTheme: !prevState.darkTheme,
                                            };
                                        });
                                        this.props.onChangeTheme(!this.state.darkTheme ? 'dark' : 'light');
                                    }}
                                >
                                    Change Theme
                                </button>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-4 mt-2">
                                <label className="small mb-1">Make someone an admin</label>
                                <input
                                    className="form-control py-4"
                                    placeholder="Enter an email address"
                                    value={this.state.email}
                                    onChange={(event) => {
                                        this.setState({
                                            email: event.target.value,
                                            responseMessage: '',
                                            error: false,
                                        });
                                    }}
                                ></input>
                            </div>
                            <div className={`col-md-8 mb-1 d-flex align-items-end`}>
                                <button onClick={this.makeUserAdmin} className={`btn btn-warning mt-2`}>
                                    Make Admin
                                </button>
                            </div>
                        </div>
                        {this.state.responseMessage ? (
                            <div className="form-row">
                                <div className="col-md-6">
                                    <p className={`alert alert-${this.state.error ? 'danger' : 'success'} mt-2`}>
                                        {this.state.responseMessage}
                                    </p>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAdmin: state.auth.isAdmin,
        colorTheme: state.theme.color,
        user: state.auth.user,
        displayName: state.auth.displayName,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeTheme: (type) => dispatch({ type: CHANGE_COLOR_THEME, payload: type }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
