import { QuotationConfig } from './quotations'
import { InvoiceConfig } from './invoices'
import { ProductConfig } from './products'

export interface AcountUser {
  id: string
  email: string
  name: string
  address: string
  lang: `en` | `fr`
  currency: `USD` | `EUR` | `THB`
  quotationConfig: QuotationConfig
  invoiceConfig: InvoiceConfig
  productConfig: ProductConfig
}

export interface UserResponse {
  user: AcountUser
}

export interface LoginResponse extends UserResponse {
  access_token: string
}
