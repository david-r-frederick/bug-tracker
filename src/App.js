import React, { Component, Fragment } from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    ADD_USER_TICKET,
    SET_DISPLAY_NAME,
    SET_REDUX_USER,
    ADD_FIREBASE_USER_TO_LOCAL,
} from './store/actions/actionTypes';
import CreateBug from './containers/CreateBug/CreateBug';
import Dashboard from './containers/Dashboard/Dashboard';
import MyBugs from './containers/MyBugs/MyBugs';
import EditBug from './containers/EditBug/EditBug';
import NavBar from './components/NavBar/NavBar';
import SideNavMain from './components/SideNav/SideNavMain';
import MainFlowFooter from './components/MainFlowFooter';

class App extends Component {
    componentDidMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyCk4Lu5eYv3jAYH-E8CoZ5QaCQX-_sqd30',
            authDomain: 'bug-tracker-6ea40.firebaseapp.com',
            databaseURL: 'https://bug-tracker-6ea40.firebaseio.com',
            projectId: 'bug-tracker-6ea40',
            storageBucket: 'bug-tracker-6ea40.appspot.com',
            messagingSenderId: '1057123448362',
            appId: '1:1057123448362:web:2d7e6593f379067e30f553',
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                user.getIdToken()
                    .then((token) => {
                        // set user display name for navbar
                        this.props.onSetUser(token, user);
                        if (user.displayName) {
                            this.props.onSetDisplayName(user.displayName);
                        }
                    })
                    .then(() => {
                        //clear local tickets, then fetch all from firebase
                        // this.props.onClearLocalTickets();
                        firebase
                            .database()
                            .ref(`/tickets`)
                            .on('value', (snapShot) => {
                                snapShot.forEach((snap) => {
                                    const ticketObject = snap.val();
                                    this.props.onAddUserTicket(ticketObject);
                                });
                            });
                    })
                    .then(() => {
                        firebase
                            .database()
                            .ref('/users')
                            .on('value', (snapShot) => {
                                snapShot.forEach((snap) => {
                                    const userObject = snap.val();
                                    this.props.onAddFirebaseUserToLocalList(userObject);
                                });
                            });
                    })
                    .then(() => {
                        this.setCurrentUserInFirebase(user, this.props.displayName);
                    })
                    .catch((err) => console.log(err.message));
            } else {
                console.log('NO USER FOUND');
            }
        });
    }

    setCurrentUserInFirebase = (user, displayName) => {
        const userIdAndNameObject = { displayName, uid: user.uid };
        firebase
            .database()
            .ref(`/users/${user.uid}`)
            .set(userIdAndNameObject)
            .then(() => console.log('FIREBASE USER SEND SUCCESS'));
    };

    render() {
        if (this.props.isLoggedIn) {
            return (
                <Fragment>
                    <NavBar />
                    <div id="layoutSidenav">
                        <SideNavMain />
                        <div id="layoutSidenav_content">
                            <main>
                                <div className="container-fluid">
                                    <Switch>
                                        <Route path="/dashboard" component={Dashboard} />
                                        <Route path="/create" component={CreateBug} />
                                        <Route path="/my-bugs" component={MyBugs} />
                                        <Route path="/edit" component={EditBug} />
                                        <Redirect to="/dashboard" />
                                    </Switch>
                                </div>
                            </main>
                            <MainFlowFooter />
                        </div>
                    </div>
                </Fragment>
            );
        } else {
            return (
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Redirect to="/login" />
                </Switch>
            );
        }
    }
}

const mapStateToProps = (state) => {
    const { token, displayName, user } = state.auth;
    return {
        isLoggedIn: token,
        displayName,
        user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetUser: (token, user) => {
            dispatch({ type: SET_REDUX_USER, payload: { token, user } });
        },
        onSetDisplayName: (displayName) => {
            dispatch({ type: SET_DISPLAY_NAME, payload: { displayName } });
        },
        onAddUserTicket: (ticket) => {
            dispatch({ type: ADD_USER_TICKET, payload: { ticket } });
        },
        // onClearLocalTickets: () => {
        //     dispatch({ type: CLEAR_LOCAL_TICKETS });
        // },
        onAddFirebaseUserToLocalList: (userObj) => {
            dispatch({ type: ADD_FIREBASE_USER_TO_LOCAL, payload: { userObj } });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
