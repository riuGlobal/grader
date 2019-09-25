import express from 'express'


const router = express.Router()

/**
 * Frontend endpoints
 */
// router.get('/:shoppingCartId/validateShoppingCart', firebaseAuth, createCartAlerts)

// // Coupons functionality
// router.get('/retrieveBenefits', firebaseAuth, getBenefits);
// router.get('/benefitsByUser/:benefitbyUserId',firebaseAuth,  searchUserBenefits);
// router.delete('/benefitsByUser/:benefitbyUserId', firebaseAuth, deleteBenefits);
// router.post('/benefitsByUser/:benefitbyUserId/applyBenefit',firebaseAuth,  applyUserBenefit);

// /**
//  * Backend endpoints
//  */
// // Called from transactional
// router.get('/:uid/:shoppingCartId/validateShoppingCart', oauthAuth, createCartAlerts)
// router.get('/:uid/:shoppingCartId', oauthAuth, findCart)
// // Used to mark cart as purchased
// router.put('/:uid/:shoppingCartId', oauthAuth, changeStatus)
// // Delete cart when an order is cancelled
// router.delete('', oauthAuth, deleteCart)
// // Repeat a shopping cart after an order is being cancelled
// router.post('/repeatShoppingCart', oauthAuth, repeatShoppingCart)

// router.post('/benefitsByUser', oauthAuth, updateBenefits)
// router.get('/:uid/:shoppingCartId/testCalcs', oauthAuth, testCart)

// router.post('/build', oauthAuth, builCartForAggregators)

export default router;
