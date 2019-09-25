import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { logErrors, errorHandler, notFound } from './middleware/errorHandler'
// import authRouter from './routes/auth'
import cartRouter from './routes/shopping-cart'
// import usersQueue from './http/jobs/registerMsUsersCurrentCart'
// import benefitsQueue from './http/jobs/redeemBenefitsInUserWallet'
import cors from 'cors'

const app = express()

// middleware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

// Call Jobs Listeners
// usersQueue()
// benefitsQueue()

// static files
app.use(express.static(path.join(__dirname, '../public')))

// routes
// app.use(authRouter)
app.use('/api/shopping-cart', cartRouter)

// error handlers
app.use(logErrors)
app.use(errorHandler)
app.use(notFound)

export default app
