import { Request, Response, Oauth } from './../config/oauthServer'
import { admin, adminOperators } from './../config/database'
import { existsIdToken } from '../http/repositories/blacklist-repository'

/**
 * Valid if a user is authenticated for token firebase or Oauth2
 * @param req
 * @param res
 * @param next
 */
export function customAuth (req, res, next) {
  if (req.headers && req.headers.platform) {
    if (!strategyLoginPlatform[req.headers.platform.toUpperCase()]) {
      res.status(403).json({
        code: 403,
        status: 'error',
        message: 'Invalid Platform',
        data: [],
        warning: [],
        error: []
      })
    }
    strategyLoginPlatform[req.headers.platform.toUpperCase()](req, res, next)
  } else {
    strategyLoginPlatform.OAUTH(req, res, next)
  }
}

/**
 * Get firebase token
 * @param req
 * @param res
 * @param auxAdmin
 * @returns {Promise<admin.auth.DecodedIdToken>}
 */
const getFirebaseToken = async (req, res, auxAdmin) => {
  try {
    // Validate using Firebase
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')
    ) {
      res.status(401).json({
        code: 401,
        status: 'error',
        message: 'Unauthorized request: no authentication given',
        data: [],
        warning: [],
        error: []
      })
    }
    const idToken = req.headers.authorization.split('Bearer ')[1]
    if (auxAdmin.name !== 'OPERATORS') {
      const existInBlackList = await existsIdToken(idToken)
      if (existInBlackList) {
        res.status(403).json({
          code: 403,
          status: 'error',
          message: 'Token has been revoked',
          data: [],
          warning: [],
          error: []
        })
      }
    }
    let checkRevoked = true
    return await auxAdmin.auth().verifyIdToken(idToken, checkRevoked)
  } catch (error) {
    let message = 'Access token is invalid'

    if (error.code === 'auth/id-token-revoked') {
      message = 'Token has been revoked' // Inform the user to reauthenticate or signOut() the user.
    }

    // Forbidden access
    res.status(403).json({
      code: 403,
      status: 'error',
      message: message,
      data: [],
      warning: [],
      error: []
    })
  }
}

/**
 * Strategy for login by platform
 * @type {{OPERATOR: strategyLoginPlatform.OPERATOR, WEB: strategyLoginPlatform.WEB, ANDROID: strategyLoginPlatform.ANDROID, IOS: strategyLoginPlatform.IOS, OAUTH: strategyLoginPlatform.OAUTH}}
 */
const strategyLoginPlatform = {
  OPERATOR: async (req, res, next) => {
    const decodeToken = await getFirebaseToken(req, res, adminOperators)
    if (decodeToken) {
      req.operator = {
        uid: decodeToken.uid,
        email: decodeToken.email
      }
      next()
    }
  },
  WEB: async (req, res, next) => {
    const decodeToken = await getFirebaseToken(req, res, admin)
    if (decodeToken) {
      req.uid = decodeToken.uid
      req.signInProvider = decodeToken.firebase.sign_in_provider
      next()
    }
  },
  ANDROID: async (req, res, next) => {
    const decodeToken = await getFirebaseToken(req, res, admin)
    if (decodeToken) {
      req.uid = decodeToken.uid
      req.signInProvider = decodeToken.firebase.sign_in_provider
      next()
    }
  },
  IOS: async (req, res, next) => {
    const decodeToken = await getFirebaseToken(req, res, admin)
    if (decodeToken) {
      req.uid = decodeToken.uid
      req.signInProvider = decodeToken.firebase.sign_in_provider
      next()
    }
  },
  OAUTH: async (req, res, next) => {
    try {
      let request = new Request({
        headers: { authorization: req.headers.authorization },
        method: req.method,
        query: req.query,
        body: req.body
      })
      let response = new Response(res)

      const token = await Oauth.authenticate(request, response)
      req.user = token
      next()
    } catch (err) {
      // Forbidden Acccess
      next(err)
    }
  }
}
