import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrackService } from '@trailpath/api/app/track/track.service';
import { TrackView } from '@trailpath/api/app/track/view/track.view';
import { CONTROLLER_TRACK } from '@trailpath/api/app/constant/controller.constant';
import { SWAGGER_TAG_TRACK } from '@trailpath/api/app/constant/swagger.constant';

@Controller(CONTROLLER_TRACK)
@ApiTags(SWAGGER_TAG_TRACK)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Get a track by its id.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a track by its id as a TrackView.',
    type: TrackView,
  })
  @HttpCode(HttpStatus.OK)
  async get(@Param('id') id: string): Promise<TrackView> {
    const track = await this.trackService.get(id);

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found.`);
    }

    return track;
  }
}
