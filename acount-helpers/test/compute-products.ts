import test from 'ava'

import { all } from '../src/compute-quotation'
import { computeDisplayProducts } from '../src/compute-products'
import quotation from './_quotation'

test(`compute display products`, t => {
  // @ts-ignore
  const computed = computeDisplayProducts(quotation)
  const { productConfig } = computed
  t.is(computed.products.length, 4, `one default product has been removed`)
  // @ts-ignore
  const { _id, path, total, isEmptyLine, ...lastProduct } = computed.products[3]
  t.deepEqual(
    lastProduct,
    productConfig,
    `last element is an empty default product`,
  )
  t.deepEqual(
    quotation.productConfig,
    productConfig,
    `product configuration isn't mutated`,
  )
  t.is(
    computed.products[0].total,
    100,
    `total has been computed for 1st products`,
  )
  t.is(
    computed.products[3].total,
    0,
    `total has been computed for empty products`,
  )
})

test(`test with no empty products`, t => {
  const quot = {
    products: [
      {
        description: 'Fraises',
        quantity: 10,
        price: 10,
        checked: true,
      },
    ],
    productConfig: {
      description: '',
      quantity: 0,
      price: 350,
      checked: true,
    },
  }
  // @ts-ignore
  const computed = computeDisplayProducts(quot)
  t.is(computed.products.length, 2, `has the right number of products`)
  t.false(computed.products[0].isEmptyLine, `1st product isn't an empty line`)
  t.true(computed.products[1].isEmptyLine, `last product is an empty line`)
})
