import {
  ArgumentsHost,
  Catch,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { FastifyRequest } from 'fastify';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
  constructor(private readonly logger: Logger) {
    super();
    this.logger = new Logger(ExceptionsFilter.name);
  }

  // noinspection JSUnusedGlobalSymbols
  catch(exception: unknown, host: ArgumentsHost): void {
    // Transform the exception into an httpException if possible.
    // If exception is not an implements of Error log and return...
    let httpException: HttpException;
    if (exception instanceof HttpException) {
      httpException = exception;
    } else if (exception instanceof Error) {
      httpException = this.errorToHttpException(exception);
    } else {
      this.logger.error('Unexpected error :', exception);
    }

    // Build and print error/warn message log.
    if (httpException) {
      const { id, ip, method, url, query, headers } = host
        .switchToHttp()
        .getRequest<FastifyRequest>();

      const userAgent = headers['user-agent'] ?? '';
      const queryString = JSON.stringify(query);

      const status = httpException.getStatus();
      const log = `${method} ${url} ${queryString} ${status} ?ms ${userAgent} ${ip} ${id}`;

      if (status >= 500) {
        this.logger.error(log, httpException.stack);
      } else {
        this.logger.warn(log);
      }
    }

    super.catch(httpException ?? exception, host);
  }

  private errorToHttpException(error: Error): HttpException {
    const exception = new InternalServerErrorException(
      `Internal Server Error -- ${error.message}`,
      {
        cause: error,
      },
    );

    exception.stack =
      exception.stack.split('\n').slice(0, 2).join('\n') + '\n' + error.stack;
    return exception;
  }
}
