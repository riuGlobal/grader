import express from 'express'

import { test, grade } from '../http/controllers/graderController.js'
const router = express.Router()

/**
 * Frontend endpoints
 */
router.get('/test', test)
router.post('/grade', grade)

export default router;