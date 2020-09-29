import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { REMOVE_REDUX_USER } from '../../store/actions/actionTypes';
import { connect } from 'react-redux';
import classes from './NavBar.module.css';
import { Link } from 'react-router-dom';
import { toggleSideNav } from '../../appActions';

class NavBar extends Component {
    state = {
        width: 0,
        height: 0,
    };

    logout = () => {
        firebase
            .auth()
            .signOut()
            .then((res) => {
                this.props.onRemoveUser();
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

    render() {
        return (
            <nav
                className={`sb-topnav navbar navbar-expand navbar-${this.props.colorTheme} bg-${this.props.colorTheme}`}
            >
                <a className="navbar-brand" href="/dashboard">
                    Bug Tracker
                </a>
                <button
                    className={`btn btn-link btn-sm order-1 order-lg-0 ${classes.submitBtn}`}
                    id="sidebarToggle"
                    href="/"
                    onClick={toggleSideNav}
                >
                    <i className="fas fa-bars"></i>
                </button>
                <ul className={`navbar-nav ml-auto ml-md-0 ${classes.topRightNavBarSection}`}>
                    <li className="nav-item">
                        <Link className="btn btn-primary" to="/create">
                            {this.state.width <= 500 ? '+' : 'Submit New Bug'}
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            id="userDropdown"
                            href="/"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="fas fa-user fa-fw"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                            <Link className="dropdown-item" to="/settings">
                                Settings
                            </Link>
                            <div className="dropdown-divider"></div>
                            <button onClick={this.logout} className="dropdown-item">
                                Logout
                            </button>
                        </div>
                    </li>
                </ul>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        colorTheme: state.theme.color,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRemoveUser: () => dispatch({ type: REMOVE_REDUX_USER }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
