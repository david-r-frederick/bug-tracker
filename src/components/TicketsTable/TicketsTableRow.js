import React from 'react';
import { Link } from 'react-router-dom';

const TicketsTableRow = (props) => {
    const propsToArray = Object.entries(props);
    const idToPassToEditBugScreen = propsToArray.find((propArray) => {
        return propArray[0] === 'id';
    })[1];

    return (
        <tr role="row" key={props.id}>
            {propsToArray.map((val, index) => {
                let returnValue = val[1];
                if (val[0] === 'bugName') {
                    returnValue = (
                        <Link
                            to={{
                                pathname: `/edit/${idToPassToEditBugScreen}`,
                                state: {
                                    id: idToPassToEditBugScreen,
                                },
                            }}
                        >
                            {val[1]}
                        </Link>
                    );
                }
                return (
                    <td className={index === 0 ? 'sorting_1' : null} key={props.id + index}>
                        {returnValue}
                    </td>
                );
            })}
        </tr>
    );
};

export default TicketsTableRow;
