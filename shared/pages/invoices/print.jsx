import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as invoices from '../../ducks/invoices'
import { Main, Content } from '../../components/layout/main.jsx'
import NavSecondary from '../../components/nav/secondary.jsx'
import {
  ButtonList,
  ButtonEdit,
} from '../../components/nav/secondary-buttons.jsx'
import PrintInvoice from '../../components/invoices/print.jsx'

const TYPE = `invoices`

function PrintInvoicePage( props ) {
  const { reference, intl } = props
  const { id } = props.match.params

  return (
    <Fragment>
      <NavSecondary title={intl.formatMessage(
        {id: `page.invoices.print`},
        {reference: props.reference}
      )}>
        <ButtonList type={TYPE} />
        <ButtonEdit type={TYPE} id={id} />
      </NavSecondary>
      <Main>
        <Content>
          <PrintInvoice />
        </Content>
      </Main>
    </Fragment>
  )
}

function state2prop( state ) {
  return {
    reference:  state.invoices.get( `current.reference` ),
  }
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: injectIntl( PrintInvoicePage ),
  actionCreators: [
    invoices.getOne,
  ],
}) )
