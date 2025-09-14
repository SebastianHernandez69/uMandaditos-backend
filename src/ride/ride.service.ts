import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RideResponseDto } from './dto/ride-response.dto';
import { RideHistoryDto } from './dto/ride-history.dto';
import { CreateRideDto } from './dto/create-ride.dto';
import { RideMinResponseDto } from './dto/ride-min-response.dto';
import { SecurityCodeService } from 'src/utilities/security-code/security-code.service';
import { RideRunnerResponseDto } from './dto/ride-runner-response.dto';

@Injectable()
export class RideService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly securityCodeService: SecurityCodeService
    ) {}
    

    async getRideById(id: number): Promise<RideResponseDto> {
        const ride = await this.prisma.ride.findUnique({ 
            where: { id }, 
            include: { 
                offer: true, 
                post: true, 
                ratings: true 
            } 
        });

        if (!ride) {
            throw new NotFoundException('Ride not found');
        }

        return {
            id: ride.id,
            securityCode: ride.securityCode,
            acceptedAt: ride.acceptedAt ?? undefined,
            acceptedRate: ride.acceptedRate,
            ratings: ride.ratings,
            offer: ride.offer,
            post: ride.post
        };
    }

    async getHistory(userId: number): Promise<RideHistoryDto[]> {
        
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const rides = await this.prisma.ride.findMany({
            where: { 
                offer: { userId },
            },
            orderBy: { createdAt: 'desc' },
            include: { post: { include: { pickupLocation: true, deliveryLocation: true } }, offer: true }
        });

        return rides.map(ride => ({
            id: ride.id,
            pickupLocationName: ride.post.pickupLocation.name,
            deliveryLocationName: ride.post.deliveryLocation.name,
            title: ride.post.title,
            runnerName: user.name,
            deliveryAt: ride.deliveryAt ?? undefined
        }));
    }

    async createRide(createRideDto: CreateRideDto): Promise<RideMinResponseDto> {
        const securityCode = this.securityCodeService.generate();

        const ride = await this.prisma.ride.create({
            data: {
                securityCode,
                acceptedRate: createRideDto.acceptedRate,
                postId: createRideDto.postId,
                offerId: createRideDto.offerId,
                statusRideId: 1
            }
        });

        if (!ride){
            throw new BadRequestException('Error creating ride');
        }

        return {
            id: ride.id,
            securityCode: ride.securityCode,
            acceptedAt: ride.acceptedAt ?? undefined,
            acceptedRate: ride.acceptedRate,
            postId: ride.postId,
            offerId: ride.offerId
        };
    }

    async getDeliveriesCount(userId: number): Promise<number> {
        const count = await this.prisma.ride.count({ 
            where: { 
                offer: { userId },
                statusRide: { id: 3 }
            } 
        });

        if (count === null) {
            return 0;
        }

        return count;
    }

    async getActiveRidesByRunner(userId: number): Promise<RideMinResponseDto[]> {
        const rides = await this.prisma.ride.findMany({
            where: { 
                offer: { userId, accepted: true },
                statusRide: { id: 1 }
            },
            include: { post: true, offer: true }
        });

        return rides.map(ride => ({
            id: ride.id,
            securityCode: ride.securityCode,
            acceptedAt: ride.acceptedAt ?? undefined,
            acceptedRate: ride.acceptedRate,
            postId: ride.postId,
            offerId: ride.offerId
        }));
    }

    async getRideByPostId(postId: number): Promise<RideRunnerResponseDto> {
        

        const ride = await this.prisma.ride.findFirst({ 
            where: { postId },
            include: { post: { include: { pickupLocation: true, deliveryLocation: true, posterUser: true } }, offer: true } 
        });

        if (!ride) {
            throw new NotFoundException('Ride not found');
        }

        return {
            id: ride.id,
            title: ride.post.title,
            description: ride.post.description,
            suggestedValue: ride.post.suggestedValue,
            posterName: ride.post.posterUser.name, 
            pickupLocationName: ride.post.pickupLocation.name,
            deliveryLocationName: ride.post.deliveryLocation.name,
            acceptedRate: ride.acceptedRate,
            accepted: ride.offer.accepted,
            statusRideId: ride.statusRideId
        }
    }
}
