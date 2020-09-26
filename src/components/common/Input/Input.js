import React from 'react';

export const Input = (props) => {
    const { title, id, type, placeholder, onChange, value, size } = props;
    const widthClass = size === 'half' ? 'col-md-6' : 'col-md-12';

    return (
        <div className={`${widthClass} my-3`}>
            <h5>{title}</h5>
            <input
                className="form-control py-4"
                aria-describedby={props.ariaDescribedBy}
                id={id}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
        </div>
    );
};
