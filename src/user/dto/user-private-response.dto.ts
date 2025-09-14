import { PartialType } from "@nestjs/mapped-types";
import { UserResponseDto } from "./user-response.dto";

export class UserPrivateResponseDto extends UserResponseDto {
    deliveries: number;
    posts: number; 
}