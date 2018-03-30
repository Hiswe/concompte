'use strict'

const rc = require( 'rc' )

const config = rc( `concompte-api`, {
  VERSION:  `1.0.0`,
  NAME:     `concompte API`,
  db: {
    forceSync:  false,
    uri:        `postgres://localhost:5432/concompte`,
  },
  redis: {
    port: 6379,
    host: `127.0.0.1`,
  },
  email: {
    transport: {
      host: `localhost`,
      port: 1025,
    },
    options: {
      from: `Concompte <account@concompte.name>`,
    }
  },
  delay: false,
  // JWT config
  // • To generate a new secret:
  //   node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
  // • expiresIn config
  //   https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
  //   https://github.com/zeit/ms
  jwt: {
    secret: `49e3bd8b1935f3d17ce23146eb602fdb321e5b4f41eb7dd7f898e61426970086`,
    expiresIn: `1 days`,
  },
})

config.PORT       = config.PORT || process.env.PORT || 4040

config.NODE_ENV   = config.NODE_ENV || process.env.NODE_ENV || `development`
config.isDev      = config.NODE_ENV === `development`
config.isProd     = config.NODE_ENV === `production`

// Don't want that to happen in production
if ( config.isProd ) {
  // This can ruin the database!
  config.db.forceSync = false
  // Want the prod version to be as fas as possible
  config.delay = false
}

module.exports = config
