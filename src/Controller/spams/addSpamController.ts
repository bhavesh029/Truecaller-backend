// src/controllers/UserController.ts
import {
    Body,
    Controller,
    Header,
    Middlewares,
    Post,
    Request,
    Route,
    SuccessResponse,
    Tags,
} from 'tsoa'
import verifyToken, {
    AuthenticatedRequest,
} from '../../middleware/auth-middleware'
import { Spam } from '../../schemas/Spam'

export type CreateSpam = {
    spamNumber: string
    comments?: string
}

@Route('spam')
@Tags('Spam')
export class AddSpamController extends Controller {
    /**
     * Create a new user
     */
    @Post()
    @Middlewares(verifyToken)
    @SuccessResponse('201', 'Created') // Custom success response
    public async createUser(
        @Body() request: CreateSpam,
        @Request() req: AuthenticatedRequest
    ) {
        try {
            const exist = await Spam.findOne({
                where: {
                    phone: request.spamNumber,
                    userId: req.user?.dataValues.id,
                },
            })
            if (exist) {
                throw new Error('Spam already exist')
            }
            const spam = await Spam.create({
                phone: request.spamNumber,
                comments: request.comments,
                userId: Number(req.user?.dataValues.id),
            })
            return 'Spam added successfully'
        } catch (error) {
            throw error
        }
    }
}
