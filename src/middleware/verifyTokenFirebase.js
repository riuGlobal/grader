import { adminUser } from './../config/database'
import { existsIdToken } from './../http/repositories/blacklist-repository'

/**
 * Validate if a user is authenticated using token firebase
 * @param req
 * @param res
 * @param next
 */
export function firebaseAuth (req, res, next) {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    return res.status(401).json({
      code: 401,
      status: 'error',
      message: 'Unauthorized request: no authentication given',
      data: [],
      warning: [],
      error: []
    })
  }
  const idToken = req.headers.authorization.split('Bearer ')[1]
  existsIdToken(idToken).then(inBlacklist => {
    if (inBlacklist) {
      return res.status(403).json({
        code: 403,
        status: 'error',
        message: 'Token has been revoked',
        data: [],
        warning: [],
        error: []
      })
    } else {
      let checkRevoked = true
      // Verify the ID token while checking if the token is revoked by passing
      // checkRevoked true.
      adminUser
        .auth()
        .verifyIdToken(idToken, checkRevoked)
        .then(function (decodedToken) {
          req.uid = decodedToken.uid
          req.signInProvider = decodedToken.firebase.sign_in_provider
          next()
        })
        .catch(function (error) {
          let message = 'Access token is invalid'
          if (error.code === 'auth/id-token-revoked') {
            message = 'Token has been revoked' // Inform the user to reauthenticate or signOut() the user.
          }
          // Forbidden access
          return res.status(403).json({
            code: 403,
            status: 'error',
            message: message,
            data: [],
            warning: [],
            error: []
          })
        })
    }
  })
}
