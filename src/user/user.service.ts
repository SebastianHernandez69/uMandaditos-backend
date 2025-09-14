import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserResponseDto } from './dto/user-response.dto';
import { UserPrivateResponseDto } from './dto/user-private-response.dto';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}

    // TODO: create user

    async getUserById(userId: number): Promise<UserResponseDto> {
        const user = await this.prisma.user.findUnique(
            { where: { id: userId }, 
            include: {profilePic: {select: {link: true}}} 
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }
        
        return {
            name: user.name,
            dni: user.dni || '',
            email: user.email,
            birthDate: user.birthDate || null,
            phone: user.phone || '',
            profilePic: user.profilePic?.link || '',
        };
    }

    async getUserPrivateProfile(userId: number): Promise<UserPrivateResponseDto>{
        const user = await this.prisma.user.findUnique({ 
            where: { id: userId },
            include: {
                profilePic: {select: {link: true}},   
                _count: {
                    select: {
                        posts: true,
                        offers: true,
                    }
                }
            }
        });

        if(!user){
            throw new NotFoundException('User not found');
        }

        return {
            name: user.name,
            dni: user.dni || '',
            email: user.email,
            birthDate: user.birthDate || null,
            phone: user.phone || '',
            profilePic: user.profilePic?.link || '',
            posts: user._count.posts,
            deliveries: user._count.offers // TODO: calculate deliveries in rides
        };
    }


    async calculateAge(birthDate: Date): Promise<number> {
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1;
        }
        return age;
    }
}
