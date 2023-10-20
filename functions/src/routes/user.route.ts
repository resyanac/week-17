import express from 'express'

import { register, login, logout } from '../controllers/user.controller'
import LoginLimiter from '../middlewares/rateLimit'
// import taxRoutes from './tax.route'
import cors from 'cors'
import corsMiddleware from '../middlewares/cors'

const userRoutes = express.Router()

userRoutes.post('/v1/register',  register);
userRoutes.post('/v1/login', login);
userRoutes.post('/v1/logout', logout)

export default userRoutes