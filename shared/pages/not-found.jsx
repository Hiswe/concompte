import React from 'react'
import { Route } from 'react-router-dom'
import LayoutBoarding from '../components/layout/boarding.jsx'
import { Helmet } from 'react-helmet'

const NotFound = () => (
  // we need a route to have access to staticContext
  <Route render={({ staticContext }) => {
    // staticContext is server only
    // put some infos here so the server can know things
    if ( staticContext ) {
      staticContext.status = 404
    }
    return (
      <LayoutBoarding title="404">
        <h2>not found</h2>
      </LayoutBoarding>
    )
  }}/>
)

export default NotFound
