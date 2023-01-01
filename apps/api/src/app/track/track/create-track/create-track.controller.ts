import { FileInterceptor } from '@nest-lab/fastify-multer';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { multerOptions } from '@trailpath/api/app/common/config/multer-options.config';
import { CONTROLLER_TRACK } from '@trailpath/api/app/common/constant/controller.constant';
import { SWAGGER_TAG_TRACK } from '@trailpath/api/app/common/constant/swagger.constant';
import { MimeExtEnum } from '@trailpath/api/app/common/enum/mime-ext.enum';
import { CreateTrackDto } from '@trailpath/api/app/track/track/create-track/create-track.dto';
import { CreateTrackResponse } from '@trailpath/api/app/track/track/create-track/create-track.response';
import { TrackService } from '@trailpath/api/app/track/track/track.service';

@Controller(CONTROLLER_TRACK)
@ApiTags(SWAGGER_TAG_TRACK)
export class CreateTrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a track from a GPX file.',
    description:
      'Create a track from a GPX file an responding with the corresponding uuid.',
  })
  @ApiCreatedResponse({
    description: 'Create a track using a GPX file and return its id.',
    type: CreateTrackResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: HttpException,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateTrackDto })
  @UseInterceptors(FileInterceptor('gpxFile', multerOptions([MimeExtEnum.GPX])))
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateTrackDto,
    @UploadedFile() gpxFile,
  ): Promise<CreateTrackResponse> {
    if (!gpxFile) {
      throw new BadRequestException('Gpx file is missing');
    }

    const { distanceMethod, resampleMethod } = dto;

    const uuid = this.trackService.create(
      gpxFile,
      distanceMethod,
      resampleMethod,
    );

    return new CreateTrackResponse({ uuid });
  }
}
