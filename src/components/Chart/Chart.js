import React from 'react';

const Chart = (props) => {
    return (
        <div className="col-xl-6">
            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-chart-area mr-1"></i>
                    {props.title}
                </div>
                <div className="card-body">
                    <canvas id={props.id} width="100%" height="40"></canvas>
                </div>
            </div>
        </div>
    );
};

export default Chart;