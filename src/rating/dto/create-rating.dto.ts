import { IsBoolean, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateRatingDto {
    
    @IsNumber()
    rideId: number;

    @IsNumber()
    ratedUserId: number;

    @IsNumber()
    raterUserId: number;

    @IsNumber()
    @Min(1)
    @Max(5)
    stars: number;

    @IsString()
    @IsOptional()
    review?: string;

    @IsBoolean()
    isPoster: boolean;
}