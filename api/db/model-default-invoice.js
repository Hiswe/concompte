'use strict'

const Sequelize = require( 'sequelize' )

const sequelize = require( './connection' )
const h = require( './_helpers' )

const DefaultInvoice = sequelize.define( `defaultInvoice`, {
  id: {
    type:         Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey:   true,
  },
  prefix: {
    type:         Sequelize.STRING,
    defaultValue: `IN`,
    set:          h.setTrimmedString(`prefix`),
  },
  startAt: {
    type:         Sequelize.INTEGER,
    defaultValue: 800,
    allowNull:    false,
  },
  mentions: {
    type:         Sequelize.TEXT,
    defaultValue: `invoice mentions`,
    set:          h.setTrimmedString(`mentions`),
  },
}, { timestamps: false })

module.exports = DefaultInvoice
