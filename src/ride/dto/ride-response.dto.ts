import { Offer, Post, Rating } from "@prisma/client";

export class RideResponseDto {
    id: number;
    securityCode: string;
    acceptedAt?: Date;
    acceptedRate: number;
    ratings: Rating[];
    offer: Offer;
    post: Post;
}