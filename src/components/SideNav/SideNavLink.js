import React from 'react';
import { NavLink } from 'react-router-dom';
import { toggleSideNav } from '../../appActions';

const SideNavLink = (props) => (
    <NavLink
        className="nav-link"
        to={props.to}
        onClick={() => {
            if (window.innerWidth < 992) {
                toggleSideNav();
            }
        }}
    >
        <div className="sb-nav-link-icon">
            <i className={props.iconClass}></i>
        </div>
        {props.title}
    </NavLink>
);

export default SideNavLink;
