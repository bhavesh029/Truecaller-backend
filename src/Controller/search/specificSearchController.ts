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
import { Directory } from '../../schemas/Directory'

interface SearchResult {
    name?: string
    phone?: string
    email?: string
    spamLikelihood: number
}

@Route('specific-search')
@Tags('Search')
export class SpecificSearchController extends Controller {
    /**
     * Create a new user
     */
    @Get()
    @Middlewares(verifyToken)
    @SuccessResponse('200')
    public async createUser(
        @Request() req: AuthenticatedRequest,
        @Query() spamId?: string,
        @Query() userId?: string
    ) {
        try {
            if (userId) {
                const searchedUser = await User.findOne({
                    where: {
                        id: userId,
                    },
                })
                const spamCount = await Spam.count({
                    where: { userId: userId },
                })
                console.log('spamCount', spamCount);
                const spamLikelihood =
                    spamCount > 0 ? (spamCount / 10) * 100 : 0

                const isInContactList = await Directory.findOne({
                    where: {
                        userId: userId,
                        phone: searchedUser?.phone,
                    },
                })
                const result: SearchResult = {
                    name: searchedUser?.name,
                    phone: searchedUser?.phone,
                    spamLikelihood,
                }

                if (isInContactList) {
                    result.email = searchedUser?.email
                }

                return result
            } else if (spamId) {
                const searchedSpam = await Spam.findOne({
                    where: { id: spamId },
                })
                if (searchedSpam) {
                    const spamCount = await Spam.count({
                        where: { phone: searchedSpam.phone },
                    })
                    const spamLikelihood =
                        spamCount > 0 ? (spamCount / 10) * 100 : 0
                    const result: SearchResult = {
                        name: undefined,
                        phone: searchedSpam?.phone,
                        spamLikelihood,
                    }
                    return result
                }
                return {}
            }
        } catch (error) {
            throw error
        }
    }
}
