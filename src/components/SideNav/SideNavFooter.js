import React from 'react';

const SideNavFooter = (props) => {
    return (
        <div className="sb-sidenav-footer">
            <div className="small">{props.header}</div>
            {props.main}
        </div>
    );
};

export default SideNavFooter;
