import React from 'react';
import './Spinner.css';

export const Spinner = (props) => {
    return (
        <div style={{ height: '200px', width: '100%'}}>
            <div className="loader">Loading...</div>
        </div>
    );
};
