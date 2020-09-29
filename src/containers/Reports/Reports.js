import React, { Fragment } from 'react';
import TicketsTableDownload from '../../components/TicketsTable/TicketsTableDownload/TicketsTableDownload'

const Reports = () => {
  return (
    <Fragment>
      <h1 className="mt-4 mb-3">Reports</h1>
      <TicketsTableDownload />
    </Fragment>
  )
}

export default Reports;