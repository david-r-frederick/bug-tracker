import React from 'react';

export const TextArea = (props) => {
    const { title, id, type, placeholder, onChange, value } = props;

    return (
        <div className={`col-md-12 my-3`}>
            <h5>{title}{props.required ? '*' : null}</h5>
            <textarea
                className="form-control py-2"
                rows="4"
                cols="50"
                id={id}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
        </div>
    );
};
