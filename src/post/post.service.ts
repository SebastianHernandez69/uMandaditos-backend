import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { UserService } from 'src/user/user.service';
import { LocationService } from 'src/location/location.service';

@Injectable()
export class PostService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly locationService: LocationService
    ){}

    async createPost(createPostDto: CreatePostDto, uid: string): Promise<PostResponseDto> {
        const {title, description, suggestedValue, pickupLocationId, deliveryLocationId, postStatusId = 1} = createPostDto;
    
        const posterUser = await this.prismaService.user.findUnique({ where: { uid } });
        const pickupLocation = await this.locationService.getLocationById(pickupLocationId);
        const deliveryLocation = await this.locationService.getLocationById(deliveryLocationId);
        
        // TODO: validate locations
        if (!pickupLocation || !deliveryLocation) {
            throw new NotFoundException('Location not found');
        }

        // TODO: validate poster user
        if (!posterUser) {
            throw new NotFoundException('User not found');
        }

        const post = await this.prismaService.post.create({
            data: {
                title,
                description,
                suggestedValue,
                pickupLocationId,
                deliveryLocationId,
                postStatusId,
                posterUserId: posterUser.id
            },
            include: {
                pickupLocation: true,
                deliveryLocation: true,
                posterUser: true,
                postStatus: true
            }
        });

        return {
            id: post.id,
            title: post.title,
            description: post.description,
            suggestedValue: post.suggestedValue,
            pickupLocation: post.pickupLocation.name,
            deliveryLocation: post.deliveryLocation.name,
            posterUserName: post.posterUser.name,
            postStatusName: post.postStatus.name
        };
    }

    async getPostById(id: number): Promise<PostResponseDto> {
        const post = await this.prismaService.post.findUnique({
            where: { id },
            include: {
                pickupLocation: true,
                deliveryLocation: true,
                posterUser: true,
                postStatus: true
            }
        });
        
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        
        return {
            id: post.id,
            title: post.title,
            description: post.description,
            suggestedValue: post.suggestedValue,
            pickupLocation: post.pickupLocation.name,
            deliveryLocation: post.deliveryLocation.name,
            posterUserName: post.posterUser.name,
            postStatusName: post.postStatus.name
        };
    }

    async getAllPostsByUserId(uid: string): Promise<PostResponseDto[]> {

        const user = await this.prismaService.user.findUnique({ 
            where: { uid },
            select: { id: true }
        });
        
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const posts = await this.prismaService.post.findMany({ 
            where: { posterUserId: user.id },
            include: {
                pickupLocation: true,
                deliveryLocation: true,
                posterUser: true,
                postStatus: true
            }
        });

        return posts.map(post => ({
            id: post.id,
            title: post.title,
            description: post.description,
            suggestedValue: post.suggestedValue,
            pickupLocation: post.pickupLocation.name,
            deliveryLocation: post.deliveryLocation.name,
            posterUserName: post.posterUser.name,
            postStatusName: post.postStatus.name
        }));
    }

    async getAllPostsNear(locationId: number): Promise<PostResponseDto[]> {
        const posts = await this.prismaService.post.findMany({ 
            where: { pickupLocationId: locationId, posterUserId: 1 },
            include: {
                pickupLocation: true,
                deliveryLocation: true,
                posterUser: true,
                postStatus: true
            }
        });
        
        if (!posts) {
            throw new NotFoundException('Posts not found');
        }

        return posts.map(post => ({
            id: post.id,
            title: post.title,
            description: post.description,
            suggestedValue: post.suggestedValue,
            pickupLocation: post.pickupLocation.name,
            deliveryLocation: post.deliveryLocation.name,
            posterUserName: post.posterUser.name,
            postStatusName: post.postStatus.name
        }));
    }

    async getPostsByLocationId(locationId: number): Promise<PostResponseDto[]> {
        const posts = await this.prismaService.post.findMany({ 
            where: { pickupLocationId: locationId },
            include: {
                pickupLocation: true,
                deliveryLocation: true,
                posterUser: true,
                postStatus: true
            }
        });
        
        if (!posts) {
            throw new NotFoundException('Posts not found');
        }

        return posts.map(post => ({
            id: post.id,
            title: post.title,
            description: post.description,
            suggestedValue: post.suggestedValue,
            pickupLocation: post.pickupLocation.name,
            deliveryLocation: post.deliveryLocation.name,
            posterUserName: post.posterUser.name,
            postStatusName: post.postStatus.name
        }));
    }
    
    async getPostCount(uid: string): Promise<number> {
        const user = await this.prismaService.user.findUnique({ where: { uid }, select: { id: true } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return await this.prismaService.post.count({ where: { posterUserId: user.id } });
    }

    async markPostAsIncourse(postId: number): Promise<void> {
        await this.prismaService.post.update({ 
            where: { id: postId }, 
            data: { postStatusId: 2 } // TODO: use enum
        });

        return;
    }

    async getActivePostsByUserId(uid: string): Promise<PostResponseDto[]> {

        const user = await this.prismaService.user.findUnique({ where: { uid }, select: { id: true } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const post = await this.prismaService.post.findMany({ 
            where: { 
                posterUserId: user.id, 
                postStatusId: 1,
            },
            include: {
                pickupLocation: true,
                deliveryLocation: true,
                posterUser: true,
                postStatus: true
            }
        }); // TODO: use enum
        
        if (!post) {
            throw new NotFoundException('Active post not found');
        }

        return post.map(p => ({
            id: p.id,
            title: p.title,
            description: p.description,
            suggestedValue: p.suggestedValue,
            pickupLocation: p.pickupLocation.name,
            deliveryLocation: p.deliveryLocation.name,
            posterUserName: p.posterUser.name,
            postStatusName: p.postStatus.name
        }));
    }

    async markPostAsFinished(postId: number): Promise<void> {
        await this.prismaService.post.update({ 
            where: { id: postId }, 
            data: { postStatusId: 2 }
        });
        return;
    }
}
