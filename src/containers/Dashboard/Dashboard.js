import React, { Component, Fragment } from 'react';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
// import Card from '../../components/Card/Card';
import TicketsTable from '../../components/TicketsTable/TicketsTable';

class Dashboard extends Component {
    render() {
        return (
            <Fragment>
                <h1 className="mt-4">Dashboard</h1>
                <BreadCrumbs crumbs={['Dashboard']} />
                {/* <div className="row"> */}
                    {/* <Card title="Primary Card" linkText="View Details" type="primary" />
                    <Card title="Warning Card" linkText="View Details" type="warning" />
                    <Card title="Success Card" linkText="View Details" type="success" />
                    <Card title="Danger Card" linkText="View Details" type="danger" /> */}
                {/* </div> */}
                <TicketsTable
                  noTicketsMessage={`There are no tickets to display. Click "Submit New Bug" above to create a new ticket`}
                />
            </Fragment>
        );
    }
}

export default Dashboard;
