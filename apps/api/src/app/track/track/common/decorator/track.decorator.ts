import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CONTROLLER_TRACK } from '@trailpath/api/app/common/constant/controller.constant';
import { SWAGGER_TAG_TRACK } from '@trailpath/api/app/common/constant/swagger.constant';

export const TrackDecorator = () => applyDecorators(Controller(CONTROLLER_TRACK), ApiTags(SWAGGER_TAG_TRACK));
