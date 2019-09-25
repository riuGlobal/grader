import firebaseAdmin from 'firebase-admin'

const serviceAccount = require('./credentials/' + process.env.serviceAccount)
const serviceAccountOperators = process.env.serviceAccountOperators
  ? require('./credentials/' + process.env.serviceAccountOperators)
  : null
const projectId = process.env.projectId
const serviceAccountUser = require('./credentials/' +
  process.env.serviceAccountUser)
const projectIdUser = process.env.projectIdUser
const databaseUserUrl = process.env.databaseUserURL

export let admin = null
export let adminUser = null
export let adminOperators = null
export let db = null
export let dbUser = null

function initApp () {
  if (!db) {
    // creation admin for shopping cart
    admin = firebaseAdmin.initializeApp(
      {
        credential: firebaseAdmin.credential.cert(serviceAccount),
        databaseURL: process.env.databaseURL
      },
      projectId
    )

    // creation operators for operators
    if (!!serviceAccountOperators && !!process.env.msOperatorsHost) {
      adminOperators = firebaseAdmin.initializeApp(
        {
          credential: firebaseAdmin.credential.cert(serviceAccountOperators),
          databaseURL: process.env.msOperatorsHost
        },
        'OPERATORS'
      )
    }

    // creation admin for users shopping cart
    adminUser = firebaseAdmin.initializeApp(
      {
        credential: firebaseAdmin.credential.cert(serviceAccountUser),
        databaseURL: databaseUserUrl
      },
      projectIdUser
    )

    dbUser = adminUser.database()
    db = admin.firestore()
  }
}

initApp()

// module.exports = {
//   db,
//   dbUser,
//   admin,
//   adminUser,
//   adminOperators
// }
