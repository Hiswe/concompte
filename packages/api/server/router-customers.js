'use strict'

const Router = require( 'koa-router' )

const { sequelize       } = require( './db'                        )
const   dbColumns         = require( './utils/db-sub-queries'      )
const   formatList        = require( './utils/db-format-list'      )
const   Customer          = require( './db/model-customer'         )
const   Quotation         = require( './db/model-quotation'        )
const   QuotationConfig   = require( './db/model-quotation-config' )
const   Invoice           = require( './db/model-invoice'          )
const   InvoiceConfig     = require( './db/model-invoice-config'   )

const prefix = `customers`
const router = new Router({prefix: `/${prefix}`})
module.exports = router

router
.get(`/`, async (ctx, next) => {
  const { userId, dbQuery }  = ctx.state
  // https://github.com/sequelize/sequelize/issues/4446#issuecomment-138291810
  const query = {
    where: {
      userId,
    },
    attributes: [
      `id`,
      `name`,
      `address`,
      // ...countAndTotal,
      ...dbColumns.customer.countAndTotal,
    ],
    ...dbQuery
  }
  const list = await Customer.findAndCount( query )
  ctx.body = formatList({list, dbQuery})
})

//----- NEW

.get(`/new`, async (ctx, next) => {
  const modelTemplate = new Customer().toJSON()
  delete modelTemplate.id
  ctx.body = modelTemplate
})
.post(`/new`,  async (ctx, next) => {
  const { body }  = ctx.request
  // TODO: check if the user doesn't already have a customer with the same name
  body.userId     = ctx.state.user.id
  const customer  = await Customer.create( body )
  ctx.body        = customer
})

//----- EDIT

.get(`/:id`, async (ctx, next) => {
  const { userId } = ctx.state
  const { id }     = ctx.params
  const query      = {
    where:  {
      userId,
      id,
    },
    attributes: [
      `id`,
      `name`,
      `address`,
      ...dbColumns.customer.countAndTotal,
    ],
  }
  const customer  = await Customer.findOne( query )

  ctx.assert(customer, 404, `Customer not found`)
  ctx.body        = customer
})
.post(`/:id`, async (ctx, next) => {
  const { userId }  = ctx.state
  const { id }    = ctx.params
  const { body }  = ctx.request
  const instance  = await Customer.findOne({
    where: { id, userId }
  })
  // TODO: check if the user doesn't already have a customer with the same name
  ctx.assert(instance, 404, `Customer not found`)
  const updated    = await instance.update( body )
  ctx.body        = updated
})

//----- RELATED QUOTATIONS/INVOICES

.get(`/:id/quotations`, async (ctx, next) => {
  const { userId, dbQuery } = ctx.state
  const { id } = ctx.params
  const query  = {
    where: {
      userId,
      customerId: id,
      invoiceId:  { $eq: null },
      archivedAt: { $eq: null },
    },
    attributes: [
      `id`,
      `index`,
      `name`,
      `totalNet`,
      `totalTax`,
      `total`,
      `createdAt`,
      `sendAt`,
      `validatedAt`,
      `signedAt`,
      `archivedAt`,
    ],
    include: [{
      model: QuotationConfig,
      attributes: [`startAt`, `prefix`],
    }],
    ...dbQuery
  }
  const list  = await Quotation.findAndCount( query )
  ctx.body    = formatList({list, dbQuery})
})
.get(`/:id/invoices`, async (ctx, next) => {
  const { userId, dbQuery }  = ctx.state
  const { id }      = ctx.params
  const queryParams = {
    where: {
      userId,
      customerId: id,
      archivedAt: { $eq: null },
    },
    attributes: [
      `id`,
      `index`,
      `name`,
      `totalNet`,
      `totalTax`,
      `totalPaid`,
      `totalLeft`,
      `total`,
      `sendAt`,
    ],
    include: [
      {
        model: InvoiceConfig,
        attributes: [`startAt`, `prefix`],
      },
      {
        model: Quotation,
        attributes: [`id`, `index`],
        include: [{
          model: QuotationConfig,
          attributes: [`startAt`, `prefix`],
        }]
      }
    ],
    ...dbQuery
  }
  const list = await Invoice.findAndCount( queryParams )
  ctx.body   = formatList({list, dbQuery})
})