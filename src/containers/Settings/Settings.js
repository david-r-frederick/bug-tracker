import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { CHANGE_COLOR_THEME } from '../../store/actions/actionTypes';

class Settings extends Component {
    state = {
        email: '',
        darkTheme: true,
    };

    makeUserAdmin = () => {
        const addAdminRole = firebase.functions().httpsCallable('addAdminRole');
        addAdminRole({ email: this.state.email })
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
    };

    //would filter make admin ability
    // renderMakeAdminBlock = () => {
    //     if (this.props.isAdmin) {
    //         return (
    //             <div className="form-row">
    //                 <div className="col-lg-6 mt-2">
    //                     <label className="small mb-1">Make someone an admin</label>
    //                     <input
    //                         className="form-control py-4"
    //                         placeholder="Enter an email address"
    //                         value={this.state.email}
    //                         onChange={(event) => this.setState({ email: event.target.value })}
    //                     ></input>
    //                 </div>
    //                 <div className={`col-lg-6 mb-1 d-flex align-items-end`}>
    //                     <button onClick={this.makeUserAdmin} className={`btn btn-warning`}>
    //                         Make Admin
    //                     </button>
    //                 </div>
    //             </div>
    //         );
    //     } else {
    //         return <h4>Settings options will go here</h4>;
    //     }
    // };

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
                                <p>David Frederick</p>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-4 mt-4">
                                <strong>
                                    <p>Email</p>
                                </strong>
                            </div>
                            <div className="col-md-8 mt-4">
                                <p>dfrederick79@gmail.com</p>
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
                                    onChange={(event) => this.setState({ email: event.target.value })}
                                ></input>
                            </div>
                            <div className={`col-md-8 mb-1 d-flex align-items-end`}>
                                <button 
                                onClick={this.makeUserAdmin} className={`btn btn-warning mt-2`}>
                                    Make Admin
                                </button>
                            </div>
                        </div>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeTheme: (type) => dispatch({ type: CHANGE_COLOR_THEME, payload: type }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
