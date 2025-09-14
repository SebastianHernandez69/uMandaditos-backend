import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { OnModuleInit } from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    
    private readonly logger = new Logger(PrismaService.name);
    
    async onModuleInit() {
        await this.$connect();
        this.logger.log('PrismaService connected to database');
    }
}
