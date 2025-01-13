// src/controllers/UserController.ts
import { Body, Controller, Post, Route, SuccessResponse, Tags } from 'tsoa'
import { UserCreationAttributes, User } from '../../schemas/User'
import AuthService from '../../Service/authService'

export type LoginUser = {
    phone: string
    password: string
}

@Route('login')
@Tags('User')
export class UserLoginController extends Controller {
    /**
     * Create a new user
     */
    @Post()
    @SuccessResponse('200', 'Created') // Custom success response
    public async createUser(@Body() request: LoginUser): Promise<string> {
        try {
            const user = await User.findOne({
                where: {
                    phone: request.phone,
                },
            })
            if (!user) {
                throw new Error('User not found')
            }
            const token = await new AuthService().generateToken(
                request.password,
                user.password,
                user.id
            )
            return token
        } catch (error) {
            throw error
        }
    }
}
