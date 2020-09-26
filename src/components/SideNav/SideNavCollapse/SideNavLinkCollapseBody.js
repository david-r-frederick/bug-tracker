import React from 'react';

const SideNavLinkCollapseBody = (props) => {
    return (
        <div
            className="collapse"
            id="collapseLayouts"
            aria-labelledby="headingOne"
            data-parent="#sidenavAccordion"
        >
            <nav className="sb-sidenav-menu-nested nav">
                {props.children}
            </nav>
        </div>
    );
};

export default SideNavLinkCollapseBody;
