import React, { Component } from 'react';
import classes from './DataTableHead.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

class DataTableHead extends Component {
    renderIcon(name) {
        let iconToReturn = faSortUp;
        let style;
        if (this.props.ascend) {
            iconToReturn = faSortDown;
        }
        if (this.props.sortByCategory !== name) {
            style = { color: 'white' };
        }

        return <FontAwesomeIcon icon={iconToReturn} style={style} />;
    }

    render() {
        return (
            <thead>
                <tr>
                    {this.props.columnData.map((columnObject) => {
                        return (
                            <th key={columnObject.name}>
                                <button
                                    onClick={() => {
                                        this.props.onClick(columnObject.name);
                                    }}
                                    className={`${classes.tableHeadBtn} btn btn-default`}
                                >
                                    <p className={classes.columnHeadText}>{columnObject.label}</p>
                                    {this.renderIcon(columnObject.name)}
                                </button>
                            </th>
                        );
                    })}
                </tr>
            </thead>
        );
    }
}

export default DataTableHead;
