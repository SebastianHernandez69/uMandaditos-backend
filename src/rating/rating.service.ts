import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingService {
    constructor(private readonly prismaService: PrismaService) {}

    async createRating(createRatingDto: CreateRatingDto){
        return this.prismaService.rating.create({ data: createRatingDto });
    }

    async getRatingByRatedUserId(ratedUserId: number){
        return this.prismaService.rating.findMany({ where: { ratedUserId} });
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
