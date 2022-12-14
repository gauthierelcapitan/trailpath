import { Logger, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionsFilter } from '@trailpath/api/app/core/filter/exceptions.filter';
import { LogInterceptor } from '@trailpath/api/app/core/interceptor/log.interceptor';

@Module({
  providers: [
    Logger,
    { provide: APP_INTERCEPTOR, useClass: LogInterceptor },
    { provide: APP_FILTER, useClass: ExceptionsFilter },
  ],
})
export class CoreModule {}
