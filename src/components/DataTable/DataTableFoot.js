import React from 'react';

const DataTableFoot = (props) => {
    return (
        <tfoot>
            <tr>
                {props.columnData.map((columnObject) => {
                    return <th rowSpan="1" colSpan="1" key={columnObject.name}>{columnObject.label}</th>;
                })}
            </tr>
        </tfoot>
    );
};

export default DataTableFoot;
