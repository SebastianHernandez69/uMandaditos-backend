import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate{
    constructor(private readonly firebaseService: FirebaseService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
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