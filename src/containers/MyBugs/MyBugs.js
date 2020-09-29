import React, { Component, Fragment } from 'react';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import TicketsTable from '../../components/TicketsTable/TicketsTable';
import { connect } from 'react-redux';

class MyBugs extends Component {
    render() {
        return (
            <Fragment>
                <h1 className="mt-4">My Bugs</h1>
                <BreadCrumbs crumbs={['My Bugs']} />
                <TicketsTable
                  filter={this.props.user.uid}
                  noTicketsMessage="There are no tickets assigned to you."
                />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

export default connect(mapStateToProps, null)(MyBugs);
