import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars{
    PORT: number;
    DATABASE_URL: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_PRIVATE_KEY: string;
    FIREBASE_CLIENT_EMAIL: string;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    FIREBASE_PROJECT_ID: joi.string().required(),
    FIREBASE_PRIVATE_KEY: joi.string().required(),
    FIREBASE_CLIENT_EMAIL: joi.string().required(),
}).unknown(true);

const { error, value } = envsSchema.validate( process.env );

if(error) {
    throw new Error()
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    databaseUrl: envVars.DATABASE_URL,
    firebaseProjectId: envVars.FIREBASE_PROJECT_ID,
    firebasePrivateKey: envVars.FIREBASE_PRIVATE_KEY,
    firebaseClientEmail: envVars.FIREBASE_CLIENT_EMAIL,
}   