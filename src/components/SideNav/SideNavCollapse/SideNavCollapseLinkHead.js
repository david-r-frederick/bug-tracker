import React from 'react';

const SideNavCollapseLinkHead = (props) => {
    return (
        <a
            className="nav-link collapsed"
            href="/"
            data-toggle="collapse"
            data-target="#collapseLayouts"
            aria-expanded="false"
            aria-controls="collapseLayouts"
        >
            <div className="sb-nav-link-icon">
                <i className="fas fa-columns"></i>
            </div>
            {props.title}
            <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
            </div>
        </a>
    );
};

export default SideNavCollapseLinkHead;
