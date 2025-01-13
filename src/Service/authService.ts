import jwt from 'jsonwebtoken'
import bycrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()
const secretKey = process.env.JWT_Secret || 'your-secret-key'
export default class AuthService {
    /**
     * createJwtHash
     */
    public createJwtHash(key: string) {
        return bycrypt.hash(key, 10)
    }
    /**
     * generateToken
     */
    public async generateToken(
        inputPassword: string,
        existingPassword: string,
        userId: number
    ) {
        const passwordMatch = await bycrypt.compare(
            inputPassword,
            existingPassword
        )
        if (!passwordMatch) {
            throw new Error('Invalid password')
        }
        const token = jwt.sign({ userId }, secretKey)
        return token
    }
}
