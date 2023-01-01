import { Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { TrackDecorator } from '@trailpath/api/app/track/track/common/decorator/track.decorator';
import { GetTrackResponse } from '@trailpath/api/app/track/track/get-track/get-track.response';
import { GetTrackResponseInterface } from '@trailpath/api-interface/track/get-track/get-track.response.interface';

@TrackDecorator()
export class GetTrackController {
  @Get(':uuid')
  @ApiOperation({
    summary: 'Get a track from its UUID.',
    description: 'Get a track and its data from its UUID.',
  })
  @ApiOkResponse({
    description: 'Get a track from its UUID and return its data.',
    type: GetTrackResponse,
  })
  @ApiNotFoundResponse({
    description: 'Track could not be found.',
  })
  @HttpCode(HttpStatus.OK)
  async get(@Param('uuid') uuid: string): Promise<GetTrackResponseInterface> {
    return { uuid };
  }
}
