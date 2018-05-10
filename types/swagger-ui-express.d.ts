declare module 'swagger-ui-express' {
  import {RequestHandler} from 'express'
  namespace swaggerUi {
    const serve: any
    function setup (swaggerDoc,
                    opts: boolean,
                    options,
                    customCss,
                    customfavIcon,
                    swaggerUrl: string,
                    customeSiteTitle: string
    ): RequestHandler
  }

  export = swaggerUi
}