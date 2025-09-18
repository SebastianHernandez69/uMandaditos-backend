import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/common/types/authenticated-request';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly firebaseService: FirebaseService,
        private readonly prisma: PrismaService
    ){}

    async register(req: AuthenticatedRequest, extraData: any){
        const {uid, email, name, photoURL} = req.user;

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
                email: email || 'User name ' + uid,
                name: name,
                photoURL: photoURL || '',
                ...extraData
            }
        });

        return user;
    }
}
