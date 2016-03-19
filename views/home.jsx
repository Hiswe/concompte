import React from 'React';

import QuotationList from './quotation-list.jsx';

// in HOMEPAGE there will be more tables
var Home = React.createClass({
  render: function() {
    return (
      <section>
        <h1>
          Quotations
          <a href="/quotation" className="btn-circular">+</a>
        </h1>
        <QuotationList {...this.props} />
      </section>
    );
  }
});

export {Home as default};
