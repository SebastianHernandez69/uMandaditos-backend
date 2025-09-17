import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateOfferDto {

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    postId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty()
    @IsBoolean()
    isCounterOffer: boolean;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    counterOfferAmount: number;

    @ApiProperty()
    @IsBoolean()
    accepted: boolean;
}