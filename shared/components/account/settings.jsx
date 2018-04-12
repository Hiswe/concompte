import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import serialize from 'form-serialize'

import * as account from '../../ducks/account'
import { Form } from '../ui/form.jsx'
import SettingFormPres from './settings.pres.jsx'

export const FORM_ID    = `setting-form`

class SettingForm extends Component {

  constructor( props ) {
    super( props )
    this.state = {
      formData: this.props.current,
    }
    this.handleSubmit = this.handleSubmit.bind( this )
    this.handleFormChange = this.handleFormChange.bind( this )
  }

  static getDerivedStateFromProps( nextProps, prevState ) {
    const   current    = prevState.formData
    const   next       = nextProps.current
    const { isSaving } = nextProps
    if ( isSaving ) return null
    // update state on redux status change
    if (current === next) return null
    return { formData: next }
  }

  //----- EVENTS

  handleSubmit( event ) {
    event.preventDefault()
    const body = serialize( event.target, { hash: true, empty: true } )
    this.props.updateSettings( {params: {body}} )
  }
  handleFormChange( event ) {
    const { target } = event
    const { name, value } = target

    this.setState( prevState => {
      const updated = prevState.formData.set( name, value )
      return { formData: updated }
    })
  }

  //----- RENDER

  render() {
    const { formData } = this.state
    const { isSaving } = this.props

    const renderProps = { formData }

    return (
      <Form
        id={ `${FORM_ID}` }
        action={ `/account/settings` }
        isSaving={ isSaving }
        onChange={ this.handleFormChange }
        onSubmit={ this.handleSubmit }
      >
        <input
          type="hidden"
          name="id"
          value={ formData.get(`id`) }
        />
        <input
          type="hidden"
          name="quotationConfig[id]"
          value={ formData.get(`quotationConfig.id`) }
        />
        <input
          type="hidden"
          name="invoiceConfig[id]"
          value={ formData.get(`invoiceConfig.id`) }
        />
        <input
          type="hidden"
          name="productConfig[id]"
          value={ formData.get(`productConfig.id`) }
        />
        <SettingFormPres {...renderProps} />
      </Form>
    )
  }
}

function state2props( state ) {
  return {
    current : state.account.get(`current`),
    isSaving: state.account.get(`isSaving`),
  }
}

function dispatch2props ( dispatch ) {
  return bindActionCreators({
    updateSettings: account.updateSettings,
  }, dispatch )
}

export default connect( state2props, dispatch2props )( SettingForm )
