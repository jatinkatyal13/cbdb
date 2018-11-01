import debug from 'debug'
import graphiql from 'express-graphiql-toolbox'
import swaggerUi from 'swagger-ui-express'
import * as api from './api'
import { authRoute } from './routes/auth'

const log = debug('cbdb:server')

api.server.use('/auth', authRoute)

api.server.use('/docs', swaggerUi.serve,
  swaggerUi.setup(null, true, null, null, null,
    '/api/swagger.json', 'Coding Blocks Info DB',
  ),
)

api.server.use('/graphiql', graphiql({endpoint: '/api/'}))

api.start(() => {
  log(`Server started on https://localhost:3232`)
})
