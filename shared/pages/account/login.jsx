import React, { PureComponent } from 'react'
import serialize from 'form-serialize'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as account from '../../ducks/account'
import LayoutBoarding from '../../components/layout/boarding.jsx'
import Form from '../../components/ui/form.jsx'
import { Button } from '../../components/ui/buttons.jsx'
import { Input } from '../../components/ui/field.jsx'

class Login extends PureComponent {

  constructor( props ) {
    super( props )
    this.handleSubmit = this.handleSubmit.bind( this )
  }

  handleSubmit( event ) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true } )
    this.props.login( {params: { body }} )
  }

  render() {
    const { props } = this
    const { intl } = props

    return (
      <LayoutBoarding title={intl.formatMessage({
        id: `account.login.title`,
        defaultMessage: `login`,
      })}>
        <Form id="login" action="/account/login" onSubmit={ this.handleSubmit } >
          <Input
            name="email"
            label="field.email"
            type="email"
            defaultValue=""
          />
          <Input
            name="password"
            label="field.password"
            type="password"
            defaultValue=""
          />
          <Button type="submit">
            <FormattedMessage id="account.login.button" defaultMessage="Connect" />
          </Button>
        </Form>
      </LayoutBoarding>
    )
  }
}

function dispatch2prop( dispatch ) {
  return bindActionCreators({
    login: account.login,
  }, dispatch)
}

export default connect(null, dispatch2prop)( ConnectDataFetcher({
  Component: injectIntl( Login ),
  actionCreators: [
  ],
}) )
