import jagql from '@jagql/framework'
import {Application} from 'express'

jagql.setConfig({
  port: 3232,
  graphiql: true,
  jsonapi: true,
  base: 'api',
  hostname: 'localhost',
  meta: {
    description: 'Coding Blocks Information DB',
  },
  protocol: 'http',
  swagger: {
    title: 'Coding Blocks Information',
    version: '0.1.0',
    description: 'Coding Blocks Information DB',
    license: {
      name: 'MIT',
      url: 'http://opensource.org/licenses/MIT',
    },
  }
})

export const server: Application = jagql.getExpressServer()
export const start = jagql.start
export const close = jagql.close