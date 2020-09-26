import React, { Component } from 'react';
import DataTableHead from './DataTableHead/DataTableHead';
import DataTableFoot from './DataTableFoot';

let entriesCount;

class DataTable extends Component {
    state = {
        searchTerm: '',
        amountOfEntriesToShow: 25,
        currentlyViewedPage: 1,
        columnDataObjects: this.props.columnData,
        sortAscending: true,
        sortByCategory: this.props.columnData[0].name,
    };

    renderTableChildren() {
        const searchString = new RegExp(this.state.searchTerm, 'gi');
        const { currentlyViewedPage, amountOfEntriesToShow } = this.state;

        const rowsOfData = this.props.children
            .filter((reactElement) => {
                const elementValues = Object.values(reactElement.props);
                for (let i = 0; i < elementValues.length; i++) {
                    if (searchString.test(elementValues[i])) {
                        return reactElement;
                    }
                }
                return null;
            })
            .sort((reactElementA, reactElementB) => {
                const compareResult =
                    reactElementA.props[this.state.sortByCategory] <= reactElementB.props[this.state.sortByCategory]
                        ? 1
                        : -1;
                return this.state.sortAscending ? -compareResult : compareResult;
            })
            .slice(
                currentlyViewedPage * amountOfEntriesToShow - amountOfEntriesToShow,
                currentlyViewedPage * amountOfEntriesToShow
            );

        //This is a bad way to handle getting the current amount of rendered rows
        entriesCount = rowsOfData.length;
        return rowsOfData;
    }

    renderSwitchButtons() {
        return Array(Math.ceil(this.props.children.length / this.state.amountOfEntriesToShow))
            .fill(null)
            .map((el, index) => {
                return (
                    <li
                        key={index}
                        className={`paginate_button page-item ${
                            this.state.currentlyViewedPage === index + 1 ? 'active' : null
                        }`}
                    >
                        <button
                            onClick={() => {
                                this.setState({
                                    currentlyViewedPage: index + 1,
                                });
                            }}
                            aria-controls="dataTable"
                            data-dt-idx="1"
                            tabIndex="0"
                            className="page-link"
                        >
                            {index + 1}
                        </button>
                    </li>
                );
            });
    }

    render() {
        return (
            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table mr-1"></i>
                    {this.props.title}
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        {this.props.children.length > 0 ? (
                            <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                                <div className="row">
                                    <div className="col-sm-12 col-md-6">
                                        <div className="dataTables_length" id="dataTable_length">
                                            <label>
                                                Show{' '}
                                                <select
                                                    name="dataTable_length"
                                                    aria-controls="dataTable"
                                                    className="custom-select custom-select-sm form-control form-control-sm"
                                                    value={this.state.amountOfEntriesToShow}
                                                    onChange={(event) => {
                                                        this.setState({
                                                            amountOfEntriesToShow: event.target.value,
                                                        });
                                                    }}
                                                >
                                                    <option value="5">5</option>
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                </select>{' '}
                                                entries
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <div id="dataTable_filter" className="dataTables_filter">
                                            <label>
                                                Search:
                                                <input
                                                    type="search"
                                                    className="form-control form-control-sm"
                                                    aria-controls="dataTable"
                                                    value={this.state.searchTerm}
                                                    onChange={(event) =>
                                                        this.setState({ searchTerm: event.target.value })
                                                    }
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <table className="table" id="dataTable" width="100%" cellSpacing="0">
                                            <DataTableHead
                                                columnData={this.props.columnData}
                                                sortByCategory={this.state.sortByCategory}
                                                ascend={this.state.sortAscending}
                                                onClick={(name) => {
                                                    this.setState((prevState) => {
                                                        let sortAscending = true;
                                                        if (prevState.sortByCategory === name) {
                                                            sortAscending = !prevState.sortAscending;
                                                        }
                                                        return {
                                                            sortByCategory: name,
                                                            sortAscending,
                                                        };
                                                    });
                                                }}
                                            />
                                            <DataTableFoot columnData={this.props.columnData} />
                                            <tbody id="tbodyTestId">{this.renderTableChildren()}</tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-5">
                                        <div
                                            className="dataTables_info"
                                            id="dataTable_info"
                                            role="status"
                                            aria-live="polite"
                                        >
                                            {`Showing 1 to ${entriesCount} of ${this.props.children.length} entries`}
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-7">
                                        <div
                                            className="dataTables_paginate paging_simple_numbers"
                                            id="dataTable_paginate"
                                        >
                                            <ul className="pagination">
                                                <li
                                                    className={`paginate_button page-item previous ${
                                                        this.state.currentlyViewedPage === 1 ? 'disabled' : null
                                                    }`}
                                                    id="dataTable_previous"
                                                >
                                                    <button
                                                        onClick={() => {
                                                            this.setState({
                                                                currentlyViewedPage: this.state.currentlyViewedPage - 1,
                                                            });
                                                        }}
                                                        aria-controls="dataTable"
                                                        data-dt-idx="0"
                                                        tabIndex="0"
                                                        className="page-link"
                                                    >
                                                        Previous
                                                    </button>
                                                </li>
                                                {this.renderSwitchButtons()}
                                                <li
                                                    className={`paginate_button page-item next ${
                                                        this.state.currentlyViewedPage ===
                                                        Math.ceil(
                                                            this.props.children.length /
                                                                this.state.amountOfEntriesToShow
                                                        )
                                                            ? 'disabled'
                                                            : null
                                                    }`}
                                                    id="dataTable_next"
                                                >
                                                    <button
                                                        onClick={() => {
                                                            this.setState({
                                                                currentlyViewedPage: this.state.currentlyViewedPage + 1,
                                                            });
                                                        }}
                                                        aria-controls="dataTable"
                                                        data-dt-idx="7"
                                                        tabIndex="0"
                                                        className="page-link"
                                                    >
                                                        Next
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            this.props.noDataMessage
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default DataTable;
