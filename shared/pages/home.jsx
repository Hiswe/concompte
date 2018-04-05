import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { injectIntl, FormattedHTMLMessage } from 'react-intl'

import ConnectDataFetcher from '../connect-data-fetcher.js'
import * as quotations from '../ducks/quotations.js'
import * as invoices from '../ducks/invoices.js'
import NavSecondary from '../components/nav/secondary.jsx'
import { ButtonNew } from '../components/nav/secondary-buttons.jsx'
import { Main, Content } from '../components/layout/main.jsx'
import QuotationsList from '../components/quotations/list.jsx'
import InvoicesList from '../components/invoices/list.jsx'

function Home( props ) {
  const { intl } = props

  return (
    <Fragment>
      <NavSecondary title={intl.formatMessage({id: `page.home`})}>
        <ButtonNew type="quotations" />
      </NavSecondary>
      <Main>
        <Content>
          <h3>
            <FormattedHTMLMessage id="page.quotations" />
          </h3>
          <QuotationsList />
          <h3>
            <FormattedHTMLMessage id="page.invoices" />
          </h3>
          <InvoicesList />
        </Content>
      </Main>
    </Fragment>
  )
}

export default connect()( ConnectDataFetcher({
  Component: injectIntl( Home ),
  actionCreators: [
    quotations.getAll,
    invoices.getAll,
  ],
}) )
