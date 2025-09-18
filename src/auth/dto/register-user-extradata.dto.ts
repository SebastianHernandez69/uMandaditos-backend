import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString } from "class-validator";

export class RegisterUserExtraDataDto {
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    dni?: string;
    
    @ApiPropertyOptional({ type: String, format: 'date-time' })
    @IsDateString()
    @IsOptional()
    birthDate?: string;
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    phone?: string;    
}
