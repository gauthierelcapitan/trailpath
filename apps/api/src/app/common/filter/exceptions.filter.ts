import {
  ArgumentsHost,
  Catch,
  Logger,
  NotFoundException,
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
    if (exception instanceof NotFoundException) {
      const { id, ip, method, url, query, headers } = host
        .switchToHttp()
        .getRequest<FastifyRequest>();

      const userAgent = headers['user-agent'] ?? '';
      const queryString = JSON.stringify(query);

      this.logger.warn(
        `${method} ${url} ${queryString} 404 0ms ${userAgent} ${ip} ${id}`,
      );
    }

    super.catch(exception, host);
  }
}
