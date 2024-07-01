import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (status === 401) {
      response.status(401).json();
    }

    if (status === 400) {
      const errorsResponse = {
        errorsMessages: [] as any[],
      };
      const responseBody: any = exception.getResponse();
      if (responseBody.message === 'Validation failed (uuid is expected)') {
        response.status(status).json({ message: responseBody.message, field: responseBody.error });
        return;
      }
      console.error(responseBody);
      responseBody.message.forEach((e: any) => errorsResponse.errorsMessages.push(e));

      response.status(status).json(errorsResponse);
    } else {
      response.status(status).json();
    }
  }
}
