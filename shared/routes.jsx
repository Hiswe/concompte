import React              from 'react'
import {
  Router, Route,
  IndexRoute, Redirect }  from 'react-router'

import Layout         from '../views/_layout.jsx'
import Home           from '../views/home.jsx'

import QuotationHome  from '../views/quotations-home.jsx'
import QuotationForm  from '../views/quotation-form.jsx'

import CustomerHome   from '../views/customer-home.jsx'
import CustomerForm   from '../views/customer-form.jsx'

import Settings       from '../views/settings.jsx'
// import InvoiceList    from '../views/invoice-list.jsx';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
    <Route path="quotations" component={QuotationHome} />
    <Route path="quotation(/:fakeId)" component={QuotationForm} />
    <Redirect from="invoices" to="/" />
    <Route path="customers" component={CustomerHome} />
    <Route path="customer(/:customerId)" component={CustomerForm} />
    <Route path="settings" component={Settings} />
  </Route>
);
