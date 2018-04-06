'use strict'

const Sequelize = require( 'sequelize'    )
const isNil     = require( 'lodash.isnil' )
const merge     = require( 'lodash.merge' )

const config                = require( '../config'                         )
const dbLog                 = require( '../utils/log-db'                   )
const compute               = require( '../utils/compute-products'         )
const dbGetterSetter        = require( '../utils/db-getter-setter'         )
const filterDefaultProducts = require( `../utils/filter-array-with-object` )
const sequelize             = require( './connection'                      )

const Quotation = sequelize.define( `quotation`, {
  id: {
    type:         Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey:   true,
  },
  reference: {
    type: new Sequelize.VIRTUAL(Sequelize.STRING, [`quotationConfig`, `index`]),
    get:  function() {
      const config = this.get( `quotationConfig` )
      if ( !config ) return `–`
      const { prefix, startAt, count } = config
      const index = this.getDataValue( `index` ) || count + 1
      return `${ prefix }${ index + startAt }`
    }
  },
  name: {
    type:         Sequelize.STRING,
    set:          dbGetterSetter.setNormalizedString(`name`),
  },
  tax: {
    type:         Sequelize.FLOAT,
    allowNull:    true,
    get:          function() {
      const tax = parseFloat( this.getDataValue( `tax` ), 10 )
      if ( Number.isFinite(tax) ) return tax
      const quotationConfig   = this.get( `quotationConfig` )
      if ( !quotationConfig ) return -1
      return quotationConfig.tax
    },
    set:          function( tax ) {
      if ( isNil(tax) || tax === `` ) return this.setDataValue( `tax`, null )
      this.setDataValue( `tax`, tax )
    },
  },
  index: {
    type:         Sequelize.BIGINT,
    allowNull:    false,
  },
  // products: {
  //   type:         Sequelize.ARRAY( Sequelize.JSON ),
  //   allowNull:    false,
  //   defaultValue: [],
  //   set: function ( products ) {
  //     const productConfig = this.getDataValue( `productConfig` )
  //     if ( !productConfig ) return []
  //     const filteredProducts = filterDefaultProducts( {
  //       defaultObject: productConfig.toJSON(),
  //       array        : products,
  //     } )
  //     this.setDataValue( `products`, filteredProducts )
  //   }
  // },
  totalNet: {
    type:         Sequelize.FLOAT,
    default:      -1,
  },
  totalTax: {
    type:         Sequelize.FLOAT,
    default:      -1,
  },
  total: {
    type:         Sequelize.FLOAT,
    default:      -1,
  },
  // _total: {
  //   type: new Sequelize.VIRTUAL(Sequelize.JSON, [`products`]),
  //   get: function () {
  //     const products  = this.getDataValue( `products` )
  //     const tax       = this.getDataValue( `tax` )
  //     return compute.totals( products, tax )
  //   }
  // },
  // STATUS
  sendAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    // get:          dbGetterSetter.getNormalizedDate( `sendAt` ),
    set:          dbGetterSetter.setNormalizedDate( `sendAt` ),
  },
  validatedAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    // get:          dbGetterSetter.getNormalizedDate( `validatedAt` ),
    set:          dbGetterSetter.setNormalizedDate( `validatedAt` ),
  },
  signedAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    // get:          dbGetterSetter.getNormalizedDate( `signedAt` ),
    set:          dbGetterSetter.setNormalizedDate( `signedAt` ),
  },
  archivedAt: {
    type:         Sequelize.DATE,
    allowNull:    true,
    // get:          dbGetterSetter.getNormalizedDate( `archivedAt` ),
    set:          dbGetterSetter.setNormalizedDate( `archivedAt` ),
  },
  _hasInvoice: {
    type: new Sequelize.VIRTUAL(Sequelize.BOOLEAN, [`invoice`]),
    get: function() {
      const invoice     = this.get( `invoice` )
      return invoice != null
    },
  },
  _canCreateInvoice: {
    type: new Sequelize.VIRTUAL(Sequelize.BOOLEAN, [`sendAt`, `validatedAt`, `signedAt`, `invoice`, `products`]),
    get: function() {
      const informations = [ `invoiceId`, `products`, `sendAt`, `validatedAt`,  `signedAt` ]
        .map( infoName => this.get( infoName) )
      const hasEmpty = informations.some( info => info === undefined )
      if ( hasEmpty ) return false
      const [ invoiceId, products ] = informations
      return !invoiceId && products.length > 0

      // const sendAt      = this.get( `sendAt`      )
      // const validatedAt = this.get( `validatedAt` )
      // const signedAt    = this.get( `signedAt`    )
      // const invoice     = this.get( `invoice`     )
      // const products    = this.get( `products`    )
      // return sendAt !== ''
      //   && validatedAt !== ''
      //   && signedAt !== ''
      //   && products.length > 0
      //   && !invoice
    },
  },
})

module.exports = Quotation
