import React from 'react';

export const Select = (props) => {
    const { title, onChange, options, style } = props;

    return (
        <div className={`col-md-${props.width === 'full' ? '12' : '6'} my-3`}>
            <h5>
                {title}
                {props.required ? '*' : null}
            </h5>
            <select
                style={style}
                onChange={onChange}
                className="custom-select custom-select-lg form-control form-control-lg mt-1"
                value={props.value}
            >
                {options.map((opt) => {
                    return <option key={opt}>{opt}</option>;
                })}
            </select>
        </div>
    );
};
