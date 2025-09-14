import { Injectable } from '@nestjs/common';

@Injectable()
export class SecurityCodeService {
    generate(length: number = 6): string {
        const min = 10 ** (length - 1);
        const max = 10 ** length - 1;
        return Math.floor(min + Math.random() * (max - min + 1)).toString().padStart(length, '0');
    }
}
