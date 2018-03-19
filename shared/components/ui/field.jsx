import isNil from 'lodash.isnil'
import React, { PureComponent } from 'react'

import './field.scss'

// inspired by
// • https://github.com/muicss/mui/blob/master/src/react/_textfieldHelpers.jsx

// normalize props :P
export default function Field( props ) {
  const { id, label, type,
    darkBg,
    onChange, onBlur,
    ...others } = props
  const _id     = id ? id : others.name
  const _label  = label ? label : _id
  const _type   = type ? type : `text`

  const inputProps = {
    id:     _id,
    label:  _label,
    type:   _type,
    className: `field__control`,
    ...others,
  }

  // ensure that we have a value in case of controlled component
  if ( isNil( props.defaultValue ) ) {
    const _value  = isNil( props.value ) ? `` : props.value
    inputProps.value = _value
  }

  const wrapperClassName = [ `field`, `field--is-${_type}` ]
  if ( darkBg ) wrapperClassName.push( `field--dark-background` )

  const wrapperProps = {
    className: wrapperClassName.join( ` ` ),
  }

  return (
    <FieldInput
      inputProps={ inputProps }
      wrapperProps={ wrapperProps }
      onChange={ onChange }
      onBlur={ onBlur }
    />
  )
}

class FieldInput extends PureComponent {

  constructor( props ) {
    super( props )
    const { inputProps } = props

    this.state = {
      isEmpty: isEmpty(('value' in inputProps) ? inputProps.value : inputProps.defaultValue),
      isTouched: false,
      isPristine: true
    }
    this.onBlur   = this.onBlur.bind( this )
    this.onChange = this.onChange.bind( this )
  }

  componentWillReceiveProps( nextProps ) {
    console.log( nextProps )
    if ( `value` in nextProps ) {
      this.setState({ isEmpty: isEmpty(nextProps.value)})
    }
  }

  //----- EVENTS

  onChange( e ) {
    const { props } = this

    this.setState({
      isEmpty: isEmpty( e.target.value ),
      isPristine: false,
    })

    // execute original callback
    if ( typeof props.onChange === `function` ) props.onChange( e )
  }
  onBlur( e ) {
    const { props } = this
    // ignore if event is a window blur
    if ( document.activeElement !== this.controlEl ) {
      this.setState({ isTouched: true })
    }

    // execute original callback
    if ( typeof props.onBlur === `function` ) props.onBlur( e )
  }

  //----- RENDER

  input() {
    const { props } = this
    const { inputProps } = props
    const handlers = {
      onBlur:   this.onBlur,
      onChange: this.onChange,
    }

    switch ( inputProps.type ) {
      case `select`:
        const { options, ...others } = inputProps
        const hasOptions = Array.isArray( options )
        return (
          <select {...others} {...handlers}>
            { hasOptions && options.map( (option, i) => (
              <option key={option.id} value={option.id}>{option.name}</option>
            )) }
          </select>
        )

      case `textarea`:
        return ( <textarea {...inputProps} {...handlers} /> )

      default:
        return ( <input {...inputProps} {...handlers} /> )
    }
  }
  render() {
    const { props, state } = this
    const { inputProps } = props
    const { wrapperProps } = props

    const ClassName = [
      wrapperProps.className,
      state.isEmpty ? `field--is-empty` : `field--is-not-empty`,
    ]

    return (
      <div className={ ClassName.join( ` ` ) } >
        { this.input() }
        <label className="field__label" htmlFor={ inputProps.id }>{ inputProps.label }</label>
      </div>
    )
  }
}

function isEmpty( value ) {
  return ( isNil( value ) || value === ``)
}
