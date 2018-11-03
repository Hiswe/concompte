import { CustomerLight } from './acount-customers'
import { QuotationConfig } from './acount-quotations'
import { Product, ProductConfig } from './acount-products'

export interface QuotationConfig {
  creationCount: number
  prefix: string
  mentions: string
  tax: number
}

export interface Quotation {
  id: string
  reference: string
  count: number
  name: string
  mentions: string
  tax: number
  products: Product[]
  totalNet: number
  totalTax: number
  total: number
  // sendAt:
  // validatedAt:
  // signedAt:
  // archivedAt:
  userId: string
  customerId: string
  productConfigId: string
  quotationConfigId: string
  invoiceId: string
  quotationConfig: QuotationConfig
  productConfig: ProductConfig
  customer: CustomerLight
}
