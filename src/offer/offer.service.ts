import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { PostService } from 'src/post/post.service';
import { OfferResponseDto } from './dto/offer-response.dto';
import { OfferGateway } from './offer.gateway';

@Injectable()
export class OfferService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly postService: PostService,
        private readonly gateway: OfferGateway
    ) {}

    async createOffer(data: CreateOfferDto, uid: string): Promise<OfferResponseDto>{
        const user = await this.prisma.user.findUnique({ where: { uid }, select: { id: true } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const post = await this.postService.getPostById(data.postId);
        
        if (!post) {
            throw new NotFoundException('Post not found');
        }

        const offer = await this.prisma.offer.create(
            {
                data: {
                    ...data,
                    userId: user.id
                },
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

    async getUserOffersAcceptedCount(uid: string): Promise<number> {
        const user = await this.prisma.user.findUnique({ where: { uid }, select: { id: true } });
        
        if (!user) {
            throw new NotFoundException('User not found');
        }
        
        const offers = await this.prisma.offer.count({
            where: { userId: user.id, accepted: true }
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

    async getOffersAcceptedByUserId(uid: string): Promise<OfferResponseDto[]> {
        const user = await this.prisma.user.findUnique({ where: { uid }, select: { id: true } });
        
        if (!user) {
            throw new NotFoundException('User not found');
        }
        
        const offers = await this.prisma.offer.findMany({
            where: { userId: user.id, accepted: true },
            include: { post: true, user: true }
        });
        return offers;
    }

    async acceptOffer(offerId: number){
        const offer = await this.getOfferById(offerId);
        
        if (!offer) {
            throw new NotFoundException('Offer not found');
        }
        
        const posterId = offer.post.posterUserId;

        await this.prisma.offer.update(
            {
                where: { id: offerId },
                data: { accepted: true }
            }
        );

        await this.prisma.post.update(
            {
                where: { id: offer.post.id },
                data: { postStatusId: 2 }
            }
        );

        this.gateway.emitToUser(posterId.toString(), 'offer:accepted', { 
            offerId,
            at: Date.now()
        });

        this.gateway.emitToUser(offer.user.id.toString(), 'offer:accepted:runner', { 
            offerId,
            at: Date.now()
        });

        return offer;
    }
}
