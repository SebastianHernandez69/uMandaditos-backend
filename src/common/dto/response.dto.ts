import { ApiProperty } from "@nestjs/swagger";

export class ResponseDto<T> {
    @ApiProperty({ description: 'Response data' })
    data: T;
    @ApiProperty({ description: 'Response message' })
    message: string;
    @ApiProperty({ description: 'Response success' })
    success: boolean;

    constructor(data: T, message: string, success: boolean) {
        this.data = data;
        this.message = message;
        this.success = success;
    }
}