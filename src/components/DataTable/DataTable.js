import React, { Component } from 'react';
import DataTableHead from './DataTableHead/DataTableHead';
import DataTableFoot from './DataTableFoot';

class DataTable extends Component {
    state = {
        amountOfEntriesToShow: 10,
        startingIndex: 0,
        endingIndex: 10,
        searchTerm: '',
        sortAscending: true,
        columnDataObjects: this.props.columnData,
        sortByCategory: this.props.columnData[0].name,
    };

    goToPage(pgNumber) {
        this.setState((prevState) => ({
            startingIndex: prevState.amountOfEntriesToShow * (pgNumber - 1),
            endingIndex: prevState.amountOfEntriesToShow * pgNumber,
        }));
    }

    setPageLimiter(limit) {
        this.setState((prevState) => ({
            amountOfEntriesToShow: limit,
            endingIndex: prevState.startingIndex + limit,
        }));
    }

    renderTableChildren() {
        const { startingIndex, endingIndex } = this.state;
        return this.getSearchResults()
            .sort((reactElementA, reactElementB) => {
                const compareResult =
                    reactElementA.props[this.state.sortByCategory] <= reactElementB.props[this.state.sortByCategory]
                        ? 1
                        : -1;
                return this.state.sortAscending ? -compareResult : compareResult;
            })
            .slice(startingIndex, endingIndex);
    }

    renderTicketsShowingMessage() {
        const num = this.getSearchResults().length;
        let limiter = this.props.children.length;
        let lastWord = 'entries';
        if (num === 0) {
            return 'There are no results';
        }
        if (num < this.props.children.length) {
            limiter = num;
            lastWord = 'results';
        }
        return `Showing ${this.state.startingIndex + 1} to ${Math.min(
            this.state.endingIndex,
            limiter
        )} of ${limiter} ${lastWord}`;
    }

    renderPreviousBtn() {
        return (
            <li
                className={`paginate_button page-item previous ${this.state.startingIndex ? null : 'disabled'}`}
                id="dataTable_previous"
            >
                <button
                    onClick={() => {
                        this.setState((prevState) => ({
                            startingIndex: Math.max(prevState.startingIndex - prevState.amountOfEntriesToShow, 0),
                            endingIndex: Math.max(
                                prevState.endingIndex - prevState.amountOfEntriesToShow,
                                prevState.amountOfEntriesToShow - 1
                            ),
                        }));
                    }}
                    aria-controls="dataTable"
                    data-dt-idx="0"
                    tabIndex="0"
                    className="page-link"
                >
                    Previous
                </button>
            </li>
        );
    }

    renderSwitchButtons() {
        let amountOfSwitches = Math.ceil(this.props.children.length / this.state.amountOfEntriesToShow);
        if (this.state.searchTerm) {
            amountOfSwitches = Math.ceil(this.getSearchResults().length / this.state.amountOfEntriesToShow);
        }
        return Array(amountOfSwitches)
            .fill(null)
            .map((el, index) => {
                return (
                    <li
                        key={index}
                        className={`paginate_button page-item ${
                            this.state.startingIndex / this.state.amountOfEntriesToShow === index ? 'active' : null
                        }`}
                    >
                        <button
                            onClick={() => this.goToPage(index + 1)}
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

    renderNextBtn() {
        return (
            <li
                className={`paginate_button page-item next ${
                    this.state.endingIndex >= this.props.children.length - 1 ||
                    this.state.endingIndex >= this.getSearchResults().length
                        ? 'disabled'
                        : null
                }`}
                id="dataTable_next"
            >
                <button
                    onClick={() => {
                        this.setState((prevState) => ({
                            startingIndex: prevState.startingIndex + prevState.amountOfEntriesToShow,
                            endingIndex: prevState.endingIndex + prevState.amountOfEntriesToShow,
                        }));
                    }}
                    aria-controls="dataTable"
                    data-dt-idx="7"
                    tabIndex="0"
                    className="page-link"
                >
                    Next
                </button>
            </li>
        );
    }

    getSearchResults() {
        const searchString = new RegExp(this.state.searchTerm, 'gi');
        return this.props.children.filter((reactElement) => {
            const elementValues = Object.values(reactElement.props);
            for (let i = 0; i < elementValues.length; i++) {
                if (searchString.test(elementValues[i])) {
                    return reactElement;
                }
            }
            return null;
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
                                                    onChange={(event) => this.setPageLimiter(+event.target.value)}
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
                                                    onChange={(event) => {
                                                        const searchTerm = event.target.value;
                                                        this.setState((prevState) => ({
                                                            searchTerm,
                                                            startingIndex: 0,
                                                            endingIndex: prevState.amountOfEntriesToShow,
                                                        }));
                                                    }}
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
                                            {this.renderTicketsShowingMessage()}
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-7">
                                        <div
                                            className="dataTables_paginate paging_simple_numbers"
                                            id="dataTable_paginate"
                                        >
                                            <ul className="pagination">
                                                {this.renderPreviousBtn()}
                                                {this.renderSwitchButtons()}
                                                {this.renderNextBtn()}
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
