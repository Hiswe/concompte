import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as quotations from '../../ducks/quotations'
import { Main, Content } from '../../components/layout/main.jsx'
import NavSecondary from '../../components/nav/secondary.jsx'
import {
  ButtonNew,
  ButtonList,
  ButtonEdit,
} from '../../components/nav/secondary-buttons.jsx'
import PrintQuotation from '../../components/quotations/print.jsx'

const TYPE = `quotations`

function PrintQuotationPage( props ) {
  const { reference } = props
  const { id } = props.match.params
  const titleProps  = { id:`page.quotations.print`, values: {reference} }

  return (
    <Fragment>
      <FormattedMessage {...titleProps} >
        {title => <Helmet><title>{title}</title></Helmet>}
      </FormattedMessage>
      <NavSecondary
        title={ <FormattedMessage {...titleProps} /> }
      >
        <ButtonEdit type={ TYPE } id={id} />
        <ButtonList type={ TYPE } />
        <ButtonNew  type={ TYPE } secondary icon  />
      </NavSecondary>
      <Main>
        <Content>
          <PrintQuotation />
        </Content>
      </Main>
    </Fragment>
  )
}

function state2prop( state ) {
  return {
    reference:  state.quotations.get(`current.reference`)
  }
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: PrintQuotationPage,
  actionCreators: [
    quotations.getOne,
  ],
}) )

