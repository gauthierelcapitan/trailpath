import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { CONTROLLER_HEALTH } from '@trailpath/api/app/common/constant/controller.constant';
import { SWAGGER_TAG_HEALTH } from '@trailpath/api/app/common/constant/swagger.constant';

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
