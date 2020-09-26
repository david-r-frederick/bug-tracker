import React from 'react';

const BreadCrumbs = (props) => {
    return (
        <ol className="breadcrumb mb-4">
            {props.crumbs.map((crumb) => (
                <li key={crumb} className="breadcrumb-item active">
                    {crumb}
                </li>
            ))}
        </ol>
    );
};

export default BreadCrumbs;
