import React from 'react';

const AuthInput = (props) => {
    const { title, id, type, placeholder, onChange, value, size } = props;
    const widthClass = size === 'half' ? 'col-md-6' : 'col-md-12';

    return (
        <div className={`${widthClass} mt-2`}>
            <div className="form-group">
                <label className="small mb-1" htmlFor={id}>
                    {title}
                </label>
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
        </div>
    );
};

export default AuthInput;
