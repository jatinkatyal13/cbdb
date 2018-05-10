import * as api from './api'
import swaggerUi from 'swagger-ui-express'
import graphiql from 'express-graphiql-toolbox'

api.server.use('/docs', swaggerUi.serve,
  swaggerUi.setup(null, true, null, null, null,
    '/api/swagger.json', 'Hiring Blocks API Docs'
  )
)

api.server.use('/graphiql', graphiql({endpoint: '/api/'}))

api.start(() => {
  console.log(`Server started on https://localhost:3232`)
})

