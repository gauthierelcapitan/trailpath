import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@trailpath/api/app/common/openapi/zod-openapi';
import { getTrackResponseSchema } from '@trailpath/api-interface/track/get-track/get-track.response.interface';

export class GetTrackResponse extends createZodDto(extendApi(getTrackResponseSchema)) {}
