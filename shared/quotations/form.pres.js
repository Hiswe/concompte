import   React              from 'react'
import { FormattedMessage } from 'react-intl'

import { Main, Meta, Content, ContentActions } from '../layout/main'
import { PaperSheet, Between, PartyUser, Party, Reference, Mentions } from '../layout/paper-sheet'
import { Form  , FormActions } from '../ui/form'
import { Button, BtnIcon     } from '../ui/buttons'
import { Input, Textarea, Select } from '../ui/field'
import { Stepper } from '../ui/stepper'
import Icon from '../ui/svg-icons'
import { ProductTable, ProductLineEditable } from '../ui-table/products'
import { CreateInvoice, ShowInvoice, ArchiveQuotation } from './buttons'

import './form.pres.scss'
export const BASE_CLASS = `quotation-form`
export const FORM_ID    = BASE_CLASS

export default function QuotationFormPres( props ) {
  const {
    isSaving,
    customers,
    formData,
    customer,
    isNew,
    handle,
  } = props
  const { products }    = formData
  const hasProducts     = Array.isArray( products )
  const productsLength  = hasProducts ? products.length : 0
  const submitI18nId =  `quotation.button.${isNew ? 'create' : 'update'}`

  return (
    <Form
      id={ FORM_ID }
      isSaving={ isSaving }
      onChange={ handle.formChange }
      onSubmit={ handle.submit }
    >
      <Main withMeta>
        <Meta>
          <div className={ `${BASE_CLASS}__meta` }>
            { !isNew && <input type="hidden" defaultValue={ formData.id } name="id" /> }
            <Stepper
              steps={ formData.steps }
              handleDayChange={ handle.dayChange }
            />
            <Select
              label="field.customer"
              name="customerId"
              value={ formData.get(`customerId`) }
              options={ customers }
              optionsKeys={{ value: `id`, label: `name`}}
            />
            <Input
              name="tax"
              label="field.tax"
              type="number"
              min="0"
              step="0.5"
              value={ formData.get(`tax`) }
            />
          </div>
        </Meta>
        <Content>
          <PaperSheet>
            <Reference type="quotation" product={ formData } />
            <Between>
              <PartyUser />
              <Party title="to" people={ customer } />
            </Between>
            <Input
              name="name"
              label="field.subject"
              value={ formData.name }
            />
            <ProductTable
              products={ products }
              tax={ formData.tax }
            >
              { hasProducts && products.map( (product, index) => {
                const isLast = index === productsLength - 1
                const fieldPath = `products[${ index }]`
                return (
                  <ProductLineEditable
                    key={ product._id }
                    fieldPath={ fieldPath }
                    product={ product }
                    isLast={ isLast }
                  >
                    { !isLast && (
                      <BtnIcon
                        linkAlike
                        onClick={ e => handle.productRemove(index, fieldPath) }
                        type="button"
                        svgId="delete"
                      />
                    ) }
                  </ProductLineEditable>
                )
              }) }
            </ProductTable>
            <Mentions content={ formData.quotationConfig.mentions }/>
          </PaperSheet>
          <FormActions>
            <Button type="submit">
              <FormattedMessage id={ submitI18nId } />
            </Button>
            <CreateInvoice quotation={ formData } />
            <ShowInvoice quotation={ formData } withMessage />
            <ArchiveQuotation danger quotation={ formData } />
          </FormActions>
        </Content>
      </Main>
    </Form>
  )
}