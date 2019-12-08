import express from 'express'

import { test } from './../http/controllers/grader.js'
const router = express.Router()

/**
 * Frontend endpoints
 */
router.get('/test', test)

export default router;