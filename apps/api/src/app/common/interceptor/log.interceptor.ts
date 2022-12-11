import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FastifyRequest, FastifyReply } from 'fastify';
import { GLOBAL_PREFIX } from '@trailpath/api/main';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {
    this.logger = new Logger(LogInterceptor.name);
  }

  // noinspection JSUnusedGlobalSymbols
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const { url } = context.switchToHttp().getRequest<FastifyRequest>();

    // Ignore the logs if the request is health
    if (url === `/${GLOBAL_PREFIX}/health`) {
      return next.handle();
    }

    const startTimestamp = performance.now();
    const observable = next.handle();
    return observable.pipe(
      tap(() =>
        this.logger.log(this.buildResponseLog(context, startTimestamp)),
      ),
    );
  }

  buildResponseLog(context: ExecutionContext, startTimestamp: number) {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const response = context.switchToHttp().getResponse<FastifyReply>();
    const className = context.getClass().name;
    const handlerName = context.getHandler().name;

    const { id, method, url, query, headers, ip } = request;
    const { statusCode } = response;

    const userAgent = headers['user-agent'] ?? '';
    const queryString = JSON.stringify(query);

    const time = Math.round(performance.now() - startTimestamp);

    return `${method} ${url} ${queryString} ${statusCode} ${time}ms ${userAgent} ${ip} ${id} ${className}.${handlerName}`;
  }
}
