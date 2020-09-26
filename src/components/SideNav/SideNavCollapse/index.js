import React, { Fragment } from 'react';
import SideNavCollapseLinkHead from './SideNavCollapseLinkHead';
import SideNavCollapseLinkBody from './SideNavLinkCollapseBody';
import { Link } from 'react-router-dom';

const SideNavCollapse = (props) => {
    return (
        <Fragment>
            <SideNavCollapseLinkHead title={props.headTitle} />
            <SideNavCollapseLinkBody>
                {props.links.map((element) => (
                    <Link key={element.title} className="nav-link" to={element.href}>
                        {element.title}
                    </Link>
                ))}
            </SideNavCollapseLinkBody>
        </Fragment>
    );
};

export default SideNavCollapse;
