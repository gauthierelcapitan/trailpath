import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  @Get()
  @HealthCheck()
  check() {
    const checkResult: HealthCheckResult = { status: 'ok', details: {} };

    return Promise.resolve(checkResult);
  }
}
