import { IsString, IsNumber, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  suggestedValue: number;

  @IsInt()
  @IsNotEmpty()
  pickupLocationId: number;

  @IsInt()
  @IsNotEmpty()
  deliveryLocationId: number;

  @IsOptional()
  @IsInt()
  postStatusId?: number;
}