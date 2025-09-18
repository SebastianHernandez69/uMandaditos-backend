import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateRatingDto {
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    rideId: number;

    @ApiProperty()
    @IsNumber()
    @Min(1)
    @Max(5)
    stars: number;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    review?: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    isPoster: boolean;
}