import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

import * as quotations from '../../ducks/quotations.js'
import * as TableUtils from '../utils/tables'
import { Table , EmptyLine } from '../ui/table.jsx'
import { Amount, Date      } from '../ui/format.jsx'
import { Button            } from '../ui/buttons.jsx'
import ButtonArchiveQuotation from './button-archive-quotation.jsx'
import ButtonCreateInvoice    from './button-create-invoice.jsx'
import ButtonShowInvoice      from './button-show-invoice.jsx'

function QuotationRow( props ) {
  const { quotation, hideCustomer, hideInvoice } = props
  const id = quotation.get( `id` )
  return (
    <tr>
      <td>
        <Link to={`/quotations/${id}`}>
          { quotation.get(`reference`) }
        </Link>
      </td>
      <td>
        <Link to={`/quotations/${id}`}>
          {quotation.get(`name`)}
        </Link>
      </td>
      {!hideCustomer && (
        <td>
          <Link to={`/customers/${quotation.get(`customerId`)}`}>
            {quotation.get(`customer.name`)}
          </Link>
        </td>
      )}
      <td>
        <p>
          <Date value={quotation.get(`sendAt`)} />
        </p>
      </td>
      <td>
        <p>
          <Date value={quotation.get(`validatedAt`)} />
        </p>
      </td>
      <td>
        <p>
          <Date value={quotation.get(`signedAt`)} />
        </p>
      </td>
      {!hideInvoice && (
        <td>
          <ButtonShowInvoice  quotation={ quotation } />
          <ButtonCreateInvoice quotation={ quotation } />
        </td>
      )}
      <td className="is-number">
        <Amount value={quotation.get(`total`) } />
      </td>
      <td className="is-action">
        <ButtonArchiveQuotation icon quotation={ quotation } />
      </td>
    </tr>
  )
}

const defaultColumns = [
  {label: `table.header.id`},
  {label: `table.header.name`},
  {label: `table.header.customer`},
  {label: `table.header.sent`},
  {label: `table.header.validated`},
  {label: `table.header.signed`},
  {label: `table.header.invoice`},
  {label: `table.amount`},
  {label: false },
]

const filterColumn = key => column => column.label !== key

function filterColumns({ hideInvoice, hideCustomer }) {
  let columns = defaultColumns
  if ( hideCustomer ) {
    columns = columns.filter( TableUtils.filterColumn(`customer`) )
  }
  if ( hideInvoice ) {
    columns = columns.filter( TableUtils.filterColumn(`invoice`) )
  }
  return columns
}

function QuotationsList( props ) {
  const {
    quotations,
    handlePagination,
    hideOnEmpty  = false,
    hideInvoice  = false,
    hideCustomer = false,
    ...others
  } = props
  const hasQuotations  = TableUtils.hasRows( quotations )
  if ( hideOnEmpty && !hasQuotations ) return null
  const columns        = filterColumns({ hideInvoice, hideCustomer })
  const columnCount    = columns.length
  return (
    <Table
      presentation
      columns={ columns }
      handlePagination={ handlePagination }
      { ...others }
    >
    {
      !hasQuotations ? ( <EmptyLine colSpan={ columnCount } /> )
      : quotations.map( (q, i) => (
        <QuotationRow
          key={ q.id }
          hideCustomer={ hideCustomer }
          hideInvoice={  hideInvoice }
          quotation={ q }
        />
      ))
    }
    </Table>
  )
}

export const ActiveQuotations = connect(
  state => ({
    quotations:   state.quotations.get(`active`),
    meta:         state.quotations.get(`meta.active`),
    hideInvoice:  true,
  }),
  dispatch => ( bindActionCreators({
    handlePagination: quotations.getActive
  }, dispatch ))
)( QuotationsList )

export const QuotationsReadyToInvoice = connect(
  state => ({
    quotations:   state.quotations.get(`readyToInvoice`),
    meta:         state.quotations.get(`meta.readyToInvoice`),
    title:        `quotation.ready-to-invoice`,
    hideOnEmpty:  true,
  }),
  dispatch => ( bindActionCreators({
    handlePagination: quotations.getReadyToInvoice
  }, dispatch ))
)(  QuotationsList )

export const CustomerQuotations = connect(
  state => ({
    quotations:   state.quotations.get(`active`),
    meta:         state.quotations.get(`meta.active`),
    hideCustomer: true,
  }),
  dispatch => ( bindActionCreators({
    handlePagination: quotations.getAllForCustomer
  }, dispatch ))
)( QuotationsList )

export default QuotationsList
