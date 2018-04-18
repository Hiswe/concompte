import   React              from 'react'
import { FormattedMessage } from 'react-intl'

import { Table, Row, Cell } from '../ui/table.jsx'
import { BtnIcon }    from '../ui/buttons.jsx'
import { DatePicker } from '../ui/date-picker.jsx'
import { Amount }     from '../ui/format.jsx'

const eventsColumns = [
  {label: `invoices.event.#`          , type: `id`     },
  {label: `invoices.event`            , type: `text`   },
  {label: `invoices.event.description`, type: `input`  },
  {label: `invoices.event.date`       , type: `input`  },
  {label: `invoices.event.amount`     , type: `input`  },
  {label: false                       , type: `action` },
]

function InvoiceEventsFooter( props ) {
  const { formData, currency } = props

  return (
    <tfoot>
      <tr>
        <td colSpan="4">
          <FormattedMessage id="table.amount.paid" />
        </td>
        <td>
          <Amount
            value={ formData.get(`totalPaid`) }
            currency={ currency }
          />
        </td>
        <td></td>
      </tr>
      <tr>
        <td colSpan="4">
          <FormattedMessage id="table.amount.left-to-pay" />
        </td>
        <td>
          <Amount
            value={ formData.get(`totalLeft`) }
            currency={ currency }
          />
        </td>
        <td></td>
      </tr>
    </tfoot>
  )
}

export default function InvoiceEvents( props ) {
  const { formData, handle } = props
  const payments = formData.get(`payments`)

  return (
    <Table
      columns={ eventsColumns }
      footer={ <InvoiceEventsFooter {...props} /> }
    >
      <Row>
        <Cell></Cell>
        <Cell>
          <FormattedMessage id="invoices.event.sent" />
        </Cell>
        <Cell type="text"> – </Cell>
        <Cell>
          <DatePicker
            name="sendAt"
            value={ formData.get(`sendAt`) }
            handleDayChange={ handle.dayChange }
          />
        </Cell>
        <Cell type="number"> – </Cell>
        <Cell></Cell>
      </Row>
      {payments.map((payment, index) => (
        <Row key={payment.get(`_id`)} >
          <Cell className="is-number">
            <input
              type="hidden"
              name={`${payment._fieldPath}[_id]`}
              value={ payment.get(`_id`) }
            />
            { index + 1 }
          </Cell>
          <Cell>
            <FormattedMessage id="invoices.event.payment" />
          </Cell>
          <Cell>
            <input
              type="text"
              key={`${payment._fieldPath}-${payment.get(`_id`)}-message`}
              name={`${payment._fieldPath}[message]`}
              defaultValue={payment.get(`message`)}
            />
          </Cell>
          <Cell>
            <DatePicker
              name={`${payment._fieldPath}[date]`}
              value={ payment.get(`date`) }
              handleDayChange={ handle.dayChange }
            />
          </Cell>
          <Cell>
            <input
              type="number"
              key={`${payment._fieldPath}-${payment.get(`_id`)}`}
              name={`${payment._fieldPath}[amount]`}
              defaultValue={ payment.get(`amount`) }
            />
          </Cell>
          <Cell className="is-action">
            {(index < payments.length - 1 )&& <BtnIcon
              linkAlike
              onClick={ e => handle.removePayment(index, payment._fieldPath) }
              type="button"
              svgId="delete"
            />}
          </Cell>
        </Row>
      ))}
    </Table>
  )
}
