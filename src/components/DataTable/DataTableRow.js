import React from 'react';

const DataTableRow = (props) => {
    return (
        <tr role="row" key={props.id}>
            {props.values.map((val, index) => (
                <td className={index === 0 ? 'sorting_1' : null} key={props.id + index}>
                    {val}
                </td>
            ))}
        </tr>
    );
};

export default DataTableRow;
