// src/controllers/UserController.ts
import {
    Body,
    Controller,
    Middlewares,
    Post,
    Route,
    SuccessResponse,
    Tags,
} from 'tsoa'
import { UserCreationAttributes, User } from '../../schemas/User'
import AuthService from '../../Service/authService'

export type CreateUserRequest = {
    name: string
    email: string
    phone: string
    password: string
}

@Route('register')
@Tags('User')
export class UserController extends Controller {
    /**
     * Create a new user
     */
    @Post()
    @SuccessResponse('201', 'Created') // Custom success response
    public async createUser(
        @Body() request: CreateUserRequest
    ): Promise<UserCreationAttributes> {
        try {
            const hashedPassword = await new AuthService().createJwtHash(
                request.password
            )
            request.password = hashedPassword
            const user = await User.create(request)
            return user
        } catch (error) {
            throw error
        }
    }
}
