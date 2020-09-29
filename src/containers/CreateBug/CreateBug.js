import React, { Component, Fragment } from 'react';
import { Input, Select, TextArea } from '../../components/common/index';
import firebase from 'firebase';
import classes from './CreateBug.module.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ADD_USER_TICKET, CLEAR_LOCAL_TICKETS } from '../../store/actions/actionTypes';

class CreateBug extends Component {
    state = {
        bugName: '',
        shortDescription: '',
        severity: 'Select',
        assignedTo: 'Select',
        assignedToId: '',
        longDescription: '',
        stepsToReproduce: '',
        colorCode: { Select: '#fff', Minor: '#fcffad', Moderate: '#ffd685', Severe: '#ff8585' },
        redirect: null,
        formIncomplete: false,
        missingFields: [],
        status: 'New',
    };

    submitTicketHandler = (id, user) => {
        const {
            bugName,
            shortDescription,
            severity,
            assignedTo,
            assignedToId,
            longDescription,
            stepsToReproduce,
            status,
        } = this.state;
        const database = firebase.database();
        database
            .ref(`tickets/${id}`)
            .set({
                bugName,
                shortDescription,
                severity,
                assignedTo,
                assignedToId,
                longDescription,
                stepsToReproduce,
                id,
                submittedBy: this.props.user.displayName,
                submittedById: this.props.user.uid,
                timeSubmitted: new Date().toString().substring(0, 24),
                status,
            })
            .then(() => {
                this.props.onClearLocalTickets();
            })
            .then(() => {
                database.ref(`tickets`).on('value', (snapShot) => {
                    snapShot.forEach((snap) => {
                        const ticketObject = snap.val();
                        this.props.onAddUserTicket(ticketObject);
                    });
                });
            })
            .then(() => {
                this.setState({ redirect: '/my-bugs' });
            })
            .catch((err) => console.log(err));
    };

    checkFormValidity = () => {
        const { bugName, shortDescription, severity, stepsToReproduce } = this.state;
        const valuesWithHumanTitles = {
            'Name of Bug': bugName,
            'Short Description': shortDescription,
            Severity: severity,
            'Steps To Reproduce': stepsToReproduce,
        };
        const missingFieldsTitles = [];
        if (
            //Pushes friendly names of empty fields, then checks if all fields are filled
            Object.values(valuesWithHumanTitles)
                .map((el, index) => {
                    if (el === 'Select' || el === '') {
                        missingFieldsTitles.push(Object.keys(valuesWithHumanTitles)[index]);
                        return false;
                    } else {
                        return true;
                    }
                })
                .every((el) => el)
        ) {
            return true;
        } else {
            this.setState({ missingFields: missingFieldsTitles });
            return false;
        }
    };

    renderErrorMessage() {
        return this.state.formIncomplete ? (
            <p className="text-danger">
                Form is incomplete. Please review fields: {this.state.missingFields.join(', ')}
            </p>
        ) : null;
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }

        return (
            <Fragment>
                <h1 className="mt-4">Submit a Bug</h1>
                <div className="card-body">
                    <form onSubmit={() => {}}>
                        <div className="form-row">
                            <Input
                                title="Name of Bug"
                                required={true}
                                id="bugName"
                                type="text"
                                placeholder=""
                                onChange={(event) => this.setState({ bugName: event.target.value })}
                                value={this.state.bugName}
                                size="half"
                                />
                            <Input
                                title="Short Description"
                                required={true}
                                id="shortDescription"
                                type="text"
                                placeholder=""
                                onChange={(event) => {
                                    this.setState({ shortDescription: event.target.value });
                                }}
                                value={this.state.shortDescription}
                                size="half"
                            />
                        </div>
                        <div className="form-row">
                            <Select
                                title="Severity"
                                required={true}
                                onChange={(event) => {
                                    this.setState({ severity: event.target.value });
                                }}
                                options={['Select', 'Minor', 'Moderate', 'Severe']}
                                style={{ backgroundColor: this.state.colorCode[this.state.severity] }}
                            />
                            <Select
                                title="Assigned To"
                                onChange={(event) => {
                                    let idToSet = 'select';
                                    if (event.target.value !== 'Select') {
                                        idToSet = this.props.users[event.target.selectedIndex - 1].uid;
                                    }
                                    this.setState({
                                        assignedTo: event.target.value,
                                        assignedToId: idToSet,
                                    });
                                }}
                                options={['Select'].concat(
                                    this.props.users.map((userObject) => userObject.displayName)
                                )}
                            />
                        </div>
                        <div className="form-row">
                            <TextArea
                                title="Long Description"
                                id="longDescription"
                                type="text"
                                placeholder=""
                                onChange={(event) => this.setState({ longDescription: event.target.value })}
                                value={this.state.longDescription}
                                size="full"
                            />
                        </div>
                        <div className="form-row">
                            <TextArea
                                title="Steps to Reproduce"
                                required={true}
                                id="stepsToReproduce"
                                type="text"
                                placeholder=""
                                onChange={(event) => {
                                    this.setState({ stepsToReproduce: event.target.value });
                                }}
                                value={this.state.stepsToReproduce}
                                size="full"
                            />
                        </div>
                        {this.renderErrorMessage()}
                        <div className={classes.btnContainer}>
                            <button
                                onClick={(event) => {
                                    event.preventDefault();
                                    if (this.checkFormValidity()) {
                                        this.submitTicketHandler(
                                            // covers situation where there are no tickets
                                            this.props.tickets.length
                                                ? +this.props.tickets[this.props.tickets.length - 1].id + 1
                                                : 1,
                                            this.props.user
                                        );
                                    } else {
                                        this.setState({
                                            formIncomplete: true
                                        });
                                    }
                                }}
                                type="button"
                                className={`btn btn-outline-primary ${classes.submitBtn}`}
                            >
                                Submit
                            </button>
                            <button
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.setState({ redirect: '/my-bugs' });
                                }}
                                type="button"
                                className={`btn btn-outline-secondary ${classes.cancelBtn}`}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        tickets: state.tickets,
        users: state.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddUserTicket: (ticket) => dispatch({ type: ADD_USER_TICKET, payload: { ticket } }),
        onClearLocalTickets: () => dispatch({ type: CLEAR_LOCAL_TICKETS }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBug);
