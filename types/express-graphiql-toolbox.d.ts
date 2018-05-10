declare module 'express-graphiql-toolbox' {
  import {RequestHandler} from 'express'
  type Config = {
    endpoint: string
  }
  function createMiddleware(config: Config): RequestHandler
  export default createMiddleware
}