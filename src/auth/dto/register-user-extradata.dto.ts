import { IsDate, IsOptional, IsString } from "class-validator";

export class RegisterUserExtraDataDto {
    
    @IsString()
    @IsOptional()
    dni?: string;
    
    @IsDate()
    @IsOptional()
    birthDate?: Date;
    
    @IsString()
    @IsOptional()
    phone?: string;    
}
