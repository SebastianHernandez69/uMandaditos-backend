import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingService {
    constructor(private readonly prismaService: PrismaService) {}

    async createRating(createRatingDto: CreateRatingDto, uid: string){

        const { rideId, isPoster } = createRatingDto;

        let ratedUserId: number;

        if(isPoster){
            const ride = await this.prismaService.ride.findUnique({
                where: {id: rideId},
                include: {offer: {select: {userId: true}}}
            })

            if(!ride){
                throw new NotFoundException('Ride not found');
            }

            ratedUserId = ride.offer.userId;
        } else {
            const ride = await this.prismaService.ride.findUnique({
                where: {id: rideId},
                include: {post: {select: {posterUser: true}}}
            })

            if(!ride){
                throw new NotFoundException('Ride not found');
            }

            ratedUserId = ride.post.posterUser.id;
        }
            
        const user = await this.prismaService.user.findUnique({ where: { uid }, select: { id: true } });

        if(!user){
            throw new NotFoundException('User not found');
        }

        return this.prismaService.rating.create({ 
            data: { 
                ...createRatingDto, 
                ratedUserId,
                raterUserId: user.id
            } 
        });
    }

    async getRatingByRatedUserId(uid: string){
        const user = await this.prismaService.user.findUnique({ where: { uid}, select: { id: true } });

        if(!user){
            throw new NotFoundException('User not found');
        }

        return this.prismaService.rating.findMany({ where: { ratedUserId: user.id } });
    }

    async getRatingById(id: number){
        const rating = await this.prismaService.rating.findUnique({ where: { id} });
    
        if(!rating){
            throw new NotFoundException('Rating not found');
        }

        return rating;
    }


    async updateRating(id: number, updateRatingDto: CreateRatingDto){
        const rating = await this.getRatingById(id);

        if(!rating){
            throw new NotFoundException('Rating not found');
        }

        return this.prismaService.rating.update({ where: { id}, data: updateRatingDto });
    }

    async deleteRating(id: number){
        const rating = await this.getRatingById(id);

        if(!rating){
            throw new NotFoundException('Rating not found');
        }

        return this.prismaService.rating.delete({ where: { id} });
    }
}
