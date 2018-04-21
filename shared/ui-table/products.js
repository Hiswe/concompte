import   React              from 'react'
import   classNames         from 'classnames'
import { FormattedMessage } from 'react-intl'

import * as compute from '../utils/compute-total'
import { Amount, Markdown, FormatNumber } from '../ui/format'
import TextareaAutoResize from '../ui/textarea-auto-resize'
import { Table, Row, Cell, TableFooter, RowFooter } from './index'

// only use defaultValue
// • handleChange is handled globally at the form level

export function ProductLineEditable( props ) {
  const { fieldPath, product } = props
  const total = compute.productTotal( product )

  return (
    <Row>
      <Cell>
        <input
          type="hidden"
          name={`${fieldPath}[_id]`}
          value={ product.get(`_id`) }
        />
        <TextareaAutoResize
          name={`${fieldPath}[description]`}
          defaultValue={ product.get(`description`) }
          placeholder="product.place-holder"
        />
      </Cell>
      <Cell>
        <input
          type="number"
          min="0"
          step="0.25"
          name={ `${fieldPath}[quantity]` }
          defaultValue={ product.get(`quantity`) }
        />
      </Cell>
      <Cell>
        <input
          type="number"
          min="0"
          step="0.5"
          name={ `${fieldPath}[price]` }
          defaultValue={ product.get(`price`) }
        />
      </Cell>
      <Cell>
        <Amount value={ total } />
      </Cell>
      <Cell>
        { props.children }
      </Cell>
    </Row>
  )
}

export function ProductLineDisplay( props ) {
  const { fieldPath, product } = props
  const total = compute.productTotal( product )
  return (
    <Row>
      <Cell type="text">
        <Markdown text={ product.description } />
      </Cell>
      <Cell type="number">
        <FormatNumber value={ product.quantity } minimumFractionDigits={2} />
      </Cell>
      <Cell type="number">
        <FormatNumber value={ product.price } minimumFractionDigits={2} />
      </Cell>
      <Cell>
        <Amount value={ total } />
      </Cell>
    </Row>
  )
}

function TotalFooter( props ) {
  const { products, tax, readOnly } = props
  const totals = compute.totals( products, tax )
  return (
    <TableFooter>
      <RowFooter>
        <Cell colSpan="3" type="number">
          <FormattedMessage id="table.amount-ht"/>
        </Cell>
        <Cell type="amount">
          <Amount value={ totals.net } />
        </Cell>
        { !readOnly && <Cell /> }
      </RowFooter>
      <RowFooter>
        <Cell colSpan="3" type="number">
          <FormattedMessage id="table.amount-taxes"/>
        </Cell>
        <Cell type="amount">
          <Amount value={ totals.tax } />
        </Cell>
        { !readOnly && <Cell /> }
      </RowFooter>
      <RowFooter>
        <Cell colSpan="3" type="number">
          <FormattedMessage id="table.amount"/>
        </Cell>
        <Cell type="amount">
          <Amount value={ totals.all } />
        </Cell>
        { !readOnly && <Cell /> }
      </RowFooter>
    </TableFooter>
  )
}

export function ProductTable( props ) {
  const { readOnly } = props
  const columns = [
    {id: `description` , label: `table.header.description` , type: `input`        },
    {id: `quantity`    , label: `table.header.quantity`    , type: `input number` },
    {id: `price`       , label: `table.header.unit-price`  , type: `input number` },
    {id: `amount`      , label: `table.amount`             , type: `amount`       },
    {id: `action`      , label: false                      , type: `action`       }
  ]
  const hideColumns = readOnly ? [`action`] : []
  const COMP_CLASS  = classNames( `table--product`, {
    [`table--print`]: readOnly,
  })
  return (
    <Table
      columns={ columns }
      hideColumns={ hideColumns }
      className={ COMP_CLASS }
      footer={ <TotalFooter {...props} /> }
    >
      { props.children }
    </Table>
  )
}
