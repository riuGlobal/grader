import moment from 'moment'
import { Request, Response, Oauth } from './../config/oauthServer'
import express from 'express'
const router = express.Router()

router.all('/oauth/token', function (req, res, next) {
  let request = new Request(req)
  let response = new Response(res)

  Oauth.token(request, response)
    .then(function (token) {
      token.accessTokenExpiresAt = moment(token.accessTokenExpiresAt).format(
        'YYYY-MM-DD HH:mm:ss'
      )
      return res.json(token)
    })
    .catch(function (err) {
      return res.status(500).json(err)
    })
})

export default router
