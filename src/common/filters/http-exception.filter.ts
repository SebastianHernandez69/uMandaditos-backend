import { HttpException } from "@nestjs/common";
import { ResponseDto } from "../dto/response.dto";
import { Response } from "express";
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from "@nestjs/common";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();

      if (typeof errorResponse === 'string') {
        message = errorResponse;
      } else if (typeof errorResponse === 'object' && errorResponse !== null) {
        const res: any = errorResponse;
        message = res.message || res.error || message;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const errorResponse: ResponseDto<any> = {
      data: null,
      message,
      success: false,
    };

    response.status(status).json(errorResponse);
  }
}
