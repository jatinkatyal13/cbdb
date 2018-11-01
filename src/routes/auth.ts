import { Router } from 'express'
import { RequestHandler } from 'express-serve-static-core'

const route = Router()

route.get('/token', (req, res) => {
  if (!req.query.grant_code) {
    return res.status(401).json({
      message: 'Cannot create token without grant code',
    })
  }

  /*
  TODO: Get the token
  POST
    https://account.codingblocks.com/oauth/token

      {
           "client_id" : 9990781661,
           "redirect_uri" : "http://hackerblocks.com/callback",
           "client_secret" : "ZyTe3zCR67REHND7CHa9zH39NllvLWYULCedocZDLaCkSVTA7GGE1s1Hjrgkos09",
           "grant_type" : "authorization_code",
           "code"  : "MyiLDqJwTpzEXqYOG1jNFCtjEzYHAR4U"
       }

  TODO: Get the user
  GET
    https://account.codingblocks.com/users/me
    Headers: {
      Authorization: Bearer <token got above>
    }
   */

  return
})

export const authRoute = route
