import React, { Component, Fragment } from 'react';
import { Input, Select, TextArea, Modal } from '../../components/common';
import classes from './EditBug.module.css';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ADD_USER_TICKET, CLEAR_LOCAL_TICKETS } from '../../store/actions/actionTypes';

class EditBug extends Component {
    state = {
        bugName: '',
        shortDescription: '',
        severity: '',
        assignedTo: 'Select',
        assignedToId: '',
        longDescription: '',
        stepsToReproduce: '',
        colorCode: { Select: '#fff', Minor: '#fcffad', Moderate: '#ffd685', Severe: '#ff8585' },
        redirect: null,
        formIncomplete: false,
        missingFields: [],
        showModal: false,
    };

    componentDidMount() {
        const currentTicketData = this.props.tickets.find((ticket) => ticket.id === this.props.location.state.id);
        const {
            bugName,
            shortDescription,
            severity,
            assignedTo,
            assignedToId,
            longDescription,
            stepsToReproduce,
        } = currentTicketData;
        this.setState({
            bugName,
            shortDescription,
            severity,
            assignedTo,
            assignedToId,
            longDescription,
            stepsToReproduce,
        });
    }

    submitEditedTicketHandler = (id, user) => {
        const {
            bugName,
            shortDescription,
            severity,
            assignedTo,
            assignedToId,
            longDescription,
            stepsToReproduce,
        } = this.state;
        const currentTicketData = this.props.tickets.find((ticket) => ticket.id === this.props.location.state.id);
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
                submittedBy: currentTicketData.submittedBy,
                submittedById: currentTicketData.submittedById,
                timeSubmitted: currentTicketData.timeSubmitted,
                editedBy: this.props.user.displayName,
                editedById: this.props.user.uid,
                // editedTime example: Thu Sep 24 2020 09:18:18
                editedTime: new Date().toString().substring(0, 24),
            })
            // .then(() => {
            //     this.props.onClearLocalTickets();
            // })
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

    deleteTicketHandler() {
        const toBeDeletedId = this.props.location.state.id;
        const database = firebase.database();
        database
            .ref(`/tickets/${toBeDeletedId}`)
            .remove()
            // .then(() => this.props.onClearLocalTickets())
            .then(() => {
                database.ref(`tickets`).on('value', (snapShot) => {
                    snapShot.forEach((snap) => {
                        const ticketObject = snap.val();
                        this.props.onAddUserTicket(ticketObject);
                    });
                });
            })
            .then(() => this.setState({ redirect: '/my-bugs' }))
            .then(() => console.log('TICKET DELETED SUCCESSFULLY'))
            .catch((err) => console.log(err.message));
    }

    showDeleteModal() {
        return (
            <Modal
                title="Are you sure you want to delete this ticket?"
                showModal={this.state.showModal}
                closeModal={() => this.setState({ showModal: false })}
                deleteFunction={() => this.deleteTicketHandler()}
            />
        );
    }

    formIsValid = () => {
        const { bugName, shortDescription, severity, stepsToReproduce } = this.state;
        const valuesWithHumanTitles = {
            'Name of Bug': bugName,
            'Short Description': shortDescription,
            Severity: severity,
            'Steps To Reproduce': stepsToReproduce,
        };
        const missingFieldsTitles = [];
        //Pushes friendly names of empty fields, then checks if all fields are filled
        if (
            Object.values(valuesWithHumanTitles)
                .map((el, index) => {
                    if (el === 'Select' || el === '') {
                        missingFieldsTitles.push(Object.keys(valuesWithHumanTitles)[index]);
                        return false;
                    } else {
                        return true;
                    }
                })
                .every((e) => e)
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
                <h1 className="mt-4">Edit Bug</h1>
                <div className="card-body">
                    <form onSubmit={() => {}}>
                        <div className="form-row">
                            <Input
                                title="Name of Bug"
                                id="bugName"
                                type="text"
                                placeholder=""
                                onChange={(event) => this.setState({ bugName: event.target.value })}
                                value={this.state.bugName}
                                size="half"
                            />
                            <Input
                                title="Short Description"
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
                                onChange={(event) => {
                                    this.setState({ severity: event.target.value });
                                }}
                                options={['Select', 'Minor', 'Moderate', 'Severe']}
                                style={{ backgroundColor: this.state.colorCode[this.state.severity] }}
                                value={this.state.severity}
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
                                options={['Select'].concat(this.props.users.map((userObj) => userObj.displayName))}
                                value={this.state.assignedTo}
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
                                    if (this.formIsValid()) {
                                        this.submitEditedTicketHandler(this.props.location.state.id, this.props.user);
                                    } else {
                                        this.setState({
                                            formIncomplete: true,
                                        });
                                    }
                                }}
                                type="button"
                                className={`btn btn-primary ${classes.editScreenBtn}`}
                            >
                                Submit
                            </button>
                            <button
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.setState({ showModal: true });
                                }}
                                type="button"
                                className={`btn btn-danger ${classes.editScreenBtn}`}
                            >
                                Delete
                            </button>
                            <button
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.setState({ redirect: '/my-bugs' });
                                }}
                                type="button"
                                className={`btn btn-default ${classes.editScreenBtn}`}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                    {this.showDeleteModal()}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tickets: state.tickets,
        users: state.users,
        user: state.auth.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddUserTicket: (ticket) => dispatch({ type: ADD_USER_TICKET, payload: { ticket } }),
        // onClearLocalTickets: () => dispatch({ type: CLEAR_LOCAL_TICKETS }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBug);
