// src/controllers/UserController.ts
import {
    Controller,
    Get,
    Middlewares,
    Query,
    Request,
    Route,
    SuccessResponse,
    Tags,
} from 'tsoa'
import verifyToken, {
    AuthenticatedRequest,
} from '../../middleware/auth-middleware'
import { User } from '../../schemas/User'
import { Spam } from '../../schemas/Spam'
import { Op } from 'sequelize'

export type Search = {
    id?: number
    name?: string
    phone?: string
}

@Route('search')
@Tags('Search')
export class GlobalSearchController extends Controller {
    /**
     * Create a new user
     */
    @Get()
    @Middlewares(verifyToken)
    @SuccessResponse('200')
    public async createUser(
        @Query() searchString: string,
        @Request() req: AuthenticatedRequest
    ) {
        try {
            if (/^\d+$/.test(searchString)) {
                // search for phone number
                const user = await User.findAll({
                    where: {
                        phone: { [Op.like]: `%${searchString}%` },
                    },
                })
                if (user.length > 0) {
                    return user.map((data) => {
                        return {
                            userId: data.id,
                            name: data.name,
                            phone: data.phone,
                        }
                    })
                } else {
                    // Search in the spam table
                    const spam = await Spam.findAll({
                        where: {
                            phone: { [Op.like]: `%${searchString}%` },
                        },
                    })
                    return spam.map((data) => {
                        return {
                            spamId: data.id,
                            name: null,
                            phone: data.phone,
                        }
                    })
                }
            } else if (/^[a-zA-Z]+$/.test(searchString)) {
                // search for name
                const user = await User.findAll({
                    where: {
                        name: { [Op.like]: `%${searchString}%` },
                    },
                })
                if (user.length > 0) {
                    return user.map((data) => {
                        return {
                            userId: data.id,
                            name: data.name,
                            phone: data.phone,
                        }
                    })
                } else {
                    return []
                }
            }
        } catch (error) {
            throw error
        }
    }
}
