import React from 'react'
import { connect } from 'react-redux'
import { FormattedHTMLMessage } from 'react-intl'

import {
  PaperSheet,
  Party,
  PartyUser,
  Reference,
  Between,
  Subject,
  Mentions,
} from '../layout/paper-sheet'
import { Alert } from './alerts'
import { ProductTable, ProductLineDisplay } from '../ui-table/products'

export function Preview( props ) {
  const { document, type } = props
  const products = document.get(`products`)
  if ( !document || !products ) return null

  return (
    <PaperSheet preview>
      <Reference type={ type } product={ document } />
      <Between>
        <PartyUser />
        <Party title="to" people={ document.get(`customer`) } />
      </Between>
      <Subject value={ document.get(`name`)} />
      <ProductTable
        readOnly
        products={ document.get(`products`) }
        tax={ document.get(`tax`) }
      >
        {products.map( (product, index) =>  (
          <ProductLineDisplay
            key={ index }
            product={ product }
          />
        ))}
      </ProductTable>
      <Mentions content={ document.get(`${type}Config.mentions`) } />
    </PaperSheet>
  )
}

export function PrintingNotice( props ) {
  return (
    <Alert warning className="printing-notice">
      <FormattedHTMLMessage id="_.print-notice" />
    </Alert>
  )
}
