import { Request } from "express";
import * as admin from "firebase-admin";

export interface AuthenticatedRequest extends Request {
    user: admin.auth.DecodedIdToken;
}
