import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../schemas/User'
dotenv.config()
const secretKey = process.env.JWT_Secret || 'your-secret-key'

export interface AuthenticatedRequest extends Request {
    user?: User
}

async function verifyToken(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    // const token = req.header('Authorization');
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
        return res
            .status(401)
            .json({ error: 'Access denied. No token provided.' })
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, secretKey) as JwtPayload

        if (!decoded['userId']) {
            return res
                .status(401)
                .json({ error: 'Invalid Token: No userId found.' })
        }
        const user = await User.findOne({ where: { id: decoded['userId'] } })

        if (!user) {
            return res.status(404).json({ error: 'User not found.' })
        }
        req.user = user

        next()
    } catch (error) {
        console.error('Error verifying token:', error)
        return res.status(401).json({ error: 'Invalid Token' })
    }
}

export default verifyToken
