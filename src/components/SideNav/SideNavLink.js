import React from 'react';
import { NavLink } from 'react-router-dom';

const SideNavLink = (props) => (
    <NavLink className="nav-link" to={props.to}>
        <div className="sb-nav-link-icon">
            <i className={props.iconClass}></i>
        </div>
        {props.title}
    </NavLink>
);

export default SideNavLink;
