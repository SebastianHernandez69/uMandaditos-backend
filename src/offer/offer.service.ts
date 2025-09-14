import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { PostService } from 'src/post/post.service';
import { OfferResponseDto } from './dto/offer-response.dto';

@Injectable()
export class OfferService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly postService: PostService
    ) {}

    async createOffer(data: CreateOfferDto): Promise<OfferResponseDto>{
        const post = await this.postService.getPostById(data.postId);
        
        if (!post) {
            throw new NotFoundException('Post not found');
        }

        const offer = await this.prisma.offer.create(
            {
                data,
                include: {
                    post: true,
                    user: true
                }
            }
        );
        return offer;        
    }

    async getOfferById(id: number): Promise<OfferResponseDto> {
        const offer = await this.prisma.offer.findUnique(
            {
                where: { id }, 
                include: { post: true, user: true }
            }
        );
        
        if (!offer) {
            throw new NotFoundException('Offer not found');
        }
        
        return offer;
    }

    async getOffersByPostId(postId: number): Promise<OfferResponseDto[]> {
        const offers = await this.prisma.offer.findMany(
            {
                where: { postId },
                include: { post: true, user: true }
            }
        );
        
        if (!offers) {
            throw new NotFoundException('Offers not found');
        }
        
        return offers;
    }

    async updateOfferState(offerId: number, state: boolean): Promise<OfferResponseDto>{
        const offer = await this.getOfferById(offerId);
        
        if (!offer) {
            throw new NotFoundException('Offer not found');
        }
        
        await this.prisma.offer.update(
            {
                where: { id: offerId },
                data: { accepted: state }
            }
        );

        return offer;
    }

    async getUserOffersAcceptedCount(userId: number): Promise<number> {
        const offers = await this.prisma.offer.count({
            where: { userId, accepted: true }
        });
        return offers;
    }

    async deleteOffer(offerId: number): Promise<boolean> {
        const offer = await this.getOfferById(offerId);
        
        if (!offer) {
            throw new NotFoundException('Offer not found');
        }
        
        const deletedOffer = await this.prisma.offer.delete(
            {
                where: { id: offerId }
            }
        );

        return !deletedOffer;
    }

    async getOffersAcceptedByUserId(userId: number): Promise<OfferResponseDto[]> {
        const offers = await this.prisma.offer.findMany({
            where: { userId, accepted: true },
            include: { post: true, user: true }
        });
        return offers;
    }
}
