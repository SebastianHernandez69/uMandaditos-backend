import { Injectable } from '@nestjs/common';
import { envs } from 'src/config/envs';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {

    private app: admin.app.App;

    constructor(){
        if(!admin.apps.length){
            this.app = admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: envs.firebaseProjectId,
                    clientEmail: envs.firebaseClientEmail,
                    privateKey: envs.firebasePrivateKey,
                }),
            });
        }
    }

    getAuth(){
        return admin.auth();
    }

}
