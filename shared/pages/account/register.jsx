import React, { PureComponent, Fragment } from 'react'
import serialize from 'form-serialize'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet'

import ConnectDataFetcher from '../../connect-data-fetcher.js'
import * as account from '../../ducks/account'
import LayoutBoarding from '../../components/layout/boarding.jsx'
import Form from '../../components/ui/form.jsx'
import { Button } from '../../components/ui/buttons.jsx'
import { Input } from '../../components/ui/field.jsx'

class Register extends PureComponent {

  constructor( props ) {
    super( props )
    this.handleSubmit = this.handleSubmit.bind( this )
  }

  handleSubmit( event ) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true } )
    this.props.register({ body })
  }

  render() {
    const { props } = this
    const titleProps  = { id:`account.register.title` }

    return (
      <Fragment>
        <FormattedMessage {...titleProps} >
          {title => <Helmet><title>{title}</title></Helmet>}
        </FormattedMessage>
        <LayoutBoarding
          title={ <FormattedMessage {...titleProps} /> }
        >
          <Form action="/account/register" onSubmit={ this.handleSubmit } >
            <Input
              name="email"
              label="field.email"
              type="email"
              defaultValue=""
            />
            <Input
              name="password"
              type="password"
              label="field.password"
              defaultValue=""
            />
            <Button type="submit">
              <FormattedMessage id="account.register.button" defaultValue="Create" />
            </Button>
          </Form>
        </LayoutBoarding>
      </Fragment>
    )
  }
}

function dispatch2prop( dispatch ) {
  return bindActionCreators({
    register: account.register,
  }, dispatch)
}

export default connect(null, dispatch2prop)( ConnectDataFetcher({
  Component: Register,
  actionCreators: [
  ],
}) )
