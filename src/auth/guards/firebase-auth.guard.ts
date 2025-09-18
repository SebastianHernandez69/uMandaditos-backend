import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

@Injectable()
export class FirebaseAuthGuard implements CanActivate{
    constructor(
        private readonly firebaseService: FirebaseService,
        private readonly reflector: Reflector
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Validate if the route is public
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if(isPublic){
            return true;
        }

        // if the route is not public, validate the token
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        
        if(!authHeader){
            throw new UnauthorizedException('Missing token');
        }

        const token = authHeader.split('Bearer ')[1];
        if(!token){
            throw new UnauthorizedException('Invalid format token');
        }

        try {
            const decodedToken = await this.firebaseService.getAuth().verifyIdToken(token);
            req.user = decodedToken;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}