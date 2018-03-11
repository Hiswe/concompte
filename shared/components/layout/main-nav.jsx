import React, { Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import LogoutButton from './logout-button.jsx'

const ConnectedNav = props => {
  return (
    <Fragment>
      <li className="main-nav__item">
        <NavLink to="/" exact activeClassName="is-active">home</NavLink>
      </li>
      <li className="main-nav__item">
        <NavLink to="/quotations" activeClassName="is-active">quotations</NavLink>
      </li>
      {/* <li><NavLink to="/invoices">invoices</NavLink></li> */}
      <li className="main-nav__item">
        <NavLink to="/customers" activeClassName="is-active">customers</NavLink>
      </li>
      {/* <li><NavLink to="/settings">settings</NavLink></li> */}
      <li className="main-nav__item main-nav__item--separator">
        connected as<br /> {props.email}
      </li>
      <li className="main-nav__item">
        <LogoutButton />
      </li>
    </Fragment>
  )
}

const ConnectionNav = props => {
  return (
    <Fragment>
      <li className="main-nav__item main-nav__item--separator">
        <NavLink to="/login" activeClassName="is-active">login</NavLink>
      </li>
      <li className="main-nav__item">
        <NavLink to="/register" activeClassName="is-active">register</NavLink>
      </li>
    </Fragment>
  )
}

const MainNav = props => {
  const { isAuthenticated } = props
  return (
    <nav className="main-nav">
      <ul className="main-nav__in">
        {
          isAuthenticated ? <ConnectedNav {...props} />
          : <ConnectionNav />
        }
      </ul>
    </nav>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    email: state.auth.user.email,
  }
}

// withRouter is needed for the <NavLink> to catch-up route changes
// • https://reacttraining.com/react-router/web/api/withRouter
export default withRouter( connect( mapStateToProps )( MainNav ) )