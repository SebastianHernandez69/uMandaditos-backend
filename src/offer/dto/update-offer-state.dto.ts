import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class UpdateOfferStateDto {
    @ApiProperty({ example: true, description: 'Nuevo estado de la oferta' })
    @IsBoolean()
    state: boolean;
}
