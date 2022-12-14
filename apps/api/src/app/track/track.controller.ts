import { FileInterceptor } from '@nest-lab/fastify-multer';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { multerOptions } from '@trailpath/api/app/common/config/multer-options.config';
import { CONTROLLER_TRACK } from '@trailpath/api/app/common/constant/controller.constant';
import { SWAGGER_TAG_TRACK } from '@trailpath/api/app/common/constant/swagger.constant';
import { ApiBodyFile } from '@trailpath/api/app/common/decorator/api-body-file.decorator';
import { MimeExtEnum } from '@trailpath/api/app/common/enum/mime-ext.enum';
import { UploadedFileInterface } from '@trailpath/api/app/common/interface/uploaded-file.interface';
import { TrackService } from '@trailpath/api/app/track/track.service';
import { TrackView } from '@trailpath/api/app/track/view/track.view';

@Controller(CONTROLLER_TRACK)
@ApiTags(SWAGGER_TAG_TRACK)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a track using a GPX file.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create a track using a GPX file and return its id.',
    type: String,
  })
  @ApiBodyFile('gpxFile')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('gpxFile', multerOptions([MimeExtEnum.GPX])))
  @HttpCode(HttpStatus.CREATED)
  async create(
    @UploadedFile() gpxFile: UploadedFileInterface,
  ): Promise<string> {
    const gpx = gpxFile.buffer.toString('utf-8');
    console.log({ gpx });
    return '';
  }

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
