import React, { Component } from 'react';
import { CSVLink } from 'react-csv';
import { connect } from 'react-redux';

const friendlyHeadersCode = {
   'assignedTo': 'Assigned To',
  'assignedToId': 'Assigned To ID',
  'bugName': 'Issue/Bug Name',
  'editedBy': 'Edited By',
  'editedById': 'ID of Last Editor',
  'editedTime': 'Time Last Edited',
  'id': 'Ticket Number',
  'longDescription': 'Long Description',
  'severity': 'Severity',
  'shortDescription': 'Short Description',
  'status': 'Current Status',
  'stepsToReproduce': 'Steps to Reproduce',
  'submittedBy': 'Submitted By',
  'submittedById': 'ID of Submitter',
  'timeSubmitted': 'Time Submitted',
}

class DataTableDownload extends Component {
    render() {
        let data = [];
        const { tickets } = this.props;
        let tableHeaders;
        if (tickets[0]) {
            tableHeaders = Object.keys(tickets[0]).map((key) => {
              return friendlyHeadersCode[key]
            });
            data.push(tableHeaders);
            tickets.forEach((ticketObject) => {
                const ticketData = [];
                Object.keys(friendlyHeadersCode).forEach(header => {
                  if (ticketObject[header]) {
                    ticketData.push(ticketObject[header]);
                  } else {
                    ticketData.push('Not Found');
                  }
                })
                data.push(ticketData);
            });
        }
        return <CSVLink className="btn btn-secondary" data={data}>Download XLS of All Tickets</CSVLink>;
    }
}

const mapStateToProps = (state) => {
    return {
        tickets: state.tickets,
    };
};

export default connect(mapStateToProps)(DataTableDownload);
