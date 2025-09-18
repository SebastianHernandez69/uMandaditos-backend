import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  suggestedValue: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  pickupLocationId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  deliveryLocationId: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  postStatusId?: number;
}