import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as customers from '../../ducks/customers'
import NavSecondary from '../../components/nav/secondary.jsx'
import {
  ButtonNew,
  ButtonList,
  ButtonSubmit,
} from '../../components/nav/secondary-buttons.jsx'
import CustomerForm from '../../components/customers/form.jsx'
import { FORM_ID } from '../../components/customers/form.pres.jsx'

const TYPE = `customers`

function EditCustomer( props ) {
  const { intl } = props

  return (
    <Fragment>
      <NavSecondary title={intl.formatMessage(
        {id: `page.customers.edit`},
        {name: props.name}
      )}>
        <ButtonNew  type={ TYPE } secondary  />
        <ButtonList type={ TYPE } />
        <ButtonSubmit formId={FORM_ID} isSaving={ props.isSaving } />
      </NavSecondary>
      <CustomerForm {...props} />
    </Fragment>
  )
}

function state2prop( state ) {
  return {
    name:     state.customers.get( `current.name` ),
    isSaving: state.customers.get( `isSaving` ),
  }
}

export default connect( state2prop )( ConnectDataFetcher({
  Component: injectIntl( EditCustomer ),
  actionCreators: [
    customers.getOne
  ],
}) )
