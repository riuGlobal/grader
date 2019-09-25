import { Request, Response, Oauth } from './../config/oauthServer'

/**
 * Verify if user is authenticate with oauth
 * @param req
 * @param res
 * @param next
 */
export function oauthAuth (req, res, next) {
  let request = new Request({
    headers: { authorization: req.headers.authorization },
    method: req.method,
    query: req.query,
    body: req.body
  })


  let response = new Response(res)

  Oauth.authenticate(request, response)
    .then(function (token) {
      // Request is authorized.
      // req.user = token
      next()
    })
    .catch(function (err) {
      // Forbidden Acccess
      return res.status(err.code || 403).json({
        code: 403,
        status: 'error',
        message: err.message,
        data: [],
        warning: [],
        error: []
      })
    })
}
