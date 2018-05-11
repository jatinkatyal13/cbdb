import * as api from './api'
import debug from 'debug'
import swaggerUi from 'swagger-ui-express'
import graphiql from 'express-graphiql-toolbox'

const log = debug('cbdb:server')

api.server.use('/docs', swaggerUi.serve,
  swaggerUi.setup(null, true, null, null, null,
    '/api/swagger.json', 'Coding Blocks Info DB'
  )
)

api.server.use('/graphiql', graphiql({endpoint: '/api/'}))

api.start(() => {
  log(`Server started on https://localhost:3232`)
})

