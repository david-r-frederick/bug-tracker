import React from 'react';

//props.type can be any of the following:
//primary, warning, danger, success, standard, default
//xl width is 1/4. md width is 1/2. sm width is 1/1.
const Card = (props) => {
    const textColor = props.type === 'default' ? 'black' : 'white';
    const cardType = props.type ? props.type : 'default';

    return (
        <div className="col-xl-3 col-md-6">
            <div className={`card bg-${cardType} text-${textColor} mb-4`}>
                <div className="card-body">{props.title}</div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                    <a
                        className={`small text-${textColor} stretched-link`}
                        href={props.href}
                    >
                        {props.linkText}
                    </a>
                    <div className={`small text-${textColor}`}>
                        <i className="fas fa-angle-right"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
