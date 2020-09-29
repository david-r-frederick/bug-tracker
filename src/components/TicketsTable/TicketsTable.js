import React, { Component } from 'react';
import TicketsTableRow from './TicketsTableRow';
import DataTable from '../DataTable/DataTable';
import { connect } from 'react-redux';

class TicketsTable extends Component {
    renderTicketRows(filter) {
        let ticketsElements = this.props.tickets;
        if (filter) {
            ticketsElements = ticketsElements.filter((ticketObject) => {
                if (ticketObject.assignedToId === this.props.user.uid) {
                    return true;
                }
                return false;
            });
        }

        return ticketsElements.map((ticketObj) => {
            let assignedTo = ticketObj.assignedTo;
            if (ticketObj.assignedTo === 'Select') {
              assignedTo = "Unassigned";
            }
            const { id, bugName, severity, submittedBy, shortDescription } = ticketObj;
            return (
                <TicketsTableRow
                    id={id}
                    bugName={bugName}
                    severity={severity}
                    submittedBy={submittedBy}
                    assignedTo={assignedTo}
                    behavior={shortDescription}
                    key={id}
                />
            );
        });
    }

    render() {
        return (
            <DataTable
                noDataMessage={<h5>{this.props.noTicketsMessage}</h5>}
                columnData={[
                    { label: 'Ticket Number', name: 'id' },
                    { label: 'Issue', name: 'bugName' },
                    { label: 'Severity', name: 'severity' },
                    { label: 'Submitted By', name: 'submittedBy' },
                    { label: 'Assigned To', name: 'assignedTo' },
                    { label: 'Behavior', name: 'behavior' },
                ]}
                title="Tickets"
            >
                {this.renderTicketRows(this.props.filter)}
            </DataTable>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tickets: state.tickets,
        user: state.auth.user,
    };
};

export default connect(mapStateToProps)(TicketsTable);
