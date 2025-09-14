import { IsBoolean, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateOfferDto {

    @IsNumber()
    @IsNotEmpty()
    postId: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsBoolean()
    isCounterOffer: boolean;

    @IsNumber()
    @IsPositive()
    counterOfferAmount: number;

    @IsBoolean()
    accepted: boolean;
}