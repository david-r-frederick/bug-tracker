import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { REMOVE_REDUX_USER } from '../../store/actions/actionTypes';
import { connect } from 'react-redux';
import classes from './NavBar.module.css';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    state = {
      width: 0,
      height: 0,
    }

    logout = () => {
        firebase
            .auth()
            .signOut()
            .then((res) => {
                this.props.onRemoveUser();
            })
            .catch((err) => {
                console.log(err.message);
                console.log('Error is located in NavBar.js file, logout method.');
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
    }

    render() {
        return (
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <a className="navbar-brand" href="/">
                    Bug Tracker
                </a>
                <button
                    className={`btn btn-link btn-sm order-1 order-lg-0 ${classes.submitBtn}`}
                    id="sidebarToggle"
                    href="/"
                    onClick={() => {
                        if (document.body.classList.contains('sb-nav-fixed')) {
                            document.body.classList.remove('sb-nav-fixed');
                            document.body.classList.add('sb-sidenav-toggled');
                        } else {
                            document.body.classList.remove('sb-sidenav-toggled');
                            document.body.classList.add('sb-nav-fixed');
                        }
                    }}
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
                            <button className="dropdown-item" onClick={() => this.setState({ redirect: '/settings' })}>
                                Settings
                            </button>
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

const mapDispatchToProps = (dispatch) => {
    return {
        onRemoveUser: () => dispatch({ type: REMOVE_REDUX_USER }),
    };
};

export default connect(null, mapDispatchToProps)(NavBar);
