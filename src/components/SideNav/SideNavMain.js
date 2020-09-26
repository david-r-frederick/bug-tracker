import React, { Component } from 'react';
import SideNavLink from './SideNavLink';
import SideNavCollapse from './SideNavCollapse';
import SideNavFooter from './SideNavFooter';
import { connect } from 'react-redux';

class SideNavMain extends Component {
    render() {
        return (
            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">CORE</div>
                            <SideNavLink title="Dashboard" iconClass="fas fa-tachometer-alt" to="/dashboard" />
                            <SideNavLink title="My Bugs" iconClass="fas fa-tachometer-alt" to="/my-bugs" />
                            <SideNavLink title="Reports" iconClass="fas fa-tachometer-alt" to="/reports" />
                            {/* <SideNavMenuHeading title="Interface" />
                            <SideNavCollapse
                                headTitle="Layouts"
                                links={[
                                    { title: 'Static Navigation', href: '/dashboard' },
                                    { title: 'Light Sidenav Dawg', href: '/dashboard' },
                                ]}
                            />
                            <SideNavMenuHeading title="Addons" />
                            <SideNavLink title="Charts" iconClass="fas fa-chart-area" to="/charts" />
                            <SideNavLink title="Tables" iconClass="fas fa-table" to="/tables" /> */}
                        </div>
                    </div>
                    <SideNavFooter header="Logged in as:" main={this.props.displayName} />
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        displayName: state.auth.displayName,
    };
};

export default connect(mapStateToProps)(SideNavMain);
