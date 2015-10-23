'use strict';

var chalk = require('chalk');
var host  = 'http://admin:admin@localhost:5984';
var nano  = require('nano')(host);
var db    = nano.use('concompte');

//////
// DB SETUP FUNCTION
//////

var general   = require('./design-general');
var customer  = require('./design-customer');

function insertDesignDocument(designDocument) {
  var name = designDocument._id;
  db.head(name, function(err, res, headers) {
    // Send error if something else than no document
    if (err && err.statusCode !== 404) return console.log(err);
    // to be updated, couch docs needs the last revision in parameter
    // -> Add current rev if doc exist
    if (headers && headers.etag) designDocument._rev = headers.etag.replace(/"/g,'');
    // update or create
    db.insert(designDocument, function(err, body) {
      if (err) return  console.log(err);
      console.log(chalk.green('design documents done'), name);
    });
  });

}

function setupDesignDocuments() {
  insertDesignDocument(general);
  insertDesignDocument(customer);
}

//////
// EXPORTS
//////

module.exports = {
  db:     db,
  setup:  setupDesignDocuments,
};
