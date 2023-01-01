import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@trailpath/api/app/common/openapi/zod-openapi';
import { createTrackResponseSchema } from '@trailpath/api-interface/track/create-track/create-track.response.interface';

export class CreateTrackResponse extends createZodDto(
  extendApi(createTrackResponseSchema),
) {}
