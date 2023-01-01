import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@trailpath/api/app/common/openapi/zod-openapi';
import { createTrackDtoSchema } from '@trailpath/api-interface/track/create-track/create-track.dto.interface';

export class CreateTrackDto extends createZodDto(
  extendApi(createTrackDtoSchema),
) {}
