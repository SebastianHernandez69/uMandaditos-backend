import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateRideDto {
    @ApiProperty()
    @IsNumber()
    postId: number;
    
    @ApiProperty()
    @IsNumber()
    offerId: number;
    
    @ApiProperty()
    @IsNumber()
    acceptedRate: number;
}