import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from '@trailpath/api/environments/interface/environment.interface';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private readonly globalApiPrefix: string;

  constructor(private readonly configService: ConfigService, private readonly logger: Logger) {
    this.logger = new Logger(LogInterceptor.name);
    this.globalApiPrefix = this.configService.get<EnvironmentInterface['globalApiPrefix']>('globalApiPrefix') ?? 'api';
  }

  // noinspection JSUnusedGlobalSymbols
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const { url } = context.switchToHttp().getRequest<FastifyRequest>();

    // Ignore the logs if the request is health
    if (url === `/${this.globalApiPrefix}/health`) {
      return next.handle();
    }

    const startTimestamp = performance.now();
    const observable = next.handle();
    return observable.pipe(tap(() => this.logger.log(this.buildResponseLog(context, startTimestamp))));
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
