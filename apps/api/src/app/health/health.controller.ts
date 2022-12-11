import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { CONTROLLER_HEALTH } from '@trailpath/api/app/constant/controller.constant';
import { ApiTags } from '@nestjs/swagger';
import { SWAGGER_TAG_HEALTH } from '@trailpath/api/app/constant/swagger.constant';

@Controller(CONTROLLER_HEALTH)
@ApiTags(SWAGGER_TAG_HEALTH)
export class HealthController {
  @Get()
  @HealthCheck()
  check() {
    const checkResult: HealthCheckResult = { status: 'ok', details: {} };

    return Promise.resolve(checkResult);
  }
}
