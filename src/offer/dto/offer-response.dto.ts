import { Post, User } from "@prisma/client";

export class OfferResponseDto {

    id: number;
    post: Post;
    user: User;
    isCounterOffer: boolean;
    counterOfferAmount: number;
    accepted: boolean;
}