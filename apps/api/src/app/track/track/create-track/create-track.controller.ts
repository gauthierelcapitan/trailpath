import { FileInterceptor } from '@nest-lab/fastify-multer';
import { BadRequestException, Body, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { multerOptions } from '@trailpath/api/app/common/config/multer-options.config';
import { MimeExtEnum } from '@trailpath/api/app/common/enum/mime-ext.enum';
import { TrackDecorator } from '@trailpath/api/app/track/track/common/decorator/track.decorator';
import { CreateTrackDto } from '@trailpath/api/app/track/track/create-track/create-track.dto';
import { CreateTrackResponse } from '@trailpath/api/app/track/track/create-track/create-track.response';
import { CreateTrackService } from '@trailpath/api/app/track/track/create-track/create-track.service';
import { CreateTrackResponseInterface } from '@trailpath/api-interface/track/create-track/create-track.response.interface';

@TrackDecorator()
export class CreateTrackController {
  constructor(private readonly createTrackService: CreateTrackService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a track from a GPX file.',
    description: 'Create a track from a GPX file an responding with the corresponding UUID.',
  })
  @ApiCreatedResponse({
    description: 'Create a track using a GPX file and return its UUID.',
    type: CreateTrackResponse,
  })
  @ApiBadRequestResponse({
    description: 'Input validation failed.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateTrackDto })
  @UseInterceptors(FileInterceptor('gpxFile', multerOptions([MimeExtEnum.GPX])))
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTrackDto, @UploadedFile() gpxFile): Promise<CreateTrackResponseInterface> {
    if (!gpxFile) {
      throw new BadRequestException('GPX file is missing');
    }

    const { distanceMethod, resampleMethod, elevationMethod, elevationDatasource } = dto;

    const uuid = await this.createTrackService.create(
      gpxFile,
      distanceMethod,
      resampleMethod,
      elevationMethod,
      elevationDatasource,
    );

    return { uuid };
  }
}
