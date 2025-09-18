import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/common/types/authenticated-request';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserExtraDataDto } from './dto/register-user-extradata.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService
    ){}

    async register(req: AuthenticatedRequest, extraData: RegisterUserExtraDataDto){
        const {uid, email, name = 'User name ' + uid, photoURL} = req.user;

        let user = await this.prisma.user.findUnique({
            where: {
                uid: uid
            }
        });

        if(user){
            throw new BadRequestException('User already exists');
        }

        user = await this.prisma.user.create({
            data: {
                uid: uid,
                email: email!,
                name: name,
                ...extraData
            }
        });

        return user;
    }
}
